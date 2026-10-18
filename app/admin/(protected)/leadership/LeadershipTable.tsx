"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { Pencil, Trash2, UserPlus } from "lucide-react";
import { AdminTable } from "@/components/admin/AdminTable";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { ApprovalToast } from "@/components/admin/ApprovalToast";
import { toggleLeadershipPublished, deleteLeadershipMember, provisionLeadershipAccount } from "@/lib/actions/leadership";

type Member = {
  id: string;
  name: string;
  title: string;
  division: string;
  published: boolean;
  imageUrl: string | null;
  approvalStatus: "pending" | "rejected" | null;
  hasUser: boolean;
};

function ProvisionButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await provisionLeadershipAccount(id, email, password);
      if (result.error) { setError(result.error); return; }
      setOpen(false);
      setEmail("");
      setPassword("");
      router.refresh();
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        title="Provision Account"
        onClick={() => setOpen(true)}
        className="transition-colors"
        style={{ color: "var(--admin-text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}
      >
        <UserPlus size={13} />
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 min-w-[220px]">
      {error && (
        <p className="font-technical text-[10px]" style={{ color: "var(--admin-danger)" }}>{error}</p>
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="rounded-[var(--radius-sm)] px-2 py-1 font-technical text-[11px]"
        style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border-strong)", color: "var(--admin-text-primary)", outline: "none" }}
      />
      <input
        type="password"
        placeholder="Password (min 8)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={8}
        className="rounded-[var(--radius-sm)] px-2 py-1 font-technical text-[11px]"
        style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border-strong)", color: "var(--admin-text-primary)", outline: "none" }}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-[var(--radius-sm)] px-3 py-1 font-technical text-[10px] uppercase tracking-[0.08em] disabled:opacity-60"
          style={{ background: "var(--admin-brand)", color: "#fff" }}
        >
          {pending ? "Creating…" : "Create"}
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setError(null); }}
          className="font-technical text-[10px] uppercase tracking-[0.08em]"
          style={{ color: "var(--admin-text-muted)" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function MemberActions({ id, hasUser }: { id: string; hasUser: boolean }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/leadership/${id}`} title="Edit"
        className="transition-colors" style={{ color: "var(--admin-text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}>
        <Pencil size={13} />
      </Link>
      {!hasUser && <ProvisionButton id={id} />}
      <button type="button" disabled={pending}
        onClick={() => startTransition(async () => { await deleteLeadershipMember(id); router.refresh(); })}
        title="Archive" className="transition-colors disabled:opacity-40"
        style={{ color: "var(--admin-text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-danger)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}>
        <Trash2 size={13} />
      </button>
    </div>
  );
}

export function LeadershipTable({ members }: { members: Member[] }) {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <>
      <ApprovalToast title={toast ?? ""} visible={!!toast} onDismiss={() => setToast(null)} />
      <AdminTable
        rows={members}
        getRowKey={(r) => r.id}
        emptyMessage="No leadership members yet."
        columns={[
          {
            key: "name",
            header: "Name",
            render: (r) => (
              <Link
                href={`/admin/leadership/${r.id}`}
                className="flex items-center gap-3 font-medium transition-colors"
                style={{ color: "var(--admin-text-primary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-primary)")}
              >
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-neutral-200">
                  {r.imageUrl ? (
                    <Image src={r.imageUrl} alt={r.name} fill className="object-cover" sizes="32px" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-technical text-[10px] uppercase" style={{ color: "var(--admin-text-muted)" }}>
                      {r.name[0]}
                    </span>
                  )}
                </div>
                <span>
                  {r.name}
                  {r.hasUser && (
                    <span className="ml-2 font-technical text-[9px] uppercase tracking-[0.08em]" style={{ color: "var(--admin-brand)" }}>
                      · account
                    </span>
                  )}
                </span>
              </Link>
            ),
          },
          {
            key: "title",
            header: "Title",
            render: (r) => <span style={{ color: "var(--admin-text-secondary)" }}>{r.title}</span>,
          },
          {
            key: "division",
            header: "Division",
            width: "130px",
            render: (r) => (
              <span className="font-technical text-[10px] uppercase tracking-[0.08em]" style={{ color: "var(--admin-text-muted)" }}>
                {r.division}
              </span>
            ),
          },
          {
            key: "visible",
            header: "Visible",
            width: "100px",
            render: (r) => (
              <PublishToggle
                id={r.id}
                published={r.published}
                onToggle={(_, v) => toggleLeadershipPublished(r.id, v)}
                labelOn="Visible"
                labelOff="Hidden"
                approvalStatus={r.approvalStatus}
                onPendingApproval={(name) => setToast(name ?? r.name)}
                itemName={r.name}
              />
            ),
          },
          {
            key: "actions",
            header: "Actions",
            width: "100px",
            render: (r) => <MemberActions id={r.id} hasUser={r.hasUser} />,
          },
        ]}
      />
    </>
  );
}
