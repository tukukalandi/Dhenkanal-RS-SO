import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-post-red-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-6">
             <img 
              src="https://upload.wikimedia.org/wikipedia/en/3/32/India_Post.svg" 
              alt="India Post" 
              className="h-12 w-auto brightness-0 invert"
            />
            <h2 className="text-xl font-black uppercase tracking-tighter leading-none">
              India Post<br/>
              <span className="text-xs font-bold tracking-widest opacity-60">Dhenkanal RS</span>
            </h2>
          </div>
          <p className="text-sm text-white/60 font-medium leading-relaxed mb-6">
            Providing reliable and accessible postal and financial services to every citizen, bridging the digital divide across the nation.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-post-yellow hover:text-post-red-primary transition-all">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-post-yellow hover:text-post-red-primary transition-all">
              <Twitter size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-post-yellow hover:text-post-red-primary transition-all">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-post-yellow hover:text-post-red-primary transition-all">
              <Youtube size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-post-yellow">Quick Links</h3>
          <ul className="space-y-4 text-sm font-bold uppercase tracking-wide text-white/70">
            <li><a href="#" className="hover:text-white transition-colors">Find Pincode</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Calculate Postage</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Locate Post Office</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Trace Complaint</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Post Office Savings</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-post-yellow">Support & Help</h3>
          <ul className="space-y-4 text-sm font-bold uppercase tracking-wide text-white/70">
            <li><a href="#" className="hover:text-white transition-colors">Help Desk</a></li>
            <li><a href="#" className="hover:text-white transition-colors">RTI Dashboard</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Forms & Downloads</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Customer Care</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-post-yellow">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-post-yellow shrink-0 mt-1" />
              <p className="text-sm font-medium text-white/70 leading-relaxed">
                Dhenkanal Railway Station SO,<br/>
                Dhenkanal, Odisha - 759013
              </p>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-post-yellow shrink-0" />
              <p className="text-sm font-medium text-white/70">Toll Free: 1800 266 6868</p>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-post-yellow shrink-0" />
              <p className="text-sm font-medium text-white/70">contact@indiapost.gov.in</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
        <p>© 2024 Department of Posts, Government of India. All rights reserved.</p>
        <div className="flex gap-6">
          <span>Sitemap</span>
          <span>Terms of Use</span>
          <span>Last Updated: 28 April 2024</span>
        </div>
      </div>
    </footer>
  );
}
