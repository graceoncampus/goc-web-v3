const { randomUUID } = require("node:crypto");
const { S3Client } = require("@aws-sdk/client-s3");
const { createPresignedPost } = require("@aws-sdk/s3-presigned-post");

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const IMAGE_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

async function createEventImageUpload(
  body,
  context,
  sign = createPresignedPost,
) {
  const { contentType, size } = body;
  if (!Object.hasOwn(IMAGE_TYPES, contentType)) {
    const error = new Error("Choose a JPEG, PNG, WebP, or GIF image.");
    error.statusCode = 400;
    throw error;
  }
  if (!Number.isSafeInteger(size) || size < 1 || size > MAX_IMAGE_BYTES) {
    const error = new Error("Choose an image smaller than or equal to 10 MB.");
    error.statusCode = 400;
    throw error;
  }
  const bucket = process.env.EVENT_IMAGES_BUCKET;
  const region = process.env.REGION;
  if (!bucket || !region)
    throw new Error("Missing event image storage configuration");

  const key = `public/event-images/${randomUUID()}.${IMAGE_TYPES[contentType]}`;
  const upload = await sign(new S3Client({ region }), {
    Bucket: bucket,
    Key: key,
    Expires: 300,
    Fields: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      success_action_status: "204",
    },
    Conditions: [
      ["content-length-range", 1, MAX_IMAGE_BYTES],
      ["eq", "$Content-Type", contentType],
      ["eq", "$Cache-Control", "public, max-age=31536000, immutable"],
      ["eq", "$success_action_status", "204"],
    ],
  });
  console.log("Event image upload authorized", {
    ...context,
    bucket,
    key,
    size,
    contentType,
  });
  return {
    ...upload,
    imageUrl: `https://${bucket}.s3.${region}.amazonaws.com/${key}`,
  };
}

module.exports = { createEventImageUpload, MAX_IMAGE_BYTES };
