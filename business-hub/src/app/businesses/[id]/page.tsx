import { getBusinessById } from '@/lib/db';
import { notFound } from 'next/navigation';
import { SendMessageForm } from './send-message-form';

export const dynamic = 'force-dynamic';

export default async function BusinessProfile({ params }: { params: { id: string } }) {
  const business = await getBusinessById(params.id);
  if (!business) return notFound();

  return (
    <div>
      <div className="h-40 w-full bg-gradient-bh/10" />
      <div className="container-responsive -mt-10 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{business.name}</h1>
            <div className="mt-1 text-gray-600">{business.category}</div>
            {business.description && (
              <p className="mt-4 text-gray-700">{business.description}</p>
            )}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {business.website && (
                <a className="rounded-xl border px-4 py-3 hover:bg-gray-50" href={business.website} target="_blank" rel="noreferrer">
                  Website: {business.website}
                </a>
              )}
              {business.phone && (
                <a className="rounded-xl border px-4 py-3 hover:bg-gray-50" href={`tel:${business.phone}`}>
                  Phone: {business.phone}
                </a>
              )}
              {business.email && (
                <a className="rounded-xl border px-4 py-3 hover:bg-gray-50" href={`mailto:${business.email}`}>
                  Email: {business.email}
                </a>
              )}
              {(business.address || business.city) && (
                <div className="rounded-xl border px-4 py-3">
                  Address: {business.address}, {business.city}, {business.state} {business.zip}
                </div>
              )}
            </div>
          </div>
          <div className="w-full max-w-lg">
            <SendMessageForm businessId={business.id} />
          </div>
        </div>
      </div>
    </div>
  );
}