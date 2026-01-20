import Link from 'next/link';
import { Twitter, Instagram, Youtube, Linkedin, Disc, Music2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Background Graphic / Watermark Vibe */}
      <div className="absolute -bottom-24 -left-12 opacity-[0.03] pointer-events-none select-none">
         <span className="font-serif italic text-[15rem] leading-none whitespace-nowrap">
            Avoverse
         </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-24">
          
          {/* Left Column: Brand & Copyright */}
          <div className="flex flex-col max-w-xs">
            <div className="mb-8">
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
            <div className="flex items-center gap-5 text-neutral-500">
               <Link href="#" className="hover:text-white transition-colors"><Twitter size={18} /></Link>
               <Link href="#" className="hover:text-white transition-colors"><Instagram size={18} /></Link>
               <Link href="#" className="hover:text-white transition-colors"><Youtube size={18} /></Link>
               <Link href="#" className="hover:text-white transition-colors"><Music2 size={18} /></Link> {/* TikTok placeholder */}
               <Link href="#" className="hover:text-white transition-colors"><Linkedin size={18} /></Link>
               <Link href="#" className="hover:text-white transition-colors"><Disc size={18} /></Link> {/* Discord placeholder */}
            </div>
          </div>

          {/* Right Columns: Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 lg:gap-24">
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-medium text-sm">Company</h3>
              <ul className="flex flex-col gap-3 text-sm text-neutral-500">
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Manifesto</Link></li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-medium text-sm">Product</h3>
              <ul className="flex flex-col gap-3 text-sm text-neutral-500">
                <li><Link href="#" className="hover:text-white transition-colors">Updates</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Teams</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Capabilities</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Affiliates</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-white font-medium text-sm">Resources</h3>
              <ul className="flex flex-col gap-3 text-sm text-neutral-500">
                <li><Link href="#" className="hover:text-white transition-colors">Articles</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Docs</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Legal</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Brand</Link></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
