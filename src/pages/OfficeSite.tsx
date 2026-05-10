import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
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
  MoreHorizontal,
  Lock
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

export default function OfficeSite() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^1\d{7}$/.test(userId) && password === 'Dop@1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid User ID or Password. User ID must be an 8-digit Employee ID starting with 1.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-[#f8f9fa] min-h-[70vh] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-post-red-primary p-6 text-white text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-widest">Office Login</h2>
            <p className="text-white/80 text-xs font-medium mt-1">Authorized personnel only</p>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 font-medium text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">User ID (Employee ID)</label>
              <input 
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="e.g. 10000000"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-post-red-primary transition-all font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-post-red-primary transition-all font-medium"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-post-red-primary text-white rounded-xl py-3.5 font-bold shadow-lg hover:bg-post-red-dark transition-all text-sm uppercase tracking-widest"
            >
              Access Office Site
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">Office Site</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Access Post Office Services</p>
        </div>

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
    </div>
  );
}
