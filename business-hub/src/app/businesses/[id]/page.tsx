import { getBusinessById, getPromotionsForBusiness, getReviewsForBusiness } from '@/lib/db';
import { notFound } from 'next/navigation';
import { SendMessageForm } from './send-message-form';
import { AddReviewForm } from './add-review-form';

export const dynamic = 'force-dynamic';

export default async function BusinessProfile({ params }: { params: { id: string } }) {
  const [business, reviews, promotions] = await Promise.all([
    getBusinessById(params.id),
    getReviewsForBusiness(params.id),
    getPromotionsForBusiness(params.id),
  ]);
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

            {business.location && (
              <div className="mt-6">
                <div className="text-sm font-semibold">Location</div>
                <div className="mt-2 h-48 w-full overflow-hidden rounded-xl border bg-gray-50">
                  <div className="p-3 text-sm text-gray-600">
                    Lat: {business.location.lat.toFixed(4)}, Lng: {business.location.lng.toFixed(4)}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-lg font-semibold">Promotions</h2>
              {promotions.length === 0 ? (
                <div className="mt-2 text-sm text-gray-500">No promotions yet.</div>
              ) : (
                <ul className="mt-3 space-y-3">
                  {promotions.map((p) => (
                    <li key={p.id} className="rounded-xl border p-4">
                      <div className="font-medium">{p.title}</div>
                      {p.description && <div className="text-gray-600">{p.description}</div>}
                      <div className="mt-1 text-xs text-gray-500">
                        {p.startDate ? new Date(p.startDate).toLocaleDateString() : 'Now'}
                        {p.endDate ? ` - ${new Date(p.endDate).toLocaleDateString()}` : ''}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold">Reviews</h2>
              {reviews.length === 0 ? (
                <div className="mt-2 text-sm text-gray-500">No reviews yet.</div>
              ) : (
                <ul className="mt-3 space-y-3">
                  {reviews.map((r) => (
                    <li key={r.id} className="rounded-xl border p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{r.authorName}</div>
                        <div className="text-sm text-gray-600">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                      </div>
                      {r.content && <div className="mt-2 text-gray-700">{r.content}</div>}
                      <div className="mt-1 text-xs text-gray-500">{new Date(r.createdAt).toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="w-full max-w-lg">
            <SendMessageForm businessId={business.id} />
            <AddReviewForm businessId={business.id} />
          </div>
        </div>
      </div>
    </div>
  );
}