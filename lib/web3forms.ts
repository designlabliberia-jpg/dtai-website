export interface LeadSubmission {
  name: string;
  email: string;
  organization?: string;
  phone?: string;
  category: string;
  message: string;
  source: "contact-form" | "dtai-agent";
}

const CATEGORY_LABELS: Record<string, string> = {
  government: "Government Executive",
  technical: "Technical Director / CIO",
  procurement: "Procurement Officer",
  partner: "International Partner",
  other: "General Inquiry",
};

function buildFormattedMessage(lead: LeadSubmission): string {
  const categoryLabel = CATEGORY_LABELS[lead.category] ?? lead.category;
  const sourceLabel = lead.source === "dtai-agent" ? "DTAI Agent (chat)" : "Contact Form";

  return [
    "════════════════════════════════════",
    "  NEW INQUIRY — DTAI WEBSITE",
    "════════════════════════════════════",
    "",
    `CATEGORY:      ${categoryLabel}`,
    `SOURCE:        ${sourceLabel}`,
    "",
    "── CONTACT DETAILS ──────────────────",
    `Name:          ${lead.name}`,
    `Email:         ${lead.email}`,
    `Organization:  ${lead.organization?.trim() || "Not provided"}`,
    `Phone:         ${lead.phone?.trim() || "Not provided"}`,
    "",
    "── MESSAGE ──────────────────────────",
    lead.message,
    "",
    "════════════════════════════════════",
    "Reply directly to this email to respond to the sender.",
    "════════════════════════════════════",
  ].join("\n");
}

export async function submitLead(lead: LeadSubmission): Promise<boolean> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!accessKey) {
    console.error("Web3Forms access key is not configured.");
    return false;
  }

  const categoryLabel = CATEGORY_LABELS[lead.category] ?? lead.category;

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[DTAI Website] ${categoryLabel} — ${lead.name}`,
        from_name: "DTAI Website",
        replyto: lead.email,
        message: buildFormattedMessage(lead),
      }),
    });
    const data = await res.json();
    return res.ok && data.success;
  } catch (err) {
    console.error("Web3Forms submission error:", err);
    return false;
  }
}
