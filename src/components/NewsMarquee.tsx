import React from 'react';
import { Megaphone } from 'lucide-react';

const NEWS_ITEMS = [
  'Mahila Samman Savings Certificate, 2023 is now available at all Post Offices.',
  'Sukanya Samriddhi Account: High interest rate of 8.2% per annum.',
  'Special recruitment drive for GDS in various circles - Check official notifications.',
  'Linking of Aadhaar with POST Office Savings Account is mandatory.',
  'Avail 40% discount on Speed Post for Bulk Customers.'
];

export default function NewsMarquee() {
  return (
    <div className="bg-post-yellow-light border-y border-post-yellow/30 h-10 flex items-center overflow-hidden mb-8 rounded-lg">
      <div className="bg-post-red-primary text-white h-full px-4 flex items-center gap-2 z-10 shadow-lg">
        <Megaphone size={14} className="animate-bounce" />
        <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Latest News</span>
      </div>
      
      <div className="flex-1 overflow-hidden relative group">
        <div className="flex whitespace-nowrap animate-marquee group-hover:pause-marquee py-2">
          {NEWS_ITEMS.map((item, idx) => (
            <span key={idx} className="mx-8 text-[11px] font-bold text-post-red-dark uppercase tracking-wide">
              • {item}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {NEWS_ITEMS.map((item, idx) => (
            <span key={`dup-${idx}`} className="mx-8 text-[11px] font-bold text-post-red-dark uppercase tracking-wide">
              • {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
