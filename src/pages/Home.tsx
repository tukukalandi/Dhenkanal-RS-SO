import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import NewsMarquee from '../components/NewsMarquee';
import { 
  PiggyBank, 
  ShieldCheck, 
  Send, 
  Globe2, 
  Package, 
  Briefcase,
  Stamp,
  Scale,
  FileSearch,
  MoreHorizontal
} from 'lucide-react';

const categories = [
  { name: 'Savings', icon: PiggyBank, color: 'bg-emerald-500', path: '/category/Savings' },
  { name: 'PLI/RPLI', icon: ShieldCheck, color: 'bg-indigo-600', path: '/category/PLI-RPLI' },
  { name: 'Domestic Mails', icon: Send, color: 'bg-orange-500', path: '/category/Domestic-Mails' },
  { name: 'International Mails', icon: Globe2, color: 'bg-blue-600', path: '/category/International-Mails' },
  { name: 'Parcels', icon: Package, color: 'bg-amber-600', path: '/category/Parcels' },
  { name: 'BD/CCS', icon: Briefcase, color: 'bg-rose-600', path: '/category/BD-CCS' },
  { name: 'Philately', icon: Stamp, color: 'bg-pink-600', path: '/category/Philately' },
  { name: 'PO Orders/Rules', icon: Scale, color: 'bg-violet-600', path: '/category/PO-Orders-Rules' },
  { name: 'Official Documents', icon: FileSearch, color: 'bg-cyan-600', path: '/category/Official-Documents' },
  { name: 'Others', icon: MoreHorizontal, color: 'bg-slate-600', path: '/category/Others' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="w-full bg-[#f8f9fa] pb-24">
      <div className="w-full">
        <HeroSlider />
      </div>

      <div className="max-w-7xl mx-auto p-3 md:p-8 space-y-6 md:space-y-8">
        <NewsMarquee />

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(cat.path)}
              className={`bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 md:p-8 hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 md:h-1.5 ${cat.color}`} />
              
              <div className={`w-12 h-12 md:w-20 md:h-20 ${cat.color.replace('bg-', 'bg-').replace('-600', '-50').replace('-500', '-50')} rounded-lg md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 group-hover:rotate-12 transition-transform shadow-inner`}>
                <cat.icon size={20} className={`${cat.color.replace('bg-', 'text-')} md:hidden`} />
                <cat.icon size={36} className={`${cat.color.replace('bg-', 'text-')} hidden md:block`} />
              </div>
              
              <h3 className="text-[10px] md:text-xl font-black text-gray-800 mb-1 md:mb-2 truncate w-full uppercase tracking-tighter">
                {cat.name}
              </h3>
              
              <p className="hidden md:block text-[11px] text-gray-500 leading-relaxed mb-6 font-bold uppercase tracking-tight opacity-70">
                {cat.name} Records & Updates
              </p>

              <div className={`mt-auto px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest ${cat.color} text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-lg hidden md:block`}>
                Explore Now
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
