import { z } from 'zod';

export const createMessageSchema = z.object({
  senderType: z.enum(['customer', 'business']),
  senderName: z.string().min(1),
  senderBusinessId: z.string().optional(),
  recipientBusinessId: z.string().min(1),
  channel: z.enum(['customer', 'b2b']),
  content: z.string().min(1).max(2000)
});

const locationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180)
});

export const createBusinessSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  website: z.string().url().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  description: z.string().optional(),
  hours: z.string().optional(),
  logoUrl: z.string().url().optional(),
  heroUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  ownerContact: z
    .object({
      name: z.string().optional(),
      email: z.string().email().optional(),
    })
    .optional(),
  location: locationSchema.optional(),
});

export const updateBusinessSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  website: z.string().url().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  description: z.string().optional(),
  hours: z.string().optional(),
  logoUrl: z.string().url().optional(),
  heroUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  ownerContact: z
    .object({
      name: z.string().optional(),
      email: z.string().email().optional(),
    })
    .optional(),
  location: locationSchema.optional(),
});

export const createReviewSchema = z.object({
  businessId: z.string().min(1),
  authorName: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  content: z.string().max(2000).optional(),
});

export const createPromotionSchema = z.object({
  businessId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().max(2000).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});