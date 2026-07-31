"use client";

import { useEffect, useRef, useState } from "react";
import { Files, Search, GitBranch, Bug, Package, Check, X } from "lucide-react";

interface Snippet {
  filename: string;
  language: string;
  code: string;
}

interface CodeWindowProps {
  // Single-shot mode (used on service pages): types once when scrolled
  // into view, then stops. Unchanged from before.
  filename?: string;
  language?: string;
  code?: string;
  // Loop mode (used in the Hero): cycles through multiple real snippets
  // forever — types one out, holds briefly, clears, types the next.
  snippets?: Snippet[];
  loopHoldMs?: number;
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
const DEFAULT_HOLD_MS = 1800;
const CLEAR_PAUSE_MS = 300;

export function CodeWindow({
  filename,
  language,
  code,
  snippets,
  loopHoldMs = DEFAULT_HOLD_MS,
}: CodeWindowProps) {
  const isLoopMode = Array.isArray(snippets) && snippets.length > 0;

  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasStarted = useRef(false);
  const activeRef = useRef(true); // whether the window is currently in view

  const currentFilename = isLoopMode ? snippets![activeIndex].filename : filename ?? "";
  const currentLanguage = isLoopMode ? snippets![activeIndex].language : language ?? "";

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion: show one static snippet, no animation, no loop.
    if (reduceMotion) {
      setTyped(isLoopMode ? snippets![0].code : code ?? "");
      setDone(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        activeRef.current = entries[0].isIntersecting;
        if (entries[0].isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          runTypingLoop();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);

    let cancelled = false;

    function wait(ms: number) {
      return new Promise<void>((resolve) => {
        const check = () => {
          if (cancelled) return resolve();
          setTimeout(resolve, ms);
        };
        check();
      });
    }

    async function typeOut(text: string) {
      for (let i = 1; i <= text.length; i++) {
        if (cancelled) return;
        // Pause typing (but don't reset progress) while scrolled out of view.
        while (!activeRef.current && !cancelled) {
          await wait(150);
        }
        if (cancelled) return;
        setTyped(text.slice(0, i));
        await wait(TYPE_SPEED_MS);
      }
    }

    async function runTypingLoop() {
      if (!isLoopMode) {
        // Single-shot: type once, then stop.
        await typeOut(code ?? "");
        if (!cancelled) setDone(true);
        return;
      }

      // Loop mode: type each snippet, hold, clear, move to next — forever.
      let index = 0;
      while (!cancelled) {
        setActiveIndex(index);
        setTyped("");
        setDone(false);
        await typeOut(snippets![index].code);
        if (cancelled) return;
        setDone(true);
        await wait(loopHoldMs);
        if (cancelled) return;
        setDone(false);
        setTyped("");
        await wait(CLEAR_PAUSE_MS);
        index = (index + 1) % snippets!.length;
      }
    }

    return () => {
      cancelled = true;
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <span className="font-technical text-xs text-neutral-200">{currentFilename}</span>
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
                  {isLast && (
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
            <span className="uppercase">{currentLanguage}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
