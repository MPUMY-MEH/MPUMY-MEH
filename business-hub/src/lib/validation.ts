import { z } from 'zod';

export const createMessageSchema = z.object({
  senderType: z.enum(['customer', 'business']),
  senderName: z.string().min(1),
  senderBusinessId: z.string().optional(),
  recipientBusinessId: z.string().min(1),
  channel: z.enum(['customer', 'b2b']),
  content: z.string().min(1).max(2000)
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
});