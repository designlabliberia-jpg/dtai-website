"use client";

import { useEffect } from "react";
import { Clock, X } from "lucide-react";

interface ApprovalToastProps {
  title: string;
  visible: boolean;
  onDismiss: () => void;
}

export function ApprovalToast({ title, visible, onDismiss }: ApprovalToastProps) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onDismiss, 3000);
    return () => clearTimeout(t);
  }, [visible, onDismiss]);

  if (!visible) return null;

  return (
    <div
      className="fixed right-5 top-5 z-50 flex w-80 items-start gap-3 rounded-[var(--radius-md)] px-4 py-3 shadow-lg"
      style={{ background: "#fef3c7", border: "1px solid #fcd34d" }}
    >
      <Clock size={15} className="mt-0.5 shrink-0" style={{ color: "#d97706" }} />
      <div className="flex-1">
        <p className="text-[12px] font-semibold" style={{ color: "#92400e" }}>Submitted for Approval</p>
        <p className="text-[11px]" style={{ color: "#b45309" }}>
          Your request to publish {title} has been sent to the approval queue.
        </p>
      </div>
      <button type="button" onClick={onDismiss} style={{ color: "#d97706" }}>
        <X size={13} />
      </button>
    </div>
  );
}
