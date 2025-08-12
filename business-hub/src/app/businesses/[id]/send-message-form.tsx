"use client";

import { useState } from 'react';

export function SendMessageForm({ businessId }: { businessId: string }) {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setStatus(null);
    const payload = {
      senderType: 'customer',
      senderName: String(formData.get('name') || ''),
      recipientBusinessId: businessId,
      channel: 'customer',
      content: String(formData.get('message') || ''),
    };

    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) setStatus('Message sent!');
    else setStatus('Failed to send.');
  }

  return (
    <form action={handleSubmit} className="rounded-2xl border p-4 shadow-sm">
      <h2 className="text-lg font-semibold">Contact this business</h2>
      <div className="mt-3 grid grid-cols-1 gap-3">
        <input name="name" required placeholder="Your name" className="rounded-xl border px-3 py-2" />
        <textarea name="message" required placeholder="How can they help?" className="h-28 rounded-xl border px-3 py-2" />
        <button className="rounded-xl bg-gradient-bh px-4 py-2 font-semibold text-white">Send</button>
        {status && <div className="text-sm text-gray-600">{status}</div>}
      </div>
    </form>
  );
}