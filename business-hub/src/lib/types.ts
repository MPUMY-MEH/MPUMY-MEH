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