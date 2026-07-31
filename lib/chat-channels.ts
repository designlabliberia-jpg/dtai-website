export type ChannelId = "agent" | "whatsapp";

export interface ChatChannel {
  id: ChannelId;
  label: string;
  sublabel: string;
  ariaLabel: string;
}

/** WhatsApp deep-link config — update phone/message here only. */
export const WHATSAPP_CONFIG = {
  /** E.164 format, no '+' or spaces: e.g. "2319XXXXXXXX" */
  phone: "231881932488",
  prefillMessage: "Hi DTAI, I'd like to learn more about your services.",
} as const;

export function buildWhatsAppUrl(config = WHATSAPP_CONFIG): string {
  return `https://wa.me/${config.phone}?text=${encodeURIComponent(config.prefillMessage)}`;
}

export const CHAT_CHANNELS: ChatChannel[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    sublabel: "Chat with the team",
    ariaLabel: "Open WhatsApp chat with DTAI",
  },
  {
    id: "agent",
    label: "DTAI Agent",
    sublabel: "AI-powered assistant",
    ariaLabel: "Open DTAI AI assistant",
  },
];
