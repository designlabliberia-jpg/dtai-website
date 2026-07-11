"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MousePointer2,
  Play,
  Loader2,
  Files,
  Search,
  GitBranch,
  Bug,
  Package,
  Check,
  Lock,
  RotateCw,
  Code2,
  Smartphone,
  Globe,
  Building2,
  Cloud,
  Brain,
  Database,
  ShieldCheck,
  Server,
  Network,
  Workflow,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { capabilities } from "@/lib/capabilities-data";

interface DemoSnippet {
  path: string;
  language: string;
  code: string;
}

const SNIPPETS: DemoSnippet[] = [
  {
    path: "src/infra/systemHealth.service.ts",
    language: "typescript",
    code: `export async function verifyDeployment(
  system: System
): Promise<HealthReport> {
  await runSecurityAudit(system);

  await validateUptimeTarget(system, {
    target: 99.9,
  });

  const report = await generateComplianceReport(
    system
  );

  return confirmProductionReady(report);
}`,
  },
  {
    path: "src/mobile/SyncManager.kt",
    language: "kotlin",
    code: `suspend fun syncOfflineQueue(
  queue: List<PendingRecord>
): SyncResult {
  val connected =
    NetworkMonitor.isAvailable()

  if (!connected) {
    return SyncResult.Deferred
  }

  val batch = queue.take(BATCH_SIZE)
  return uploadRecords(batch, retry = 3)
}`,
  },
  {
    path: "src/spatial/riskModel.py",
    language: "python",
    code: `def score_service_gap(
    region: Region,
) -> float:
    connectivity = region.connectivity_index
    population = region.population_density
    infra = region.infrastructure_coverage

    return weighted_average(
        [connectivity, population, infra],
        weights=[0.4, 0.35, 0.25],
    )`,
  },
  {
    path: "src/security/authGuard.middleware.ts",
    language: "typescript",
    code: `export function requireClearance(
  role: Role
): Middleware {
  return async (req, res, next) => {
    const session = await verifySession(req);

    if (!session || session.role < role) {
      await logAccessAttempt(req, "denied");
      return res.status(403).end();
    }

    await logAccessAttempt(req, "granted");
    next();
  };
}`,
  },
];

// Icons for the real, current capability list — kept in sync automatically
// since this maps over `capabilities` from lib/capabilities-data.ts rather
// than a hardcoded duplicate list.
const SERVICE_ICONS: Record<string, LucideIcon> = {
  "software-engineering": Code2,
  "mobile-application-development": Smartphone,
  "web-application-development": Globe,
  "enterprise-systems-development": Building2,
  "cloud-solutions": Cloud,
  "artificial-intelligence-solutions": Brain,
  "data-platforms": Database,
  "cybersecurity": ShieldCheck,
  "digital-infrastructure": Server,
  "it-consulting-systems-integration": Network,
  "digital-transformation": Workflow,
  "gis-spatial-technology": MapPin,
};

const SERVICES = capabilities.map((c) => ({
  title: c.title,
  icon: SERVICE_ICONS[c.slug] ?? Code2,
}));

const CURSOR_NEW_TAB = { x: 93, y: 11 };
const CURSOR_RUN_BUTTON = { x: 87, y: 95 };

function highlight(line: string) {
  if (line.trim().startsWith("//") || line.trim().startsWith("#")) {
    return <span className="text-neutral-500">{line}</span>;
  }
  const parts: { text: string; type: "keyword" | "string" | "plain" }[] = [];
  const regex = /("[^"]*"|'[^']*')|(\b(?:export|async|await|function|const|let|var|return|if|else|class|interface|import|from|def|suspend|fun|val|weights)\b)/g;
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
        <span key={i} className={p.type === "keyword" ? "text-tech-blue" : p.type === "string" ? "text-[#E0B84B]" : "text-neutral-300"}>
          {p.text}
        </span>
      ))}
    </>
  );
}

type Stage =
  | "opening-file"
  | "typing"
  | "ready-to-run"
  | "compiling"
  | "browser-opening"
  | "browser"
  | "closing";

type BrowserPhase = "logo" | "heading" | "services" | null;

