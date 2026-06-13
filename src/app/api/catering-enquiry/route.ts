import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

interface BagItem {
  name: string;
  quantity: number;
  price: number;
}

interface Body {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  guests: string;
  eventType: string;
  serviceStyle: string;
  details: string;
  items?: BagItem[];
  estimatedTotal?: string;
}

export async function POST(request: Request) {
  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ error: "Resend API key not configured" }, { status: 500 });
  }

  try {
    const body: Body = await request.json();
    const { firstName, lastName, phone, email, guests, eventType, serviceStyle, details, items, estimatedTotal } = body;

    const name = `${firstName} ${lastName}`.trim();

    let itemsHtml = "";
    if (items && items.length > 0) {
      itemsHtml = `
        <h3 style="margin: 20px 0 10px; font-size: 14px; color: #0D2A27;">Selected Items</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background: #F5F0EB; text-align: left;">
              <th style="padding: 8px 12px; border: 1px solid #E8E0D6;">Item</th>
              <th style="padding: 8px 12px; border: 1px solid #E8E0D6;">Qty</th>
              <th style="padding: 8px 12px; border: 1px solid #E8E0D6;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((i) => `
              <tr>
                <td style="padding: 8px 12px; border: 1px solid #E8E0D6;">${i.name}</td>
                <td style="padding: 8px 12px; border: 1px solid #E8E0D6;">${i.quantity}</td>
                <td style="padding: 8px 12px; border: 1px solid #E8E0D6;">$${(i.price * i.quantity).toLocaleString()}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
        ${estimatedTotal ? `<p style="margin-top: 12px; font-size: 16px; font-weight: 600; color: #1A7A6E;">Estimated Total: ${estimatedTotal}</p>` : ""}
      `;
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: ui-serif, Georgia, serif; background: #FAF7F2; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 3px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
            <div style="background: #1A7A6E; padding: 24px 32px;">
              <h1 style="font-size: 22px; color: #F5F0EB; margin: 0; font-weight: 400;">New Catering Inquiry</h1>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 8px 0; color: #8B7D6B; width: 140px;">Name</td><td style="padding: 8px 0; color: #0D2A27;">${name}</td></tr>
                <tr><td style="padding: 8px 0; color: #8B7D6B;">Email</td><td style="padding: 8px 0; color: #0D2A27;"><a href="mailto:${email}" style="color: #1A7A6E;">${email}</a></td></tr>
                ${phone ? `<tr><td style="padding: 8px 0; color: #8B7D6B;">Phone</td><td style="padding: 8px 0; color: #0D2A27;">${phone}</td></tr>` : ""}
                <tr><td style="padding: 8px 0; color: #8B7D6B;">Event Type</td><td style="padding: 8px 0; color: #0D2A27;">${eventType || "—"}</td></tr>
                <tr><td style="padding: 8px 0; color: #8B7D6B;">Service Style</td><td style="padding: 8px 0; color: #0D2A27;">${serviceStyle || "—"}</td></tr>
                <tr><td style="padding: 8px 0; color: #8B7D6B;">Guest Count</td><td style="padding: 8px 0; color: #0D2A27;">${guests || "—"}</td></tr>
              </table>
              ${itemsHtml}
              ${details ? `
                <h3 style="margin: 20px 0 10px; font-size: 14px; color: #0D2A27;">Additional Details</h3>
                <p style="font-size: 14px; color: #5A4E3E; line-height: 1.7; white-space: pre-wrap;">${details}</p>
              ` : ""}
            </div>
            <div style="background: #F5F0EB; padding: 16px 32px; font-size: 12px; color: #8B7D6B; text-align: center;">
              Sent via Melt N Dip website
            </div>
          </div>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      subject: `New Catering Inquiry — ${name}`,
      html,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send inquiry" }, { status: 500 });
  }
}
