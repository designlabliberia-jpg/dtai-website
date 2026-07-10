"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/web3forms";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm DTAI Agent. I can answer questions about DTAI's capabilities, solutions, industries, and approach — I can also take you straight to any page, or pass your details to the team if you'd like to get in touch. What would you like to know?",
};

const AUTO_OPEN_DELAY_MS = 4500;
const AUTO_OPEN_SESSION_KEY = "dtai-agent-auto-opened";
const INACTIVITY_TIMEOUT_MS = 45000;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Proactively greet once per browser session, if the visitor hasn't
  // already opened the chat themselves in that time.
  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem(AUTO_OPEN_SESSION_KEY);
    if (alreadyOpened) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(AUTO_OPEN_SESSION_KEY, "1");
    }, AUTO_OPEN_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // Auto-collapse back to the floating icon after a period of inactivity.
  // Conversation history is preserved — reopening picks up where it left off.
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function resetInactivityTimer() {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      setOpen(false);
    }, INACTIVITY_TIMEOUT_MS);
  }

  useEffect(() => {
    if (!open) {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      return;
    }
    resetInactivityTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [open, messages, loading]);

  function handleOpenToggle() {
    setOpen((v) => !v);
    sessionStorage.setItem(AUTO_OPEN_SESSION_KEY, "1");
  }

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setError(null);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: nextMessages.slice(0, -1) }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);

      // Execute a lead submission if the model decided it has enough info.
      if (data.lead?.name && data.lead?.email && data.lead?.message) {
        submitLead({
          name: data.lead.name,
          email: data.lead.email,
          organization: data.lead.organization,
          phone: data.lead.phone,
          category: data.lead.category || "other",
          message: data.lead.message,
          source: "dtai-agent",
        }).then((success) => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: success
                ? "✓ Sent to the DTAI team — someone will be in touch shortly."
                : "I wasn't able to send that through just now. Please use the Contact page instead, or try again in a moment.",
            },
          ]);
        });
      }

      // Execute navigation if the model requested it.
      if (data.navigateTo) {
        setTimeout(() => {
          router.push(data.navigateTo);
        }, 900);
      }
    } catch {
      setError("Connection issue. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            style={{ position: "fixed", bottom: "6rem", left: "1rem", zIndex: 9999 }}
            className="flex h-[520px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-xl border border-white/10 bg-infra-midnight shadow-2xl"
          >
            <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3.5">
              <div className="pointer-events-none absolute inset-2">
                <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-tech-blue/40" />
                <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-tech-blue/40" />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-tech-blue/15">
                  <MessageCircle size={15} className="text-tech-blue" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-primary text-sm font-semibold text-white">DTAI Agent</p>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tech-blue" />
                    <span className="font-technical text-[9px] uppercase tracking-wide text-neutral-400">
                      Online
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-md p-1.5 text-neutral-400 transition-colors duration-micro hover:bg-white/5 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user" ? "bg-tech-blue text-infra-midnight" : "bg-white/5 text-neutral-200"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3.5 py-2.5">
                    <Loader2 size={13} className="animate-spin text-tech-blue" />
                    <span className="font-technical text-[10px] uppercase tracking-wide text-neutral-500">
                      Thinking
                    </span>
                  </div>
                </div>
              )}
              {error && (
                <div className="rounded-lg border border-red-400/20 bg-red-400/5 px-3.5 py-2.5 text-xs text-red-300">
                  {error}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-3">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => { setInput(e.target.value); resetInactivityTimer(); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about DTAI's capabilities..."
                  rows={1}
                  maxLength={1500}
                  disabled={loading}
                  className="max-h-24 flex-1 resize-none rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none transition-colors duration-micro focus:border-tech-blue disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-tech-blue text-infra-midnight transition-colors duration-micro hover:bg-white disabled:opacity-40"
                >
                  <Send size={15} strokeWidth={2} />
                </button>
              </div>
              <p className="mt-2 font-technical text-[9px] uppercase tracking-wide text-neutral-500">
                AI assistant &middot; answers from published DTAI content
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleOpenToggle}
        aria-label={open ? "Close DTAI Agent chat" : "Open DTAI Agent chat"}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        style={{ position: "fixed", bottom: "1.5rem", left: "1rem", zIndex: 9999 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-infra-midnight shadow-lg transition-colors duration-micro hover:bg-neutral-900"
      >
        {open ? (
          <X size={20} className="text-white" />
        ) : (
          <MessageCircle size={20} className="text-tech-blue" strokeWidth={1.75} />
        )}
        {!open && (
          <span className="pointer-events-none absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-tech-blue">
            <span className="absolute inset-0 animate-ping rounded-full bg-tech-blue opacity-60" />
          </span>
        )}
      </motion.button>
    </>
  );
}
