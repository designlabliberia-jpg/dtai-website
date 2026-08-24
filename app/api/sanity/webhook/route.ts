import { NextRequest, NextResponse } from "next/server";
import { syncArticleFromWebhook } from "@/lib/actions/articles";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const signature = req.headers.get("sanity-webhook-signature") ?? "";
  const rawBody = await req.text();

  const result = await syncArticleFromWebhook(rawBody, signature);

  if (!result.ok) {
    const status = result.error === "Invalid signature" ? 401 : 400;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ ok: true });
}
