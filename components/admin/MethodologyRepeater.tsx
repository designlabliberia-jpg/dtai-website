"use client";

import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: string;
}

interface MethodologyRepeaterProps {
  defaultValue?: Step[];
  error?: string;
}

const emptyStep = (): Step => ({ title: "", description: "", icon: "" });

const inputStyle = {
  background: "var(--admin-surface)",
  border: "1px solid var(--admin-border-strong)",
  color: "var(--admin-text-primary)",
  borderRadius: "var(--radius-sm)",
  fontSize: "0.875rem",
  padding: "0.4rem 0.6rem",
  outline: "none",
  width: "100%",
} as const;

export function MethodologyRepeater({ defaultValue = [], error }: MethodologyRepeaterProps) {
  const [steps, setSteps] = useState<Step[]>(defaultValue.length > 0 ? defaultValue : [emptyStep()]);

  function addStep() {
    setSteps((prev) => [...prev, emptyStep()]);
  }

  function removeStep(i: number) {
    setSteps((prev) => prev.filter((_, idx) => idx !== i));
  }

  function update(i: number, field: keyof Step, value: string) {
    setSteps((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Hidden count for server parsing */}
      <input type="hidden" name="stepCount" value={steps.length} />

      {steps.map((step, i) => (
        <div
          key={i}
          className="flex gap-3 rounded-[var(--radius-sm)] p-3"
          style={{ background: "var(--admin-surface-2)", border: "1px solid var(--admin-border)" }}
        >
          <div className="flex shrink-0 items-start pt-2" style={{ color: "var(--admin-text-muted)" }}>
            <GripVertical size={14} />
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <input
                name={`step_title_${i}`}
                value={step.title}
                onChange={(e) => update(i, "title", e.target.value)}
                placeholder="Step title"
                style={inputStyle}
              />
              <input
                name={`step_icon_${i}`}
                value={step.icon}
                onChange={(e) => update(i, "icon", e.target.value)}
                placeholder="Icon name (e.g. Search)"
                style={inputStyle}
              />
              <span
                className="flex items-center font-technical text-[9px] uppercase tracking-widest"
                style={{ color: "var(--admin-text-muted)" }}
              >
                Step {i + 1}
              </span>
            </div>
            <textarea
              name={`step_description_${i}`}
              value={step.description}
              onChange={(e) => update(i, "description", e.target.value)}
              placeholder="Step description"
              rows={2}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
            />
          </div>

          <button
            type="button"
            onClick={() => removeStep(i)}
            disabled={steps.length === 1}
            className="shrink-0 self-start pt-2 transition-colors disabled:opacity-30"
            style={{ color: "var(--admin-text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-danger)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}
          >
            <Trash2 size={13} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addStep}
        className="flex items-center gap-1.5 self-start rounded-[var(--radius-sm)] px-3 py-1.5 font-technical text-[10px] uppercase tracking-[0.08em] transition-colors"
        style={{
          background: "var(--admin-surface-2)",
          border: "1px solid var(--admin-border-strong)",
          color: "var(--admin-text-secondary)",
        }}
      >
        <Plus size={12} />
        Add Step
      </button>

      {error && (
        <p className="font-technical text-[10px]" style={{ color: "var(--admin-danger)" }}>{error}</p>
      )}
    </div>
  );
}
