"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { ChatWidget } from "@/components/layout/ChatWidget";
import { CHAT_CHANNELS, buildWhatsAppUrl, type ChannelId } from "@/lib/chat-channels";

// ─── Constants ────────────────────────────────────────────────────────────────

const FAB_VARIANTS = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, delay: 0.5 } },
};

const PICKER_VARIANTS = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: [0.2, 0, 0, 1] as [number, number, number, number] } },
};

const CHANNEL_ICON: Record<ChannelId, React.ReactNode> = {
  whatsapp: (
    // Inline WhatsApp SVG — zero dependency, zero bundle cost
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  agent: <MessageCircle size={18} strokeWidth={1.75} />,
};

const CHANNEL_COLORS: Record<ChannelId, string> = {
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe5d]",
  agent: "bg-tech-blue/15 text-tech-blue hover:bg-tech-blue/25",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ChatLauncher() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);

  const togglePicker = useCallback(() => {
    setPickerOpen((v) => !v);
    setAgentOpen(false);
  }, []);

  const handleChannelSelect = useCallback((id: ChannelId) => {
    if (id === "whatsapp") {
      window.open(buildWhatsAppUrl(), "_blank", "noopener,noreferrer");
      setPickerOpen(false);
    } else {
      setAgentOpen(true);
      setPickerOpen(false);
    }
  }, []);

  const handleAgentClose = useCallback(() => setAgentOpen(false), []);

  const fabIsActive = pickerOpen || agentOpen;

  return (
    <>
      {/* AI Chat Panel */}
      <ChatWidget open={agentOpen} onClose={handleAgentClose} />

      {/* Channel Picker */}
      <AnimatePresence>
        {pickerOpen && (
          <motion.div
            variants={PICKER_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ position: "fixed", bottom: "6rem", left: "1rem", zIndex: 9999 }}
            className="flex flex-col gap-2"
            role="menu"
            aria-label="Chat channel options"
          >
            {CHAT_CHANNELS.map((channel) => (
              <motion.button
                key={channel.id}
                type="button"
                role="menuitem"
                aria-label={channel.ariaLabel}
                onClick={() => handleChannelSelect(channel.id)}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.12 }}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 shadow-lg backdrop-blur-sm transition-colors duration-micro ${CHANNEL_COLORS[channel.id]}`}
              >
                {CHANNEL_ICON[channel.id]}
                <div className="text-left">
                  <p className="text-sm font-semibold leading-none">{channel.label}</p>
                  <p className="mt-0.5 text-[10px] opacity-70">{channel.sublabel}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        type="button"
        onClick={togglePicker}
        aria-label={fabIsActive ? "Close chat options" : "Open chat options"}
        aria-expanded={pickerOpen}
        aria-haspopup="menu"
        variants={FAB_VARIANTS}
        initial="hidden"
        animate="visible"
        style={{ position: "fixed", bottom: "1.5rem", left: "1rem", zIndex: 9999 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-infra-midnight shadow-lg transition-colors duration-micro hover:bg-neutral-900"
      >
        <AnimatePresence mode="wait" initial={false}>
          {fabIsActive ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={20} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={20} className="text-tech-blue" strokeWidth={1.75} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Notification dot — only when fully idle */}
        {!fabIsActive && (
          <span className="pointer-events-none absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-tech-blue">
            <span className="absolute inset-0 animate-ping rounded-full bg-tech-blue opacity-60" />
          </span>
        )}
      </motion.button>
    </>
  );
}
