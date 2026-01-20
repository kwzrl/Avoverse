'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './sheet';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#originals', label: 'Originals' },
    { href: '#worlds', label: 'Worlds' },
    { href: '#creators', label: 'Creators' },
    { href: '#about', label: 'About' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-12 py-4',
        isScrolled
          ? 'bg-black/50 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile: Burger Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button 
              className="text-white p-2 hover:bg-white/10 rounded-md transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-[300px] sm:w-[400px] bg-black border-white/10 text-white p-0"
          >
            <div className="flex flex-col h-full">
              {/* Logo in Mobile Menu */}
              <div className="p-6 border-b border-white/10">
                <Link 
                  href="/" 
                  className="text-3xl font-serif italic tracking-tighter text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Avoverse
                </Link>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-6">
                <ul className="space-y-6">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-lg font-medium text-white/70 hover:text-white transition-colors block"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* CTA Buttons in Mobile Menu */}
              <div className="p-6 border-t border-white/10 space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full text-white hover:bg-white/10 justify-start text-base h-12"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Button>
                <Button 
                  className="w-full bg-white text-black hover:bg-neutral-200 rounded-[4px] h-12 font-medium text-base"
                  onClick={() => setIsOpen(false)}
                >
                  Join the Waitlist
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop & Mobile: Logo */}
        <Link 
          href="/" 
          className="text-2xl font-serif italic tracking-tighter text-white hover:opacity-80 transition-opacity"
        >
          Avoverse
        </Link>

        {/* Desktop: Center Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop & Mobile: Right Side Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <Button 
            variant="ghost" 
            className="text-white/90 hover:text-white hover:bg-transparent font-medium text-[15px] px-0 hidden md:inline-flex transition-colors"
          >
            Login
          </Button>
          <Button className="bg-white text-black hover:bg-neutral-200 rounded-[4px] px-4 md:px-6 h-9 md:h-10 font-medium text-[13px] md:text-[15px] transition-colors">
            <span className="hidden sm:inline">Join the Waitlist</span>
            <span className="sm:hidden">Join</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
