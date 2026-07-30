"use client";

import { useRouter } from "next/navigation";

interface HashLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function HashLink({ href, className, children }: HashLinkProps) {
  const router = useRouter();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    // Always push the full clean href, replacing any existing hash
    router.push(href);
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
