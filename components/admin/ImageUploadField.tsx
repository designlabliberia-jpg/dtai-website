"use client";

import { useRef, useState } from "react";

interface Props {
  name: string;
  label: string;
  defaultValue?: string | null;
  required?: boolean;
  error?: string;
  /** Max width/height in px before compressing (default 1200) */
  maxDimension?: number;
  /** JPEG quality 0–1 (default 0.8) */
  quality?: number;
}

const fieldStyle = {
  background: "var(--admin-surface)",
  border: "1px solid var(--admin-border-strong)",
  color: "var(--admin-text-primary)",
  borderRadius: "var(--radius-sm)",
  fontSize: "0.875rem",
  width: "100%",
  padding: "0.5rem 0.75rem",
  outline: "none",
} as const;

async function compressImage(file: File, maxDimension: number, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) { height = Math.round((height * maxDimension) / width); width = maxDimension; }
        else { width = Math.round((width * maxDimension) / height); height = maxDimension; }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Canvas toBlob failed")), "image/jpeg", quality);
    };
    img.onerror = reject;
    img.src = url;
  });
}

async function uploadToCloudinary(blob: Blob): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !preset) throw new Error("Cloudinary env vars not set");

  const fd = new FormData();
  fd.append("file", blob, "upload.jpg");
  fd.append("upload_preset", preset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: fd,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Cloudinary error:", res.status, text);
    let msg = `Cloudinary upload failed (${res.status})`;
    try { msg = JSON.parse(text)?.error?.message ?? msg; } catch {}
    throw new Error(msg);
  }
  const data = await res.json();
  return data.secure_url as string;
}

export function ImageUploadField({
  name, label, defaultValue, required, error,
  maxDimension = 1200, quality = 0.8,
}: Props) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const blob = await compressImage(file, maxDimension, quality);
      const secure_url = await uploadToCloudinary(blob);
      setUrl(secure_url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const displayError = error || uploadError;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-technical text-[10px] uppercase tracking-[0.1em]"
        style={{ color: "var(--admin-text-secondary)" }}>
        {label}{required && <span style={{ color: "var(--admin-danger)", marginLeft: 2 }}>*</span>}
      </label>

      {/* Hidden input carries the URL into the form */}
      <input type="hidden" name={name} value={url} />

      <div className="flex gap-2">
        <input
          readOnly
          value={url}
          placeholder="No image selected"
          style={{ ...fieldStyle, flex: 1, color: url ? "var(--admin-text-primary)" : "var(--admin-text-muted)", border: displayError ? "1px solid var(--admin-danger)" : fieldStyle.border }}
          onClick={() => inputRef.current?.click()}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="shrink-0 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[10px] uppercase tracking-[0.08em] disabled:opacity-60"
          style={{ background: "var(--admin-surface-2)", border: "1px solid var(--admin-border-strong)", color: "var(--admin-text-secondary)", whiteSpace: "nowrap" }}
        >
          {uploading ? "Uploading…" : "Choose File"}
        </button>
      </div>

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="preview" className="mt-1 h-20 w-auto rounded object-cover" style={{ border: "1px solid var(--admin-border)" }} />
      )}

      {displayError && (
        <p className="font-technical text-[10px]" style={{ color: "var(--admin-danger)" }}>{displayError}</p>
      )}
    </div>
  );
}
