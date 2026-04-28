import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Admin from './pages/Admin';
import CategoryView from './pages/CategoryView';
import { AuthProvider } from './contexts/AuthContext';
import { Phone, Mail, Clock, MapPin, MessageSquare } from 'lucide-react';

function Helpdesk() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">Helpdesk & Support</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">We are here to help you with any postal or financial queries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight mb-6 flex items-center gap-3">
                <MessageSquare className="text-post-red-primary" />
                Raise a Query
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Full Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 outline-none focus:border-post-red-primary transition-all font-medium" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Email Address</label>
                    <input type="email" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 outline-none focus:border-post-red-primary transition-all font-medium" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Service Type</label>
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 outline-none focus:border-post-red-primary transition-all font-medium appearance-none">
                    <option>Consignment Tracking</option>
                    <option>Savings Bank Account</option>
                    <option>PLI / RPLI Query</option>
                    <option>Other Services</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Your Message</label>
                  <textarea rows={4} className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 outline-none focus:border-post-red-primary transition-all font-medium" placeholder="How can we help you?"></textarea>
                </div>
                <button className="bg-post-red-primary text-white w-full py-4 rounded-lg font-black uppercase tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-[0.98] transition-all">
                  Submit Inquiry
                </button>
              </form>
            </div>

            <div className="bg-post-yellow-light rounded-2xl p-8 border border-post-yellow flex items-start gap-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-post-red-primary shrink-0 shadow-sm">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-2">Operational Hours</h3>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  Monday - Friday: 09:00 AM to 04:00 PM<br/>
                  Saturday: 09:00 AM to 01:00 PM<br/>
                  Sunday & Gazetted Holidays: CLOSED
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-8 border-b border-gray-50 pb-4">Direct Contact</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Customer Care</p>
                    <p className="text-sm font-bold text-gray-800">1800 266 6868</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Support</p>
                    <p className="text-sm font-bold text-gray-800">helper@indiapost.gov.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-post-yellow-light text-post-red-primary rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Office Location</p>
                    <p className="text-sm font-bold text-gray-800 leading-tight">
                      Dhenkanal RS SO,<br/> Odisha - 759013
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-post-red-primary rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-post-yellow">Important Note</h3>
              <p className="text-xs font-bold leading-loose opacity-80 uppercase tracking-tighter">
                For consignment related complaints, please keep your 13-digit consignment number ready for faster resolution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#f8f9fa] selection:bg-post-yellow selection:text-post-red-primary">
          <Header />
          <div className="flex-grow pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/helpdesk" element={<Helpdesk />} />
              <Route path="/category/:categoryId" element={<CategoryView />} />
            </Routes>
          </div>
          <BottomNav />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
