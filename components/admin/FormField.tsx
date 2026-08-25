"use client";

import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseProps {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

interface InputProps extends BaseProps {
  as?: "input";
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

interface TextareaProps extends BaseProps {
  as: "textarea";
  rows?: number;
  inputProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

type FormFieldProps = InputProps | TextareaProps;

const fieldStyle = {
  background: "var(--admin-surface)",
  border: "1px solid var(--admin-border-strong)",
  color: "var(--admin-text-primary)",
  borderRadius: "var(--radius-sm)",
  fontSize: "0.875rem",
  width: "100%",
  padding: "0.5rem 0.75rem",
  outline: "none",
  transition: "border-color 150ms ease",
} as const;

const errorFieldStyle = {
  ...fieldStyle,
  border: "1px solid var(--admin-danger)",
} as const;

export function FormField(props: FormFieldProps) {
  const { label, name, error, hint, required } = props;
  const style = error ? errorFieldStyle : fieldStyle;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="font-technical text-[10px] uppercase tracking-[0.1em]"
        style={{ color: "var(--admin-text-secondary)" }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--admin-danger)", marginLeft: 2 }}>*</span>
        )}
      </label>

      {props.as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={props.rows ?? 4}
          style={{ ...style, resize: "vertical", lineHeight: 1.6 }}
          {...(props.inputProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={name}
          name={name}
          style={style}
          {...(props.inputProps as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {hint && !error && (
        <p
          className="text-[11px]"
          style={{ color: "var(--admin-text-muted)" }}
        >
          {hint}
        </p>
      )}
      {error && (
        <p
          className="font-technical text-[10px]"
          style={{ color: "var(--admin-danger)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
