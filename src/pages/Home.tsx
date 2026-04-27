import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  PiggyBank, 
  ShieldCheck, 
  Send, 
  Globe2, 
  Package, 
  Briefcase 
} from 'lucide-react';

const categories = [
  { name: 'Savings', icon: PiggyBank, color: 'bg-emerald-500', path: '/category/Savings' },
  { name: 'PLI/RPLI', icon: ShieldCheck, color: 'bg-blue-500', path: '/category/PLI-RPLI' },
  { name: 'Domestic Mails', icon: Send, color: 'bg-orange-500', path: '/category/Domestic Mails' },
  { name: 'International Mails', icon: Globe2, color: 'bg-indigo-500', path: '/category/International Mails' },
  { name: 'Parcels', icon: Package, color: 'bg-amber-500', path: '/category/Parcels' },
  { name: 'BD/CCS', icon: Briefcase, color: 'bg-rose-500', path: '/category/BD-CCS' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(cat.path)}
            className="bg-white rounded-lg shadow-sm border-t-4 border-post-red-primary p-8 hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-post-yellow-light rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <cat.icon size={32} className="text-post-red-primary" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2 truncate w-full uppercase tracking-tighter">
              {cat.name}
            </h3>
            
            <p className="text-xs text-gray-500 leading-relaxed mb-4 h-8 font-medium">
              View documents, circulars, and updates related to {cat.name} services.
            </p>
          </motion.div>
        ))}
      </div>
      
      {/* Info Bar / Marquee */}
      <div className="mt-12 h-12 bg-white border border-gray-200 flex items-center justify-between px-6 rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center gap-6 overflow-hidden w-full">
          <span className="text-[10px] text-post-red-primary font-black uppercase tracking-[0.2em] whitespace-nowrap bg-white pr-4 z-10">Recent Circulars:</span>
          <div className="flex animate-marquee whitespace-nowrap text-xs text-gray-600 font-bold uppercase tracking-tight">
            <span className="mr-8">• Important notice regarding POSB interest rates for Q2 FY2024-25</span>
            <span className="mr-8">• New Speed Post tracking enhancements launched</span>
            <span className="mr-8">• Digital PLI premium payment now available</span>
            <span className="mr-8">• Tracking of international parcels improved</span>
            {/* Duplicated for smooth loop */}
            <span className="mr-8">• Important notice regarding POSB interest rates for Q2 FY2024-25</span>
            <span className="mr-8">• New Speed Post tracking enhancements launched</span>
            <span className="mr-8">• Digital PLI premium payment now available</span>
            <span className="mr-8">• Tracking of international parcels improved</span>
          </div>
        </div>
        <div className="hidden lg:flex text-[10px] text-gray-400 items-center gap-2 font-bold uppercase tracking-widest pl-4 bg-white z-10">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Operational
        </div>
      </div>
    </main>
  );
}
