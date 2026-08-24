"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCheck, Trash2 } from "lucide-react";
import { markApplicationReviewing, deleteApplication } from "./actions";

interface ApplicationActionsProps {
  id: string;
  status: string;
}

export function ApplicationActions({ id, status }: ApplicationActionsProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleReview() {
    startTransition(async () => {
      await markApplicationReviewing(id);
      router.refresh();
    });
  }

  function handleDelete() {
    if (!confirm("Archive this application?")) return;
    startTransition(async () => {
      await deleteApplication(id);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-2">
      {status === "new" && (
        <button
          type="button"
          onClick={handleReview}
          disabled={pending}
          title="Mark as reviewing"
          className="text-neutral-400 hover:text-brand transition-colors disabled:opacity-40"
        >
          <CheckCheck size={14} />
        </button>
      )}
      <button
        type="button"
        onClick={handleDelete}
        disabled={pending}
        title="Archive"
        className="text-neutral-400 hover:text-red-500 transition-colors disabled:opacity-40"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
