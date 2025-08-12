import { promises as fs } from 'fs';
import path from 'path';
import { Business, Message } from './types';

const dataDir = path.join(process.cwd(), 'data');
const businessesFile = path.join(dataDir, 'businesses.json');
const messagesFile = path.join(dataDir, 'messages.json');

async function ensureDataFilesExist(): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(businessesFile);
  } catch {
    const seedBusinesses: Business[] = [
      {
        id: 'bistro-bella',
        name: 'Bistro Bella',
        category: 'Restaurant',
        website: 'https://bistrobella.example.com',
        phone: '(555) 123-4567',
        email: 'hello@bistrobella.example.com',
        address: '123 Main St',
        city: 'Riverdale',
        state: 'CA',
        zip: '90210',
        description: 'Cozy neighborhood bistro serving seasonal dishes.',
        hours: 'Mon-Sun 11am - 10pm',
        logoUrl: '',
        heroUrl: '',
        tags: ['casual', 'family-friendly']
      },
      {
        id: 'fixit-garage',
        name: 'FixIt Garage',
        category: 'Auto Repair',
        website: 'https://fixitgarage.example.com',
        phone: '(555) 987-6543',
        email: 'contact@fixitgarage.example.com',
        address: '77 Oak Ave',
        city: 'Riverdale',
        state: 'CA',
        zip: '90210',
        description: 'Trusted auto repair and maintenance since 1998.',
        hours: 'Mon-Fri 8am - 6pm',
        logoUrl: '',
        heroUrl: '',
        tags: ['ASE certified', 'oil change', 'brakes']
      },
      {
        id: 'petal-pushers',
        name: 'Petal Pushers',
        category: 'Florist',
        website: 'https://petalpushers.example.com',
        phone: '(555) 234-7890',
        email: 'orders@petalpushers.example.com',
        address: '9 Garden Ln',
        city: 'Riverdale',
        state: 'CA',
        zip: '90210',
        description: 'Fresh bouquets and custom arrangements for all occasions.',
        hours: 'Mon-Sat 9am - 7pm',
        logoUrl: '',
        heroUrl: '',
        tags: ['delivery', 'weddings', 'plants']
      }
    ];
    await fs.writeFile(businessesFile, JSON.stringify(seedBusinesses, null, 2), 'utf-8');
  }

  try {
    await fs.access(messagesFile);
  } catch {
    const seedMessages: Message[] = [];
    await fs.writeFile(messagesFile, JSON.stringify(seedMessages, null, 2), 'utf-8');
  }
}

export async function getBusinesses(): Promise<Business[]> {
  await ensureDataFilesExist();
  const content = await fs.readFile(businessesFile, 'utf-8');
  return JSON.parse(content) as Business[];
}

export async function getBusinessById(id: string): Promise<Business | undefined> {
  const businesses = await getBusinesses();
  return businesses.find((b) => b.id === id);
}

export async function saveBusiness(business: Business): Promise<Business> {
  const businesses = await getBusinesses();
  const index = businesses.findIndex((b) => b.id === business.id);
  if (index >= 0) {
    businesses[index] = business;
  } else {
    businesses.push(business);
  }
  await fs.writeFile(businessesFile, JSON.stringify(businesses, null, 2), 'utf-8');
  return business;
}

export async function searchBusinesses(query: string, category?: string): Promise<Business[]> {
  const businesses = await getBusinesses();
  const q = query.trim().toLowerCase();
  return businesses.filter((b) => {
    const inQuery = !q ||
      b.name.toLowerCase().includes(q) ||
      (b.description ?? '').toLowerCase().includes(q) ||
      (b.tags ?? []).some((t) => t.toLowerCase().includes(q)) ||
      b.category.toLowerCase().includes(q) ||
      (b.city ?? '').toLowerCase().includes(q);
    const inCategory = !category || b.category.toLowerCase() === category.toLowerCase();
    return inQuery && inCategory;
  });
}

export async function getMessages(): Promise<Message[]> {
  await ensureDataFilesExist();
  const content = await fs.readFile(messagesFile, 'utf-8');
  return JSON.parse(content) as Message[];
}

export async function addMessage(message: Message): Promise<Message> {
  const messages = await getMessages();
  messages.push(message);
  await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), 'utf-8');
  return message;
}