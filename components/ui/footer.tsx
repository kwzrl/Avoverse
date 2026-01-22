import Link from 'next/link';
import { Twitter, Instagram, Youtube, Linkedin, Disc, Music2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 md:pt-24 pb-8 md:pb-12 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-12 lg:gap-24">
          
          {/* Left Column: Brand & Copyright */}
          <div className="flex flex-col max-w-xs">
            <div className="mb-6 md:mb-8">
               {/* Abstract Logo Placeholder matching the vibe */}
               <div className="h-8 w-8 grid grid-cols-2 gap-1 mb-6 opacity-80">
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white/50 rounded-full"></div>
                  <div className="bg-white/50 rounded-full"></div>
                  <div className="bg-white rounded-sm"></div>
               </div>
               
               <div className="text-sm text-neutral-500 leading-relaxed font-medium">
                 <p>Copyright © {new Date().getFullYear()}</p>
                 <p>All rights reserved.</p>
               </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 md:gap-5 text-neutral-500">
               <Link href="#" className="hover:text-white transition-colors" aria-label="X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
               </Link>
            </div>
          </div>

          {/* Right Columns: Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 lg:gap-24">
            <div className="flex flex-col gap-3 md:gap-4">
              <h3 className="text-white font-medium text-sm">Company</h3>
              <ul className="flex flex-col gap-2 md:gap-3 text-sm text-neutral-500">
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Manifesto</Link></li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-3 md:gap-4">
              <h3 className="text-white font-medium text-sm">Product</h3>
              <ul className="flex flex-col gap-2 md:gap-3 text-sm text-neutral-500">
                <li><Link href="#" className="hover:text-white transition-colors">Updates</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Teams</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Capabilities</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Affiliates</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              <h3 className="text-white font-medium text-sm">Resources</h3>
              <ul className="flex flex-col gap-2 md:gap-3 text-sm text-neutral-500">
                <li><Link href="#" className="hover:text-white transition-colors">Articles</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Docs</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Brand</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              <h3 className="text-white font-medium text-sm">Legal</h3>
              <ul className="flex flex-col gap-2 md:gap-3 text-sm text-neutral-500">
                <li><Link href="#" className="hover:text-white transition-colors">Imprint</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
