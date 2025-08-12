import { searchBusinesses } from '@/lib/db';
import { BusinessCard } from '@/components/BusinessCard';

export const dynamic = 'force-dynamic';

export default async function BusinessesPage({ searchParams }: { searchParams: { q?: string; category?: string; view?: string } }) {
  const q = searchParams.q ?? '';
  const category = searchParams.category ?? '';
  const view = searchParams.view ?? 'list';
  const businesses = await searchBusinesses(q, category);

  return (
    <div className="container-responsive py-8">
      <h1 className="text-2xl font-semibold">Businesses</h1>
      <form className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4" action="/businesses">
        <input
          name="q"
          defaultValue={q}
          className="rounded-xl border border-gray-300 px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          placeholder="Search by name, category, or city"
        />
        <input
          name="category"
          defaultValue={category}
          className="rounded-xl border border-gray-300 px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          placeholder="Filter by category"
        />
        <select name="view" defaultValue={view} className="rounded-xl border border-gray-300 px-4 py-3 text-base shadow-sm">
          <option value="list">List</option>
          <option value="map">Map</option>
        </select>
        <button className="rounded-xl bg-gradient-bh px-5 py-3 font-semibold text-white shadow hover:opacity-95">
          Apply
        </button>
      </form>

      {view === 'map' ? (
        <div className="mt-6 h-[480px] w-full rounded-2xl border bg-gray-50 p-3 text-sm text-gray-600">
          Map view coming soon. Showing {businesses.filter(b => b.location).length} with coordinates.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((b) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </div>
      )}
    </div>
  );
}