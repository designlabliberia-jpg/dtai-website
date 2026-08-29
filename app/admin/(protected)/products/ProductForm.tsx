"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminFormShell } from "@/components/admin/AdminFormShell";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { SlugField } from "@/components/admin/SlugField";
import { ArrayField } from "@/components/admin/ArrayField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { createProduct, updateProduct } from "@/lib/actions/products";
import type { ProductActionState } from "@/lib/actions/products";

interface ProductFormProps {
  product?: {
    id: string; slug: string; name: string; tagline: string;
    status: string; features: string[];
    builtFor: string[]; serviceId: string | null;
    profileEyebrow: string; profileHeading: string;
    profileHeadingAccent: string | null; profileParagraphs: string[];
    profilePrimaryImageUrl: string; profilePrimaryImageAlt: string;
    profileSecondaryImageUrl: string | null; profileSecondaryImageAlt: string | null;
    published: boolean; order: number;
  };
  services: { id: string; profileEyebrow: string; slug: string }[];
}

const init: ProductActionState = { success: false, error: "" };

const selectStyle = {
  background: "var(--admin-surface)", border: "1px solid var(--admin-border-strong)",
  color: "var(--admin-text-primary)", borderRadius: "var(--radius-sm)",
  fontSize: "0.875rem", width: "100%", padding: "0.5rem 0.75rem", outline: "none",
} as const;

export function ProductForm({ product: p, services }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!p;
  const [name, setName] = useState(p?.name ?? "");

  const action = isEdit ? updateProduct.bind(null, p.id) : createProduct;
  const [state, formAction, pending] = useActionState(
    action as (prev: ProductActionState | null, fd: FormData) => Promise<ProductActionState>,
    init
  );

  useEffect(() => { if (state.success) router.push("/admin/products"); }, [state.success, router]);

  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};

  return (
    <AdminFormShell
      title={isEdit ? `Edit — ${p.name}` : "New Product"}
      backHref="/admin/products" backLabel="Products"
      actions={
        <div className="flex gap-3">
          <button type="button" onClick={() => router.push("/admin/products")}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ color: "var(--admin-text-secondary)", border: "1px solid var(--admin-border-strong)" }}>
            Cancel
          </button>
          <button form="product-form" type="submit" disabled={pending}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em] disabled:opacity-60"
            style={{ background: "var(--admin-brand)", color: "#fff" }}>
            {pending ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
          </button>
        </div>
      }
    >
      <form id="product-form" action={formAction} className="flex flex-col gap-4">
        {!state.success && state.error && (
          <p className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
            style={{ background: "var(--admin-danger-bg)", color: "var(--admin-danger)", border: "1px solid #FECACA" }}>
            {state.error}
          </p>
        )}

        <Panel accent title="Identity">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Name" name="name" required error={fe.name?.[0]}
                inputProps={{ defaultValue: p?.name, onChange: (e) => setName(e.target.value) }} />
              <FormField label="Tagline" name="tagline" required error={fe.tagline?.[0]}
                inputProps={{ defaultValue: p?.tagline }} />
            </div>
            <SlugField name="slug" sourceValue={name} defaultValue={p?.slug} error={fe.slug?.[0]} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="font-technical text-[10px] uppercase tracking-[0.1em]"
                  style={{ color: "var(--admin-text-secondary)" }}>Status</label>
                <select name="status" defaultValue={p?.status ?? "In Development"} style={selectStyle}>
                  <option value="In Development">In Development</option>
                  <option value="Published">Published</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-technical text-[10px] uppercase tracking-[0.1em]"
                  style={{ color: "var(--admin-text-secondary)" }}>Order</label>
                <input name="order" type="number" min="0" defaultValue={p?.order ?? 0} style={selectStyle} />
              </div>
            </div>
          </div>
        </Panel>

        <Panel accent title="Content">
          <div className="flex flex-col gap-4">
            <ArrayField label="Features" name="features" defaultValue={p?.features} error={fe.features?.[0]} />
            <ArrayField label="Built For" name="builtFor" defaultValue={p?.builtFor} error={fe.builtFor?.[0]} placeholder="Add audience…" />
            <div className="flex flex-col gap-1.5">
              <label className="font-technical text-[10px] uppercase tracking-[0.1em]"
                style={{ color: "var(--admin-text-secondary)" }}>Service</label>
              <select name="serviceId" defaultValue={p?.serviceId ?? ""} style={selectStyle}>
                <option value="">— None —</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.profileEyebrow}</option>
                ))}
              </select>
            </div>
          </div>
        </Panel>

        <Panel accent title="Profile Section">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Eyebrow" name="profileEyebrow" required error={fe.profileEyebrow?.[0]}
                inputProps={{ defaultValue: p?.profileEyebrow }} />
              <FormField label="Heading" name="profileHeading" required error={fe.profileHeading?.[0]}
                inputProps={{ defaultValue: p?.profileHeading }} />
              <FormField label="Heading Accent" name="profileHeadingAccent"
                inputProps={{ defaultValue: p?.profileHeadingAccent ?? "" }} />
            </div>
            <ArrayField label="Paragraphs" name="profileParagraphs" defaultValue={p?.profileParagraphs}
              error={fe.profileParagraphs?.[0]} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ImageUploadField label="Primary Image" name="profilePrimaryImageUrl" required
                error={fe.profilePrimaryImageUrl?.[0]} defaultValue={p?.profilePrimaryImageUrl} />
              <FormField label="Primary Image Alt" name="profilePrimaryImageAlt" required
                error={fe.profilePrimaryImageAlt?.[0]} inputProps={{ defaultValue: p?.profilePrimaryImageAlt }} />
              <ImageUploadField label="Secondary Image" name="profileSecondaryImageUrl"
                defaultValue={p?.profileSecondaryImageUrl} />
              <FormField label="Secondary Image Alt" name="profileSecondaryImageAlt"
                inputProps={{ defaultValue: p?.profileSecondaryImageAlt ?? "" }} />
            </div>
          </div>
        </Panel>

        <Panel accent title="Visibility">
          <div className="flex items-center gap-3">
            <label className="font-technical text-[10px] uppercase tracking-[0.1em]"
              style={{ color: "var(--admin-text-secondary)" }}>Published</label>
            <input type="hidden" name="published" value="false" />
            <input type="checkbox" name="published" value="true"
              defaultChecked={p?.published ?? false}
              className="h-4 w-4 accent-[var(--admin-brand)]" />
          </div>
        </Panel>
      </form>
    </AdminFormShell>
  );
}
