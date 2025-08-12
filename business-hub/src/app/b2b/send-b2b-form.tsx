"use client";

import { Business } from '@/lib/types';
import { useState } from 'react';

export function B2BMessageForm({ businesses }: { businesses: Business[] }) {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setStatus(null);
    const payload = {
      senderType: 'business' as const,
      senderName: String(formData.get('senderName') || ''),
      senderBusinessId: String(formData.get('senderBusinessId') || ''),
      recipientBusinessId: String(formData.get('recipientBusinessId') || ''),
      channel: 'b2b' as const,
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
      <div className="grid grid-cols-1 gap-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <div className="mb-1 text-gray-600">From business</div>
            <select name="senderBusinessId" className="w-full rounded-xl border px-3 py-2">
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <div className="mb-1 text-gray-600">To business</div>
            <select name="recipientBusinessId" className="w-full rounded-xl border px-3 py-2">
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </label>
        </div>
        <input name="senderName" placeholder="Your name" className="rounded-xl border px-3 py-2" />
        <textarea name="message" placeholder="Message" className="h-28 rounded-xl border px-3 py-2" />
        <button className="rounded-xl bg-gradient-bh px-4 py-2 font-semibold text-white">Send</button>
        {status && <div className="text-sm text-gray-600">{status}</div>}
      </div>
    </form>
  );
}