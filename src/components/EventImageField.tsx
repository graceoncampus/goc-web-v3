import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useId, useRef, useState } from "react";
import { post } from "aws-amplify/api";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

async function uploadEventImage(file: File): Promise<string> {
  console.info("Event image upload started", {
    size: file.size,
    contentType: file.type,
  });
  const operation = post({
    apiName: "adminUserManagement",
    path: "/event-image-upload",
    options: { body: { contentType: file.type, size: file.size } },
  });
  const response = await operation.response;
  const result = (await response.body.json()) as unknown as {
    url: string;
    fields: Record<string, string>;
    imageUrl: string;
  };
  if (
    !result ||
    typeof result.url !== "string" ||
    !result.url.startsWith("https://") ||
    typeof result.imageUrl !== "string" ||
    !result.imageUrl.startsWith("https://") ||
    !result.fields ||
    typeof result.fields !== "object" ||
    !Object.values(result.fields).every((field) => typeof field === "string")
  )
    throw new Error("Invalid event image upload response");

  const form = new FormData();
  Object.entries(result.fields).forEach(([key, field]) =>
    form.append(key, field),
  );
  form.append("file", file);
  const uploaded = await fetch(result.url, {
    method: "POST",
    body: form,
  });
  if (!uploaded.ok)
    throw new Error(`Image storage returned HTTP ${uploaded.status}`);

  console.info("Event image upload completed");
  return result.imageUrl;
}

export function useEventImage() {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const clear = () => {
    setFile(undefined);
    setError("");
  };

  const select = (candidate: File) => {
    if (!IMAGE_TYPES.includes(candidate.type)) {
      setError("Choose a JPEG, PNG, WebP, or GIF image.");
      return;
    }
    if (candidate.size === 0 || candidate.size > MAX_IMAGE_BYTES) {
      setError("Choose a non-empty image up to 10 MB.");
      return;
    }
    setError("");
    setFile(candidate);
  };

  const resolveUrl = async (url: string) => {
    if (!file) return url;
    setError("");
    setUploading(true);
    try {
      const uploadedUrl = await uploadEventImage(file);
      setFile(undefined);
      return uploadedUrl;
    } catch (reason) {
      setError(
        "Image upload failed, so the event wasn’t saved. Your photo is still selected. Try submitting again, or remove the photo and paste an image URL.",
      );
      throw reason instanceof Error
        ? reason
        : new Error("Event image upload failed", { cause: reason });
    } finally {
      setUploading(false);
    }
  };

  return { file, error, uploading, select, clear, resolveUrl };
}

interface EventImageFieldProps {
  value: string;
  onChange: (url: string) => void;
  image: ReturnType<typeof useEventImage>;
  disabled?: boolean;
}

export const EventImageField = ({
  value,
  onChange,
  image,
  disabled = false,
}: EventImageFieldProps) => {
  const labelId = useId();
  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <Box>
      <Stack align="start" gap="2" mb="3">
        <input
          ref={fileInput}
          type="file"
          accept={IMAGE_TYPES.join(",")}
          aria-label="Choose event image"
          hidden
          disabled={disabled}
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) image.select(file);
          }}
        />
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={() => fileInput.current?.click()}
        >
          {image.file ? "Change image" : "Choose image"}
        </Button>
        <Text fontSize="sm" color="gray.600">
          JPEG, PNG, WebP, or GIF · Up to 10 MB · Photos become public when
          uploaded on submit
        </Text>
        {image.file && (
          <>
            <Text role="status" fontSize="sm">
              {image.uploading
                ? "Uploading image…"
                : `Selected: ${image.file.name} — uploads when you submit.`}
            </Text>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              disabled={disabled}
              onClick={image.clear}
            >
              Remove selected image
            </Button>
          </>
        )}
        {image.error && (
          <Text role="alert" fontSize="sm" color="red.600">
            {image.error}
          </Text>
        )}
      </Stack>
      <Text id={labelId} fontSize="sm" fontWeight="500" mb="2">
        Image URL
      </Text>
      <Input
        aria-labelledby={labelId}
        value={value}
        onChange={(event) => {
          image.clear();
          onChange(event.target.value);
        }}
        placeholder="Or paste an image URL"
        disabled={disabled}
      />
    </Box>
  );
};
