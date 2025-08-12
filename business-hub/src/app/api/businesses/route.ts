import { NextResponse } from 'next/server';
import { createBusinessSchema } from '@/lib/validation';
import { getBusinesses, saveBusiness } from '@/lib/db';
import { Business } from '@/lib/types';

export async function GET() {
  const businesses = await getBusinesses();
  return NextResponse.json(businesses);
}

export async function POST(req: Request) {
  const data = await req.json();
  const parsed = createBusinessSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const input = parsed.data;
  const id = input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const business: Business = {
    id,
    name: input.name,
    category: input.category,
    website: input.website,
    phone: input.phone,
    email: input.email,
    address: input.address,
    city: input.city,
    state: input.state,
    zip: input.zip,
    description: input.description,
    hours: input.hours,
    logoUrl: input.logoUrl,
    heroUrl: input.heroUrl,
    tags: input.tags,
    ownerContact: input.ownerContact
  };
  await saveBusiness(business);
  return NextResponse.json(business, { status: 201 });
}