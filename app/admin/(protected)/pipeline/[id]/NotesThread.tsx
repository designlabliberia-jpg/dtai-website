"use client";

import { useActionState, useTransition } from "react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Send } from "lucide-react";
import { Panel } from "@/components/admin/Panel";
import { addClientNote, deleteClientNote } from "@/lib/actions/clients";
import type { ClientActionState } from "@/lib/actions/clients";

interface Note {
  id: string;
  note: string;
  createdAt: Date;
}

interface NotesThreadProps {
  clientId: string;
  notes: Note[];
}

const initialState: ClientActionState = { success: false, error: "" };

export function NotesThread({ clientId, notes }: NotesThreadProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [deletePending, startDelete] = useTransition();

  const boundAction = addClientNote.bind(null, clientId);
  const [state, formAction, pending] = useActionState(
    boundAction as (prev: ClientActionState | null, fd: FormData) => Promise<ClientActionState>,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      router.refresh();
    }
  }, [state.success, router]);

  function handleDelete(noteId: string) {
    startDelete(async () => {
      await deleteClientNote(noteId);
      router.refresh();
    });
  }

  return (
    <Panel accent title="Notes">
      <div className="flex flex-col gap-4">
        {/* Add note form */}
        <form ref={formRef} action={formAction} className="flex gap-2">
          <input
            name="note"
            placeholder="Add a note…"
            required
            className="flex-1 rounded-[var(--radius-sm)] px-3 py-2 text-sm outline-none"
            style={{
              background: "var(--admin-surface)",
              border: state.error ? "1px solid var(--admin-danger)" : "1px solid var(--admin-border-strong)",
              color: "var(--admin-text-primary)",
            }}
          />
          <button
            type="submit"
            disabled={pending}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] transition-opacity disabled:opacity-60"
            style={{ background: "var(--admin-brand)", color: "#fff" }}
          >
            <Send size={13} />
          </button>
        </form>

        {state.error && (
          <p className="font-technical text-[10px]" style={{ color: "var(--admin-danger)" }}>
            {state.error}
          </p>
        )}

        {/* Notes list */}
        {notes.length === 0 ? (
          <p
            className="py-4 text-center font-technical text-[10px] uppercase tracking-widest"
            style={{ color: "var(--admin-text-muted)" }}
          >
            No notes yet
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {notes.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3 rounded-[var(--radius-sm)] px-4 py-3"
                style={{ background: "var(--admin-surface-2)", border: "1px solid var(--admin-border)" }}
              >
                <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--admin-text-primary)" }}>
                  {n.note}
                </p>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="font-technical text-[9px]" style={{ color: "var(--admin-text-muted)" }}>
                    {n.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(n.id)}
                    disabled={deletePending}
                    className="transition-colors disabled:opacity-40"
                    style={{ color: "var(--admin-text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-danger)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Panel>
  );
}
