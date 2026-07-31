"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const spring = { type: "spring", damping: 30, stiffness: 300 } as const;

export function JobDetailPanel({ open, onClose, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const isMobile = window.innerWidth < 1024;
    if (isMobile) document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <motion.div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden />
          <motion.div className="relative z-10 max-h-[90dvh] rounded-t-2xl bg-white shadow-lg flex flex-col overflow-hidden" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={spring}>
            <div className="flex items-end mx-auto mt-3 mb-1 h-1 w-10 itrounded-full bg-neutral-300 shrink-0" />
              <button onClick={onClose} aria-label="Close" className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 transition-colors"><X size={18} /></button>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
