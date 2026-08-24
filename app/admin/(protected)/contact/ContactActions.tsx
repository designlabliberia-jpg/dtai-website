"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCheck, Trash2 } from "lucide-react";
import { markContactRead, deleteContactSubmission } from "./actions";

interface ContactActionsProps {
  id: string;
  status: string;
}

export function ContactActions({ id, status }: ContactActionsProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleRead() {
    startTransition(async () => {
      await markContactRead(id);
      router.refresh();
    });
  }

  function handleDelete() {
    if (!confirm("Archive this submission?")) return;
    startTransition(async () => {
      await deleteContactSubmission(id);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-2">
      {status === "new" && (
        <button
          onClick={handleRead}
          disabled={pending}
          title="Mark as read"
          className="text-neutral-400 hover:text-brand transition-colors disabled:opacity-40"
        >
          <CheckCheck size={14} />
        </button>
      )}
      <button
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