export function HeroCodeDemo() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [typedPath, setTypedPath] = useState("");
  const [typedCode, setTypedCode] = useState("");
  const [stage, setStage] = useState<Stage>("opening-file");
  const [cursorPos, setCursorPos] = useState(CURSOR_NEW_TAB);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorClicking, setCursorClicking] = useState(false);
  const [browserPhase, setBrowserPhase] = useState<BrowserPhase>(null);
  const [serviceIndex, setServiceIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cancelledRef = useRef(false);
  const inViewRef = useRef(true);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setTypedPath(SNIPPETS[0].path);
      setTypedCode(SNIPPETS[0].code);
      setStage("typing");
      return;
    }

    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        inViewRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.15 }
    );
    observer.observe(el);

    function wait(ms: number) {
      return new Promise<void>((resolve) => setTimeout(resolve, ms));
    }

    async function waitWhileHidden() {
      while (!inViewRef.current && !cancelledRef.current) {
        await wait(150);
      }
    }

    async function typeHuman(text: string, setter: (v: string) => void) {
      let current = "";
      for (const char of text) {
        if (cancelledRef.current) return;
        await waitWhileHidden();
        if (cancelledRef.current) return;
        current += char;
        setter(current);
        let delay = 16 + Math.random() * 34;
        if (char === "\n") delay += 140 + Math.random() * 160;
        if (char === "{" || char === "}") delay += 60 + Math.random() * 100;
        if (Math.random() < 0.045) delay += 280 + Math.random() * 420;
        await wait(delay);
      }
    }

    async function typeFast(text: string, setter: (v: string) => void) {
      let current = "";
      for (const char of text) {
        if (cancelledRef.current) return;
        current += char;
        setter(current);
        await wait(14 + Math.random() * 18);
      }
    }

    async function clickAt(pos: { x: number; y: number }) {
      setCursorVisible(true);
      setCursorPos(pos);
      await wait(550);
      if (cancelledRef.current) return;
      setCursorClicking(true);
      await wait(160);
      setCursorClicking(false);
    }

    async function runLoop() {
      let index = 0;
      while (!cancelledRef.current) {
        setSnippetIndex(index);
        const snippet = SNIPPETS[index];

        setTypedPath("");
        setTypedCode("");
        setBrowserPhase(null);
        setStage("opening-file");
        await clickAt(CURSOR_NEW_TAB);
        if (cancelledRef.current) return;
        await typeFast(snippet.path, setTypedPath);
        await wait(350);
        if (cancelledRef.current) return;

        setCursorVisible(false);
        setStage("typing");
        await typeHuman(snippet.code, setTypedCode);
        await wait(450);
        if (cancelledRef.current) return;

        setStage("ready-to-run");
        await clickAt(CURSOR_RUN_BUTTON);
        if (cancelledRef.current) return;
        setCursorVisible(false);

        setStage("compiling");
        await wait(600);
        if (cancelledRef.current) return;

        // "A web opens" — browser chrome transition, then the DTAI logo,
        // then a persistent heading, then every real service animating
        // through one at a time, big and clear.
        setStage("browser-opening");
        await wait(350);
        if (cancelledRef.current) return;

        setStage("browser");
        setBrowserPhase("logo");
        await wait(1100);
        if (cancelledRef.current) return;

        setBrowserPhase("heading");
        await wait(600);
        if (cancelledRef.current) return;

        setBrowserPhase("services");
        for (let s = 0; s < SERVICES.length; s++) {
          setServiceIndex(s);
          await wait(950);
          if (cancelledRef.current) return;
        }

        setStage("closing");
        await wait(400);
        if (cancelledRef.current) return;

        index = (index + 1) % SNIPPETS.length;
      }
    }

    runLoop();

    return () => {
      cancelledRef.current = true;
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const snippet = SNIPPETS[snippetIndex];
  const codeLines = typedCode.split("\n");
  const isBrowserMode = stage === "browser-opening" || stage === "browser" || stage === "closing";
  const CurrentServiceIcon = SERVICES[serviceIndex]?.icon ?? Code2;

  return (
    <div
      ref={containerRef}
      className="relative flex h-[440px] w-full overflow-hidden rounded-lg border border-white/10 bg-infra-midnight shadow-lg"
    >
      {!isBrowserMode && (
        <div className="flex w-11 shrink-0 flex-col items-center gap-5 border-r border-white/10 bg-black/20 py-4">
          <Files size={16} className="text-neutral-300" strokeWidth={1.75} />
          <Search size={16} className="text-neutral-500" strokeWidth={1.75} />
          <GitBranch size={16} className="text-neutral-500" strokeWidth={1.75} />
          <Bug size={16} className="text-neutral-500" strokeWidth={1.75} />
          <Package size={16} className="text-neutral-500" strokeWidth={1.75} />
        </div>
      )}

      <div className="flex flex-1 flex-col">
        {isBrowserMode ? (
          /* Browser chrome — traffic lights + address bar, reads as "a
             webpage opened" rather than a panel swap inside the editor. */
          <div
            className={`flex items-center gap-3 border-b border-white/10 bg-black/20 px-4 py-2.5 transition-opacity duration-300 ${
              stage === "browser-opening" ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-md bg-white/10 px-3 py-1.5">
              <Lock size={11} className="text-neutral-400" />
              <span className="font-technical text-[11px] text-neutral-300">
                dtai.designlab.technology
              </span>
            </div>
            <RotateCw size={13} className="text-neutral-500" />
          </div>
        ) : (
          <div className="flex items-center justify-between border-b border-white/10 bg-black/10 pr-3">
            <div className="flex items-center gap-2 border-r border-white/10 bg-infra-midnight px-4 py-2.5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-tech-blue/70" />
              <span className="font-technical text-xs text-neutral-200">
                {typedPath || "\u00A0"}
                {stage === "opening-file" && typedPath.length < snippet.path.length && (
                  <span className="ml-0.5 inline-block h-[11px] w-[6px] animate-pulse bg-tech-blue align-middle" />
                )}
              </span>
            </div>
            <span className="font-technical text-[10px] text-neutral-600">+ new tab</span>
          </div>
        )}

        <div className="relative flex-1 overflow-hidden">
          {!isBrowserMode && (
            <pre className="h-full overflow-hidden px-5 py-4 text-[12.5px] leading-relaxed">
              <code>
                {codeLines.map((line, i) => {
                  const isLast = i === codeLines.length - 1;
                  return (
                    <div key={i} className="whitespace-pre">
                      <span className="mr-4 inline-block w-4 select-none text-right text-neutral-600">
                        {i + 1}
                      </span>
                      {highlight(line)}
                      {isLast && stage === "typing" && (
                        <span className="ml-0.5 inline-block h-[13px] w-[7px] animate-pulse bg-tech-blue align-middle" />
                      )}
                    </div>
                  );
                })}
              </code>
            </pre>
          )}

          {stage === "compiling" && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-infra-midnight/95">
              <Loader2 size={14} className="animate-spin text-tech-blue" />
              <span className="font-technical text-xs text-neutral-300">Building...</span>
            </div>
          )}

          {isBrowserMode && (
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-white px-8 transition-opacity duration-300 ${
                stage === "browser-opening" || stage === "closing" ? "opacity-0" : "opacity-100"
              }`}
            >
              {browserPhase === "logo" && (
                <div className="flex flex-col items-center" style={{ animation: "heroDemoFadeIn 0.5s ease both" }}>
                  <Image
                    src="/assets/dtai-logo.png"
                    alt="DTAI"
                    width={64}
                    height={64}
                    className="h-16 w-auto object-contain"
                  />
                </div>
              )}

              {(browserPhase === "heading" || browserPhase === "services") && (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <p
                    className="font-technical text-xs uppercase tracking-wide text-neutral-500"
                    style={{ animation: "heroDemoFadeIn 0.4s ease both" }}
                  >
                    At DTAI, we offer:
                  </p>

                  {browserPhase === "services" && (
                    <>
                      <div
                        key={serviceIndex}
                        className="mt-6 flex flex-col items-center"
                        style={{ animation: "heroDemoServiceIn 0.4s ease both" }}
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand/10">
                          <CurrentServiceIcon size={30} className="text-brand" strokeWidth={1.5} />
                        </div>
                        <p className="mt-4 max-w-[280px] text-center font-primary text-xl font-semibold text-neutral-900">
                          {SERVICES[serviceIndex]?.title}
                        </p>
                      </div>

                      <div className="mt-8 flex gap-1.5">
                        {SERVICES.map((_, i) => (
                          <span
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              i === serviceIndex ? "w-4 bg-brand" : "w-1.5 bg-neutral-300"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {!isBrowserMode && (
          <div className="flex items-center justify-between bg-tech-blue px-4 py-1">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-technical text-[10px] text-infra-midnight">
                <GitBranch size={11} /> main
              </span>
              <span className="flex items-center gap-1 font-technical text-[10px] text-infra-midnight">
                <Check size={11} /> No Problems
              </span>
            </div>
            <div
              className={`flex items-center gap-1.5 rounded px-2 py-0.5 font-technical text-[10px] font-semibold text-infra-midnight transition-colors ${
                stage === "ready-to-run" || cursorClicking ? "bg-white" : "bg-white/70"
              }`}
            >
              <Play size={10} fill="currentColor" />
              Run
            </div>
          </div>
        )}
      </div>

      <div
        className={`pointer-events-none absolute z-10 transition-all duration-500 ease-out ${
          cursorVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
      >
        <MousePointer2
          size={18}
          className="-translate-x-1 -translate-y-1 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
          fill="white"
        />
        {cursorClicking && (
          <span className="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-tech-blue/70" />
        )}
      </div>

      <style>{`
        @keyframes heroDemoFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroDemoServiceIn {
          from { opacity: 0; transform: scale(0.94); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
