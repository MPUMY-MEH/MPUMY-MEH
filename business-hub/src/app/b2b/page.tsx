import { getBusinesses, getMessages } from '@/lib/db';
import { B2BMessageForm } from './send-b2b-form';

export const dynamic = 'force-dynamic';

export default async function B2BPage() {
  const [businesses, messages] = await Promise.all([getBusinesses(), getMessages()]);
  const b2bMessages = messages.filter((m) => m.channel === 'b2b').slice(-20).reverse();

  return (
    <div className="container-responsive py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-2xl font-semibold">B2B Messaging</h1>
          <p className="mt-2 text-gray-600">Collaborate, share insights, and coordinate with nearby businesses.</p>
          <div className="mt-4">
            <B2BMessageForm businesses={businesses} />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Recent B2B Messages</h2>
          <ul className="mt-4 space-y-3">
            {b2bMessages.map((m) => {
              const sender = businesses.find((b) => b.id === m.senderBusinessId);
              const recipient = businesses.find((b) => b.id === m.recipientBusinessId);
              return (
                <li key={m.id} className="rounded-xl border bg-white p-4 shadow-sm">
                  <div className="text-sm text-gray-500">{new Date(m.createdAt).toLocaleString()}</div>
                  <div className="mt-1 text-sm">
                    <span className="font-semibold">{sender?.name ?? m.senderName}</span>
                    <span className="text-gray-500"> → </span>
                    <span className="font-semibold">{recipient?.name ?? m.recipientBusinessId}</span>
                  </div>
                  <div className="mt-2">{m.content}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}