"use client";

import { useState } from 'react';

export function AddReviewForm({ businessId }: { businessId: string }) {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setStatus(null);
    const payload = {
      businessId,
      authorName: String(formData.get('name') || ''),
      rating: Number(formData.get('rating') || 5),
      content: String(formData.get('content') || ''),
    };
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setStatus(res.ok ? 'Thanks for your review!' : 'Failed to submit review');
  }

  return (
    <form action={handleSubmit} className="mt-4 rounded-xl border p-4">
      <div className="grid grid-cols-1 gap-3">
        <input name="name" required placeholder="Your name" className="rounded-xl border px-3 py-2" />
        <select name="rating" className="rounded-xl border px-3 py-2">
          {[5,4,3,2,1].map((r) => (
            <option key={r} value={r}>{r} stars</option>
          ))}
        </select>
        <textarea name="content" placeholder="Share your experience" className="h-24 rounded-xl border px-3 py-2" />
        <button className="rounded-xl bg-gradient-bh px-4 py-2 font-semibold text-white">Submit Review</button>
        {status && <div className="text-sm text-gray-600">{status}</div>}
      </div>
    </form>
  );
}