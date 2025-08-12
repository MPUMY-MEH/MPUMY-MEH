import Link from 'next/link';
import { Business } from '@/lib/types';

export function BusinessCard({ business }: { business: Business }) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
      <div className="h-32 w-full bg-gradient-bh/10" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">
          <Link href={`/businesses/${business.id}`} className="hover:text-brand-600">
            {business.name}
          </Link>
        </h3>
        <div className="mt-1 text-sm text-gray-600">{business.category}</div>
        {business.city && (
          <div className="mt-1 text-sm text-gray-500">{business.city}, {business.state}</div>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {(business.tags ?? []).slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}