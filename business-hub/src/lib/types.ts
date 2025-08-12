export type Business = {
  id: string;
  name: string;
  category: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  description?: string;
  hours?: string;
  logoUrl?: string;
  heroUrl?: string;
  tags?: string[];
  ownerContact?: {
    name?: string;
    email?: string;
  };
  location?: {
    lat: number;
    lng: number;
  };
};

export type Message = {
  id: string;
  createdAt: string; // ISO date
  senderType: 'customer' | 'business';
  senderName: string;
  senderBusinessId?: string;
  recipientBusinessId: string;
  channel: 'customer' | 'b2b';
  content: string;
};

export type Review = {
  id: string;
  businessId: string;
  createdAt: string; // ISO date
  authorName: string;
  rating: number; // 1-5 validated via zod
  content?: string;
};

export type Promotion = {
  id: string;
  businessId: string;
  title: string;
  description?: string;
  startDate?: string; // ISO date
  endDate?: string; // ISO date
  createdAt: string; // ISO date
};