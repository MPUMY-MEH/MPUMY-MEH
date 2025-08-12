import { getBusinesses, getMessages } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  const [businesses, messages] = await Promise.all([getBusinesses(), getMessages()]);
  const recent = messages.slice(-50).reverse();

  return (
    <div className="container-responsive py-8">
      <h1 className="text-2xl font-semibold">Messages</h1>
      <ul className="mt-6 space-y-3">
        {recent.map((m) => {
          const recipient = businesses.find((b) => b.id === m.recipientBusinessId);
          return (
            <li key={m.id} className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="text-sm text-gray-500">{new Date(m.createdAt).toLocaleString()} • {m.channel.toUpperCase()}</div>
              <div className="mt-1 text-sm">
                <span className="font-semibold">{m.senderName}</span>
                <span className="text-gray-500"> → </span>
                <span className="font-semibold">{recipient?.name ?? m.recipientBusinessId}</span>
              </div>
              <div className="mt-2">{m.content}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}