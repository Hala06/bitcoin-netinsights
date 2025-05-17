'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import the 3D model component dynamically to avoid SSR
const BitcoinModel = dynamic(() => import('@/components/BitcoinModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

export default function Bitcoin3D() {
  return (
    <Suspense fallback={
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <BitcoinModel />
    </Suspense>
  );
}
