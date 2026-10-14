#!/usr/bin/env python3
"""One-time dev -> gamma copy. Never writes to source resources or repairs errors."""
import json
import argparse
import os
from pathlib import Path
import subprocess
import tempfile
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[2]
SOURCE_API = "oqva3hdzfnh2zgemolfaottlse"
ACCOUNT = "271755560601"
REGION = "us-west-2"
PROFILE = "goc"


def aws(*args, raw=False):
    env = dict(os.environ, AWS_MAX_ATTEMPTS="1", AWS_PAGER="")
    result = subprocess.run(
        ["aws", *args, "--profile", PROFILE, "--region", REGION,
         "--no-cli-pager", "--output", "json"],
        capture_output=True, text=True, env=env,
    )
    if result.returncode:
        raise RuntimeError(
            f"STOP: AWS operation failed: {' '.join(args[:2])}\n"
            f"{result.stderr.strip()}"
        )
    return result.stdout if raw else json.loads(result.stdout or "{}")


def scan(table):
    # AWS CLI auto-pagination includes all pages. Do not use --max-items.
    return aws("dynamodb", "scan", "--table-name", table,
               "--consistent-read").get("Items", [])


def canonical(items):
    # These tables contain strings/booleans/maps/lists, with no binary/set fields.
    return sorted(json.dumps(item, sort_keys=True) for item in items)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--resume-from', type=Path,
                        help='Verify previously copied tables against their saved snapshot and finish missing S3 objects')
    args = parser.parse_args()
    local = json.loads((ROOT / "amplify/.config/local-env-info.json").read_text())
    assert local["envName"] == "gamma", "STOP: local environment must be gamma"
    assert aws("sts", "get-caller-identity")["Account"] == ACCOUNT
    meta = json.loads((ROOT / "amplify/backend/amplify-meta.json").read_text())
    target_api = meta["api"]["gocbackendv3"]["output"]["GraphQLAPIIdOutput"]
    assert target_api != SOURCE_API, "STOP: target is the production API"
    target_sources = {
        source["name"]: source
        for source in aws("appsync", "list-data-sources", "--api-id", target_api)["dataSources"]
    }
    source_sources = aws("appsync", "list-data-sources", "--api-id", SOURCE_API)["dataSources"]
    mapping = {}
    snapshots = {}
    for source in source_sources:
        if source["type"] != "AMAZON_DYNAMODB":
            continue
        origin = source["dynamodbConfig"]["tableName"]
        target = target_sources[source["name"]]["dynamodbConfig"]["tableName"]
        assert target.endswith("-gamma") and target != origin, target
        original_schema = aws("dynamodb", "describe-table", "--table-name", origin)["Table"]
        target_schema = aws("dynamodb", "describe-table", "--table-name", target)["Table"]
        assert target_schema["TableStatus"] == "ACTIVE", target
        assert original_schema["KeySchema"] == target_schema["KeySchema"], target
        existing = scan(target)
        if args.resume_from:
            saved = json.loads((args.resume_from / (origin + '.json')).read_text())
            assert canonical(existing) == canonical(saved), f"STOP: destination differs from saved snapshot: {target}"
        else:
            assert not existing, f"STOP: destination is not empty: {target}"
        mapping[origin] = target
        snapshots[origin] = saved if args.resume_from else scan(origin)
    assert len(mapping) == 8, "STOP: expected all eight source tables"

    target_sermons = meta["storage"]["sermons"]["output"]["BucketName"]
    buckets = {
        "gocwebv3-storage-c7ea0908150706-dev": f"gocwebv3-storage-{ACCOUNT}-gamma",
        "gocwebv33659dcc621154f51904047ab480f9bae150706-dev": target_sermons,
    }
    for origin, target in buckets.items():
        assert target.endswith("-gamma") and origin != target, target
        assert args.resume_from or not aws("s3api", "list-objects-v2", "--bucket", target).get("Contents"), (
            f"STOP: destination bucket is not empty: {target}"
        )

    # Preserve private local snapshots if anything fails; no rollback or repair.
    snapshot_dir = args.resume_from or Path(tempfile.mkdtemp(prefix="goc-gamma-seed-", dir="/private/tmp"))
    os.chmod(snapshot_dir, 0o700)
    for source, items in snapshots.items():
        path = snapshot_dir / (source + ".json")
        path.write_text(json.dumps(items))
        os.chmod(path, 0o600)

    for origin, target in mapping.items():
        items = snapshots[origin]
        for offset in range(0, 0 if args.resume_from else len(items), 25):
            request = {"RequestItems": {
                target: [{"PutRequest": {"Item": item}}
                         for item in items[offset:offset + 25]]
            }}
            path = snapshot_dir / "batch.json"
            path.write_text(json.dumps(request))
            os.chmod(path, 0o600)
            response = aws("dynamodb", "batch-write-item",
                           "--cli-input-json", "file://" + str(path))
            assert not response.get("UnprocessedItems"), (
                f"STOP: incomplete batch for {target}; no retry attempted"
            )
        assert canonical(scan(target)) == canonical(items), (
            f"STOP: item verification failed for {target}"
        )
        print(f"Verified {origin} -> {target}: {len(items)} items", flush=True)

    for origin, target in buckets.items():
        source_items = aws("s3api", "list-objects-v2", "--bucket", origin).get("Contents", [])
        target_items = aws("s3api", "list-objects-v2", "--bucket", target).get("Contents", [])
        source_sizes = {item['Key']: item['Size'] for item in source_items}
        target_sizes = {item['Key']: item['Size'] for item in target_items}
        assert all(source_sizes.get(key) == size for key, size in target_sizes.items()), (
            f"STOP: destination has unexpected or different objects: {target}"
        )
        # CopyObject preserves folder-marker objects that `s3 sync` skips.
        for item in source_items:
            if item['Key'] not in target_sizes:
                print(f"Copying missing object from {origin} to {target}", flush=True)
                aws('s3api', 'copy-object', '--bucket', target,
                    '--key', item['Key'], '--copy-source', origin + '/' + quote(item['Key'], safe='/'),
                    '--metadata-directive', 'COPY', '--tagging-directive', 'COPY')
        target_items = aws("s3api", "list-objects-v2", "--bucket", target).get("Contents", [])
        signature = lambda items: sorted((item["Key"], item["Size"]) for item in items)
        assert signature(source_items) == signature(target_items), (
            f"STOP: object inventory verification failed for {target}"
        )
        # Compare object bytes as well; these application buckets are currently tiny.
        for item in source_items:
            for bucket, filename in [(origin, "source-object"), (target, "target-object")]:
                aws("s3api", "get-object", "--bucket", bucket,
                    "--key", item["Key"], str(snapshot_dir / filename))
            assert (snapshot_dir / "source-object").read_bytes() == (
                snapshot_dir / "target-object"
            ).read_bytes(), f"STOP: object content differs: {item['Key']}"
        print(f"Verified {origin} -> {target}: {len(source_items)} objects", flush=True)

    print("Seed complete. Private snapshot:", snapshot_dir)


if __name__ == "__main__":
    main()
