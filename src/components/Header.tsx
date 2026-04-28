import React, { useState, useEffect } from 'react';
import { Menu, Globe, ChevronDown, Clock, Search, X, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { login } = useAuth();
  const [date, setDate] = useState(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOthersOpen, setIsOthersOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })), 60000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Helpdesk', path: '/helpdesk' },
    { name: 'Admin Portal', path: '/admin' },
  ];

  return (
    <header className="w-full shadow-md z-50">
      {/* Bar 1: Language & Date */}
      <div className="bg-post-red-dark text-white py-1.5 md:py-2 px-4 md:px-6 text-[10px] md:text-xs flex justify-between items-center">
        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="flex items-center gap-1 cursor-pointer hover:text-post-yellow transition-colors">
            <Globe size={14} />
            <span className="font-medium">Language / भाषा</span>
          </div>
          <span className="opacity-40">|</span>
          <div className="hidden sm:flex items-center gap-1">
            <Clock size={14} />
            <span>Date: {date}</span>
          </div>
        </div>
        <div className="hidden md:flex gap-4 font-medium">
          <a href="#" className="hover:underline opacity-80 hover:opacity-100">Sitemap</a>
          <a href="#" className="hover:underline opacity-80 hover:opacity-100">Screen Reader Access</a>
        </div>
      </div>

      {/* Bar 2: Branding (Emblem, Name, India Post Logo) */}
      <div className="h-16 md:h-24 bg-white border-b border-gray-100 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
            alt="National Emblem" 
            className="h-8 md:h-14 w-auto"
          />
          <div className="flex flex-col">
            <h1 className="text-sm md:text-3xl font-black text-post-red-primary tracking-tighter leading-none uppercase">
              Dhenkanal RS SO
            </h1>
            <span className="text-[8px] md:text-[10px] text-gray-400 font-bold tracking-widest md:tracking-[0.15em] mt-0.5 md:mt-1 uppercase">
              Dhenkanal Postal Division | Odisha
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-8">
          <div className="hidden lg:flex items-center gap-3 border border-gray-200 rounded-full px-4 py-2 bg-gray-50 focus-within:border-post-red-primary transition-all">
            <Search size={16} className="text-gray-400" />
            <input type="text" placeholder="Search services..." className="outline-none text-xs w-40 bg-transparent font-medium" />
          </div>
          
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/3/32/India_Post.svg" 
            alt="India Post Logo" 
            className="h-8 md:h-16 w-auto"
          />

          <Link to="/admin" className="md:hidden p-2 bg-post-yellow text-post-red-primary rounded-lg active:scale-95 transition-all">
            <UserCircle size={20} />
          </Link>
          
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 md:p-3 bg-gray-50 hover:bg-post-yellow-light rounded-lg md:rounded-xl flex items-center justify-center transition-all group border border-gray-100 md:border-transparent active:scale-95"
          >
            <Menu size={20} className="text-post-red-primary" />
            <span className="text-[10px] font-black uppercase ml-2 text-gray-700 hidden md:block tracking-widest">Menu</span>
          </button>
        </div>
      </div>

      {/* Bar 3: Navigation - Scrollable on mobile */}
      <nav className="flex h-10 md:h-12 bg-post-red-primary text-white items-center px-2 md:px-6 relative z-40 shadow-lg overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex items-stretch h-full min-w-max">
          {menuItems.slice(0, 2).map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className="flex items-center px-4 md:px-6 text-white font-bold text-[10px] md:text-xs hover:bg-post-red-dark border-b-2 md:border-b-4 border-transparent hover:border-post-yellow transition-all uppercase tracking-wider whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
          
          <div className="relative group flex items-center">
            <button 
              onClick={() => setIsOthersOpen(!isOthersOpen)}
              className={`flex items-center px-4 md:px-6 h-full text-white font-bold text-[10px] md:text-xs transition-all uppercase tracking-wider gap-2 whitespace-nowrap ${isOthersOpen ? 'bg-post-red-dark' : 'hover:bg-post-red-dark'}`}
            >
              Others
              <ChevronDown size={12} className={isOthersOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
            
            <AnimatePresence>
              {isOthersOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-b-md border border-gray-100 z-50 overflow-hidden"
                >
                  {[
                    { name: 'India Post Website', url: 'https://www.indiapost.gov.in/' },
                    { name: 'Dhenkanal Postal Division', url: 'https://dhenkanalpostaldivision.org/' },
                    { name: 'Office Directory', url: 'https://office-directory.vercel.app/' },
                    { name: 'Contact Us', url: '#contact' },
                    { name: 'About Us', url: '#about' },
                  ].map((link) => (
                    <a 
                      key={link.name} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block px-4 py-3 text-[11px] font-bold text-gray-700 hover:bg-post-yellow-light border-b border-gray-50 last:border-0 transition-colors uppercase tracking-wide"
                      onClick={() => setIsOthersOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden md:flex ml-auto">
          <Link to="/admin" className="bg-post-yellow text-post-red-primary px-5 py-2 rounded-md font-black text-[10px] shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all">
            <div className="w-2 h-2 rounded-full bg-post-red-primary animate-pulse"></div>
            ADMIN PORTAL
          </Link>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-white z-[70] shadow-2xl overflow-y-auto"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-post-red-primary text-white">
                <h2 className="text-xl font-black uppercase tracking-tighter">Portal Navigation</h2>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-[10px] font-black text-post-red-primary uppercase tracking-[0.2em] mb-4 px-4">Navigation</h3>
                  {menuItems.map((item) => (
                    <Link 
                      key={item.path} 
                      to={item.path} 
                      className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-post-yellow-light text-gray-800 font-bold border-b border-gray-50 last:border-0 transition-all group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-[11px] uppercase tracking-wide group-hover:text-post-red-primary">{item.name}</span>
                      <ChevronDown size={14} className="-rotate-90 text-gray-300 group-hover:text-post-red-primary" />
                    </Link>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-[10px] font-black text-post-red-primary uppercase tracking-[0.2em] mb-4 px-4">Important Links</h3>
                  {[
                    { name: 'India Post Website', url: 'https://www.indiapost.gov.in/' },
                    { name: 'Dhenkanal Postal Division', url: 'https://dhenkanalpostaldivision.org/' },
                    { name: 'Office Directory', url: 'https://office-directory.vercel.app/' },
                  ].map((link) => (
                    <a 
                      key={link.name} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-post-yellow-light text-gray-800 font-bold border-b border-gray-50 last:border-0 transition-all group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-[11px] uppercase tracking-wide group-hover:text-post-red-primary">{link.name}</span>
                      <Globe size={14} className="text-gray-300" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-12 p-8 text-center border-t border-gray-50">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/3/32/India_Post.svg" 
                  alt="India Post" 
                  className="h-10 mx-auto mb-4 opacity-30"
                />
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
                  Official Website of Dhenkanal RS SO<br/>
                  Odisha Circle
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
