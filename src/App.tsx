import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Admin from './pages/Admin';
import CategoryView from './pages/CategoryView';
import { AuthProvider } from './contexts/AuthContext';

function Footer() {
  return (
    <footer className="bg-post-red-primary text-white py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/3/32/India_Post.svg" 
              alt="India Post" 
              className="h-10 brightness-200 invert"
            />
            <span className="text-xl font-bold border-l border-white/20 pl-3 uppercase tracking-tighter">Dhenkanal RS SO</span>
          </div>
          <p className="text-white/70 text-xs leading-loose max-w-sm font-bold uppercase tracking-widest">
            Serving the Dhenkanal Railway Station locality with speed, safety, and reliability. 
            Official digital portal for accessibility and transparency.
          </p>
        </div>
        
        <div>
          <h4 className="font-black text-post-yellow mb-6 uppercase tracking-[0.2em] text-xs">Useful Links</h4>
          <ul className="space-y-4 text-[11px] font-bold uppercase tracking-wider text-white/80">
            <li><a href="https://www.indiapost.gov.in" className="hover:text-post-yellow transition-colors">India Post Home</a></li>
            <li><a href="https://www.cept.gov.in" className="hover:text-post-yellow transition-colors">CEPT Portal</a></li>
            <li><a href="#" className="hover:text-post-yellow transition-colors">Tracking Service</a></li>
            <li><a href="#" className="hover:text-post-yellow transition-colors">Pin Code Search</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-post-yellow mb-6 uppercase tracking-[0.2em] text-xs">Official Portal</h4>
          <ul className="space-y-4 text-[11px] font-bold uppercase tracking-wider text-white/80">
            <li>Facebook</li>
            <li>Twitter (X)</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
        <p>© 2024 Dhenkanal RS SO. Department of Posts.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Webmaster</a>
        </div>
      </div>
    </footer>
  );
}

function Helpdesk() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl font-bold text-indiapost-blue mb-4">Helpdesk Terminal</h2>
      <p className="text-gray-500 mb-8">Direct communication portal for Dhenkanal RS SO.</p>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-lg mx-auto">
        <p className="text-indiapost-red font-bold text-lg mb-2">Service Status: ONLINE</p>
        <p className="text-sm text-gray-400">Our team at Dhenkanal RS Sub-Post Office is ready to assist you during business hours.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/helpdesk" element={<Helpdesk />} />
              <Route path="/category/:categoryId" element={<CategoryView />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
