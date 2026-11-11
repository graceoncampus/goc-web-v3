import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useEffect, useId, useRef, useState } from "react";
import { post } from "aws-amplify/api";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

interface EventImageFieldProps {
  value: string;
  onChange: (url: string) => void;
  onUploadingChange: (uploading: boolean) => void;
  disabled?: boolean;
  active?: boolean;
}

export const EventImageField = ({
  value,
  onChange,
  onUploadingChange,
  disabled = false,
  active = true,
}: EventImageFieldProps) => {
  const labelId = useId();
  const fileInput = useRef<HTMLInputElement>(null);
  const request = useRef(0);
  const cancelUpload = useRef<() => void>(() => {});
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!active) {
      request.current += 1;
      cancelUpload.current();
      setUploading(false);
      setStatus("");
      setError("");
      onUploadingChange(false);
    }
    return () => {
      request.current += 1;
      cancelUpload.current();
      onUploadingChange(false);
    };
  }, [active, onUploadingChange]);

  const upload = async (file: File) => {
    setError("");
    setStatus("");
    if (!IMAGE_TYPES.includes(file.type)) {
      setError("Choose a JPEG, PNG, WebP, or GIF image.");
      return;
    }
    if (file.size === 0 || file.size > MAX_IMAGE_BYTES) {
      setError("Choose a non-empty image up to 10 MB.");
      return;
    }

    const currentRequest = ++request.current;
    const controller = new AbortController();
    let cancelSigning = () => {};
    cancelUpload.current = () => {
      cancelSigning();
      controller.abort();
    };
    setUploading(true);
    onUploadingChange(true);
    setStatus("Preparing upload…");
    console.info("Event image upload started", {
      size: file.size,
      contentType: file.type,
    });
    try {
      const operation = post({
        apiName: "adminUserManagement",
        path: "/event-image-upload",
        options: { body: { contentType: file.type, size: file.size } },
      });
      cancelSigning = () => operation.cancel();
      const response = await operation.response;
      const result = (await response.body.json()) as unknown as {
        url: string;
        fields: Record<string, string>;
        imageUrl: string;
      };
      if (currentRequest !== request.current) return;
      if (
        !result ||
        typeof result.url !== "string" ||
        !result.url.startsWith("https://") ||
        typeof result.imageUrl !== "string" ||
        !result.imageUrl.startsWith("https://") ||
        !result.fields ||
        typeof result.fields !== "object" ||
        !Object.values(result.fields).every(
          (field) => typeof field === "string",
        )
      )
        throw new Error("Invalid event image upload response");

      const form = new FormData();
      Object.entries(result.fields).forEach(([key, field]) =>
        form.append(key, field),
      );
      form.append("file", file);
      setStatus("Uploading image…");
      const uploaded = await fetch(result.url, {
        method: "POST",
        body: form,
        signal: controller.signal,
      });
      if (!uploaded.ok)
        throw new Error(`Image storage returned HTTP ${uploaded.status}`);
      if (currentRequest !== request.current) return;
      onChange(result.imageUrl);
      setStatus("Image uploaded. Save the event to use it.");
      console.info("Event image upload completed", {
        size: file.size,
        contentType: file.type,
      });
    } catch (reason) {
      if (currentRequest !== request.current) return;
      const failure =
        reason instanceof Error
          ? reason
          : new Error("Event image upload failed", { cause: reason });
      console.error("Event image upload failed", failure);
      setStatus("");
      setError(
        "Upload failed. Check your connection and ATeam sign-in, then try again. You can also paste an image URL.",
      );
    } finally {
      if (currentRequest === request.current) {
        setUploading(false);
        onUploadingChange(false);
        cancelUpload.current = () => {};
      }
    }
  };

  return (
    <Box>
      <Stack align="start" gap="2" mb="3">
        <input
          ref={fileInput}
          type="file"
          accept={IMAGE_TYPES.join(",")}
          aria-label="Choose event image"
          hidden
          disabled={disabled || uploading || !active}
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) void upload(file);
          }}
        />
        <Button
          type="button"
          variant="outline"
          disabled={disabled || uploading || !active}
          onClick={() => fileInput.current?.click()}
        >
          {uploading ? "Uploading image…" : "Upload image"}
        </Button>
        <Text fontSize="sm" color="gray.600">
          JPEG, PNG, WebP, or GIF · Up to 10 MB · Uploaded photos are public
        </Text>
        {status && (
          <Text role="status" fontSize="sm">
            {status}
          </Text>
        )}
        {error && (
          <Text role="alert" fontSize="sm" color="red.600">
            {error}
          </Text>
        )}
      </Stack>
      <Text id={labelId} fontSize="sm" fontWeight="500" mb="2">
        Image URL *
      </Text>
      <Input
        aria-labelledby={labelId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Image URL"
        disabled={disabled || uploading}
        required
      />
    </Box>
  );
};
