import React from 'react';
import clsx from 'classnames';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={clsx(className)}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Business Hub logo"
    >
      <defs>
        <linearGradient id="bhGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#bhGradient)" opacity="0.12" />
      <path
        d="M16 16h12c5.523 0 10 4.477 10 10 0 3.534-1.83 6.642-4.6 8.43C38.24 35.718 42 40.33 42 46H36c0-4.418-3.582-8-8-8H22v8h-6V16zm6 6v10h6c2.761 0 5-2.239 5-5s-2.239-5-5-5h-6zM46 16h6v30h-6V16z"
        fill="url(#bhGradient)"
      />
    </svg>
  );
}