"use client";

import { useEffect, useRef, useState } from "react";
import { Files, Search, GitBranch, Bug, Package, Check, X } from "lucide-react";

interface CodeWindowProps {
  filename: string;
  language: string;
  code: string;
}

function highlight(line: string) {
  if (line.trim().startsWith("//") || (line.trim().startsWith("#") && !line.includes("!/bin"))) {
    return <span className="text-neutral-500">{line}</span>;
  }

  const parts: { text: string; type: "keyword" | "string" | "plain" }[] = [];
  const regex = /("[^"]*"|'[^']*')|(\b(?:export|async|await|function|const|let|var|return|if|else|class|interface|import|from|def|suspend|fun|val|SELECT|FROM|WHERE|CREATE|TRIGGER|AFTER|BEGIN|END|resource|services|for|do|done|echo|add_header|limit_req|SUM|COUNT|DISTINCT|AS)\b)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) parts.push({ text: line.slice(lastIndex, match.index), type: "plain" });
    if (match[1]) parts.push({ text: match[1], type: "string" });
    else if (match[2]) parts.push({ text: match[2], type: "keyword" });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < line.length) parts.push({ text: line.slice(lastIndex), type: "plain" });

  return (
    <>
      {parts.map((p, i) => (
        <span
          key={i}
          className={
            p.type === "keyword" ? "text-tech-blue" : p.type === "string" ? "text-[#E0B84B]" : "text-neutral-300"
          }
        >
          {p.text}
        </span>
      ))}
    </>
  );
}

const TYPE_SPEED_MS = 10;

export function CodeWindow({ filename, language, code }: CodeWindowProps) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setTyped(code);
      setDone(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setTyped(code.slice(0, i));
            if (i >= code.length) {
              clearInterval(interval);
              setDone(true);
            }
          }, TYPE_SPEED_MS);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [code]);

  const lines = typed.split("\n");

  return (
    <div
      ref={containerRef}
      className="flex overflow-hidden rounded-lg border border-white/10 bg-infra-midnight shadow-lg"
    >
      {/* Activity bar */}
      <div className="flex w-11 flex-col items-center gap-5 border-r border-white/10 bg-black/20 py-4">
        <Files size={16} className="text-neutral-300" strokeWidth={1.75} />
        <Search size={16} className="text-neutral-500" strokeWidth={1.75} />
        <GitBranch size={16} className="text-neutral-500" strokeWidth={1.75} />
        <Bug size={16} className="text-neutral-500" strokeWidth={1.75} />
        <Package size={16} className="text-neutral-500" strokeWidth={1.75} />
      </div>

      <div className="flex-1">
        {/* Tab bar */}
        <div className="flex items-center border-b border-white/10 bg-black/10">
          <div className="flex items-center gap-2 border-r border-white/10 bg-infra-midnight px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-tech-blue/70" />
            <span className="font-technical text-xs text-neutral-200">{filename}</span>
            <X size={12} className="text-neutral-600" />
          </div>
        </div>

        {/* Code */}
        <pre className="overflow-x-auto px-5 py-4 text-[13px] leading-relaxed">
          <code>
            {lines.map((line, i) => {
              const isLast = i === lines.length - 1;
              return (
                <div key={i} className="whitespace-pre">
                  <span className="mr-4 inline-block w-4 select-none text-right text-neutral-600">
                    {i + 1}
                  </span>
                  {highlight(line)}
                  {isLast && !done && (
                    <span className="ml-0.5 inline-block h-[14px] w-[7px] animate-pulse bg-tech-blue align-middle" />
                  )}
                </div>
              );
            })}
          </code>
        </pre>

        {/* Status bar */}
        <div className="flex items-center justify-between bg-tech-blue px-4 py-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-technical text-[10px] text-infra-midnight">
              <GitBranch size={11} /> main
            </span>
            <span className="flex items-center gap-1 font-technical text-[10px] text-infra-midnight">
              <Check size={11} /> No Problems
            </span>
          </div>
          <div className="flex items-center gap-3 font-technical text-[10px] text-infra-midnight">
            <span>UTF-8</span>
            <span className="uppercase">{language}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
