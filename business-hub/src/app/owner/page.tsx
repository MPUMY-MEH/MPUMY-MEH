import { getBusinesses, getPromotionsForBusiness } from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function OwnerDashboard() {
  const businesses = await getBusinesses();
  const first = businesses[0];
  const promotions = first ? await getPromotionsForBusiness(first.id) : [];

  return (
    <div className="container-responsive py-8">
      <h1 className="text-2xl font-semibold">Owner Dashboard</h1>
      {!first ? (
        <div className="mt-4 text-gray-600">No businesses yet. Use the API to create one.</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-4">
            <h2 className="text-lg font-semibold">Your Business</h2>
            <div className="mt-3">{first.name}</div>
            <div className="text-sm text-gray-600">{first.category} • {first.city}</div>
            <Link className="mt-4 inline-block text-brand-600 underline" href={`/businesses/${first.id}`}>View public profile</Link>
          </div>
          <div className="rounded-2xl border bg-white p-4">
            <h2 className="text-lg font-semibold">Promotions</h2>
            {promotions.length === 0 ? (
              <div className="mt-2 text-sm text-gray-500">No promotions. Use API POST /api/promotions to add.</div>
            ) : (
              <ul className="mt-3 space-y-3">
                {promotions.map((p) => (
                  <li key={p.id} className="rounded-xl border p-3">
                    <div className="font-medium">{p.title}</div>
                    {p.description && <div className="text-sm text-gray-600">{p.description}</div>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}