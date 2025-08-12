import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export const metadata: Metadata = {
  title: 'Business Hub',
  description: 'Connect local businesses with customers and competitors',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white/80 backdrop-blur">
          <div className="container-responsive flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3">
              <Logo className="h-10 w-10" />
              <span className="text-xl font-bold gradient-text">Business Hub</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/businesses" className="hover:text-brand-600">Businesses</Link>
              <Link href="/b2b" className="hover:text-brand-600">B2B</Link>
              <Link href="/messages" className="hover:text-brand-600">Messages</Link>
              <Link href="/owner" className="hover:text-brand-600">Owner</Link>
            </nav>
          </div>
        </header>
        <main className="min-h-[calc(100dvh-160px)]">{children}</main>
        <footer className="border-t bg-white/60">
          <div className="container-responsive py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} Business Hub. Built for local connections.
          </div>
        </footer>
      </body>
    </html>
  );
}