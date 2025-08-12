import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { searchBusinesses } from '@/lib/db';
import { BusinessCard } from '@/components/BusinessCard';

export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q ?? '';
  const featured = (await searchBusinesses(q)).slice(0, 6);
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-white">
        <div className="container-responsive py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-bh/10">
              <Logo className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Connect with local businesses
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Business Hub helps small businesses reach customers and collaborate with peers.
            </p>
            <form className="mt-8 flex items-center gap-3" action="/businesses">
              <input
                name="q"
                defaultValue={q}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Search by name, category, or city"
              />
              <button className="rounded-xl bg-gradient-bh px-5 py-3 font-semibold text-white shadow hover:opacity-95">
                Search
              </button>
            </form>
            <div className="mt-4 text-sm text-gray-500">
              Or <Link href="/businesses" className="text-brand-600 underline">browse all</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50">
        <div className="container-responsive py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Featured</h2>
            <Link href="/businesses" className="text-brand-600">View all</Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((b) => (
              <BusinessCard key={b.id} business={b} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}