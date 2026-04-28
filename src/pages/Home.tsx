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
  Scale,
  FileSearch,
  MoreHorizontal,
  UserCheck,
  Download,
  Users,
  FileText,
  AlertCircle,
  MapPin,
  Search,
  Calculator
} from 'lucide-react';

const categories = [
  { name: 'POSB Savings', icon: PiggyBank, color: 'bg-emerald-600', path: '/category/Savings' },
  { name: 'PLI / RPLI', icon: ShieldCheck, color: 'bg-indigo-700', path: '/category/PLI-RPLI' },
  { name: 'Speed Post', icon: Send, color: 'bg-orange-600', path: '/category/Domestic-Mails' },
  { name: 'Business Post', icon: Briefcase, color: 'bg-rose-700', path: '/category/BD-CCS' },
  { name: 'Parcels (NPS)', icon: Package, color: 'bg-amber-600', path: '/category/Parcels' },
  { name: 'Pincode Search', icon: MapPin, color: 'bg-sky-600', path: '/category/Others' },
];

const bottomCards = [
  { name: 'Pensioners Corner', icon: UserCheck, color: 'bg-teal-600', desc: 'Benefits and updates for retired employees.' },
  { name: 'Forms & Downloads', icon: Download, color: 'bg-fuchsia-600', desc: 'Download official account opening and claim forms.' },
  { name: 'RTI Information', icon: FileText, color: 'bg-blue-600', desc: 'Mandatory disclosures and RTI application process.' },
  { name: 'Staff Corner', icon: Users, color: 'bg-violet-600', desc: 'Internal portal and notices for divisional staff.' },
  { name: 'Grievance Portal', icon: AlertCircle, color: 'bg-red-600', desc: 'Register and track your service complaints online.' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="w-full bg-[#f8f9fa]">
      <div className="w-full">
        <HeroSlider />
      </div>
      
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12 pb-24">
        <NewsMarquee />

        {/* Quick Utility Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 bg-gradient-to-br from-post-red-primary to-post-red-dark rounded-xl p-6 text-white shadow-lg overflow-hidden relative group transition-all hover:shadow-post-red-primary/20">
            <h2 className="text-xl font-black uppercase tracking-tighter mb-4 flex items-center gap-2">
              <Package size={20} className="text-post-yellow" />
              Track Consignment
            </h2>
            <div className="flex gap-2 relative z-10">
              <input 
                type="text" 
                placeholder="EK123456789IN" 
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:bg-white/20 transition-all text-sm font-bold uppercase tracking-widest placeholder:text-white/40"
              />
              <button className="bg-post-yellow text-post-red-primary px-6 py-3 rounded-lg font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-md">
                Search
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
              <Send size={100} />
            </div>
          </div>
          <button className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-3 group">
            <Calculator className="text-post-red-primary group-hover:scale-110 transition-transform" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">Calculate Postage</span>
          </button>
          <button className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-3 group">
            <Search className="text-post-red-primary group-hover:scale-110 transition-transform" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">Locate Post Office</span>
          </button>
        </div>

        {/* Primary Services Grid */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-sm font-black text-gray-800 uppercase tracking-[0.3em] flex items-center gap-3">
              <div className="w-1.5 h-6 bg-post-red-primary rounded-full"></div>
              Popular Services
            </h2>
            <div className="h-px bg-gray-100 flex-1"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(cat.path)}
                className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-8 hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden`}
              >
                <div className={`absolute top-0 left-0 w-full h-1.5 ${cat.color}`} />
                
                <div className={`w-12 h-12 md:w-20 md:h-20 ${cat.color} text-white md:bg-transparent md:${cat.color.replace('bg-', 'bg-').replace('-600', '-50').replace('-700', '-50')} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:rotate-12 transition-transform shadow-inner`}>
                  <cat.icon size={24} className="md:w-9 md:h-9 md:text-current" />
                </div>
                
                <h3 className="text-xs md:text-xl font-black text-gray-800 mb-1 md:mb-2 truncate w-full uppercase tracking-tighter">
                  {cat.name}
                </h3>
                
                <p className="hidden md:block text-[11px] text-gray-500 leading-relaxed mb-6 font-bold uppercase tracking-tight opacity-70">
                  Reliable {cat.name} Services
                </p>

                <div className={`mt-auto px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${cat.color} text-white hidden md:block opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-lg`}>
                  Access Details
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divisional Portal Cards */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-post-yellow/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">Divisional Portal</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Digital Resources for Dhenkanal Residents</p>
            </div>
            <div className="flex gap-2 md:gap-4">
              <div className="text-center px-4 md:px-6 py-3 bg-gray-50 rounded-xl border border-gray-100 min-w-[100px]">
                <p className="text-[9px] font-black text-post-red-primary uppercase tracking-widest mb-1">Post Offices</p>
                <p className="text-lg font-black text-gray-800">452+</p>
              </div>
              <div className="text-center px-4 md:px-6 py-3 bg-gray-50 rounded-xl border border-gray-100 min-w-[100px]">
                <p className="text-[9px] font-black text-post-red-primary uppercase tracking-widest mb-1">Employees</p>
                <p className="text-lg font-black text-gray-800">1200+</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 relative z-10">
            {bottomCards.map((card, index) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center group cursor-pointer bg-gray-50/50 p-4 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all border border-transparent hover:border-gray-100"
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 ${card.color} text-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 shadow-lg transition-all`}>
                  <card.icon size={24} className="md:w-7 md:h-7" />
                </div>
                <h4 className="text-[10px] md:text-[11px] font-black text-gray-800 uppercase tracking-tight mb-2 group-hover:text-post-red-primary transition-colors leading-tight h-8 flex items-center justify-center">
                  {card.name}
                </h4>
                <p className="hidden lg:block text-[9px] text-gray-400 font-bold leading-tight opacity-0 group-hover:opacity-100 transition-opacity">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Info Bar / Marquee */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="h-12 bg-white border border-gray-200 flex items-center justify-between px-6 rounded-lg shadow-sm overflow-hidden">
          <div className="flex items-center gap-6 overflow-hidden w-full">
            <span className="text-[10px] text-post-red-primary font-black uppercase tracking-[0.2em] whitespace-nowrap bg-white pr-4 z-10">Recent Circulars:</span>
            <div className="flex animate-marquee whitespace-nowrap text-xs text-gray-600 font-bold uppercase tracking-tight">
              <span className="mr-8">• Important notice regarding POSB interest rates for Q2 FY2024-25</span>
              <span className="mr-8">• New Speed Post tracking enhancements launched</span>
              <span className="mr-8">• Digital PLI premium payment now available</span>
              <span className="mr-8">• Tracking of international parcels improved</span>
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
      </div>
    </main>
  );
}
