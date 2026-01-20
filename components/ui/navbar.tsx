'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12 py-4',
        isScrolled
          ? 'bg-black/50 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif italic tracking-tighter text-white hover:opacity-80 transition-opacity">
          Avoverse
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Originals
          </Link>
          <Link href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Worlds
          </Link>
          <Link href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Creators
          </Link>
          <Link href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-transparent font-medium text-[15px] px-0 hidden md:inline-flex transition-colors">
            Login
          </Button>
          <Button className="bg-white text-black hover:bg-neutral-200 rounded-[4px] px-6 h-10 font-medium text-[15px] transition-colors">
            Join the Waitlist
          </Button>
        </div>
      </div>
    </nav>
  );
}
