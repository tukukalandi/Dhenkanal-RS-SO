import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#3b0909] text-white pt-16 pb-8 border-t-[6px] border-post-yellow">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-6">
             <img 
              src="https://upload.wikimedia.org/wikipedia/en/3/32/India_Post.svg" 
              alt="India Post" 
              className="h-14 w-auto brightness-0 invert drop-shadow-md"
            />
            <h2 className="text-2xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-sm">
              India Post<br/>
              <span className="text-xs font-bold tracking-[0.2em] opacity-80 text-post-yellow">Dhenkanal RS</span>
            </h2>
          </div>
          <p className="text-sm text-white/70 font-medium leading-relaxed mb-8 pr-4">
            Providing reliable and accessible postal and financial services to every citizen, bridging the digital divide across the nation.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-post-yellow hover:text-[#3b0909] hover:border-post-yellow hover:scale-110 transition-all shadow-sm">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-post-yellow hover:text-[#3b0909] hover:border-post-yellow hover:scale-110 transition-all shadow-sm">
              <Twitter size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-post-yellow hover:text-[#3b0909] hover:border-post-yellow hover:scale-110 transition-all shadow-sm">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-post-yellow hover:text-[#3b0909] hover:border-post-yellow hover:scale-110 transition-all shadow-sm">
              <Youtube size={16} />
            </a>
          </div>
        </div>

        <div className="lg:pl-8">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-post-yellow border-b border-post-yellow/20 pb-4 inline-block shadow-sm">Quick Links</h3>
          <ul className="space-y-3.5 text-xs font-bold tracking-wider text-white/70">
            <li><a href="https://www.indiapost.gov.in/calculate-postage" target="_blank" rel="noopener noreferrer" className="hover:text-post-yellow hover:translate-x-1 inline-flex items-center gap-2 transition-all group">Calculate Postage <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
            <li><a href="#" className="hover:text-post-yellow hover:translate-x-1 inline-flex items-center gap-2 transition-all group">Locate Post Office <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
            <li><a href="https://ebanking.indiapost.gov.in/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&__FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=DOP" target="_blank" rel="noopener noreferrer" className="hover:text-post-yellow hover:translate-x-1 inline-flex items-center gap-2 transition-all group">India Post Internet Banking <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
            <li><a href="https://ippbonline.bank.in/en/web/ippb" target="_blank" rel="noopener noreferrer" className="hover:text-post-yellow hover:translate-x-1 inline-flex items-center gap-2 transition-all group">IPPB <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
            <li><a href="https://www.indiapost.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-post-yellow hover:translate-x-1 inline-flex items-center gap-2 transition-all group">Track Your Consignment <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-post-yellow border-b border-post-yellow/20 pb-4 inline-block shadow-sm">Support & Help</h3>
          <ul className="space-y-3.5 text-xs font-bold tracking-wider text-white/70">
            <li><a href="https://postal-forms.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-post-yellow hover:translate-x-1 inline-flex items-center gap-2 transition-all group">Forms & Downloads <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
            <li><a href="https://app.indiapost.gov.in/customer-selfservice/login" target="_blank" rel="noopener noreferrer" className="hover:text-post-yellow hover:translate-x-1 inline-flex items-center gap-2 transition-all group">Customer Login <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
            <li><a href="https://office-directory.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-post-yellow hover:translate-x-1 inline-flex items-center gap-2 transition-all group">Office Directory <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
            <li><a href="https://dac.indiapost.gov.in/mydigipin/home" target="_blank" rel="noopener noreferrer" className="hover:text-post-yellow hover:translate-x-1 inline-flex items-center gap-2 transition-all group">Find Your Digipin' <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-post-yellow border-b border-post-yellow/20 pb-4 inline-block shadow-sm">Support Us</h3>
          <ul className="space-y-5 bg-black/10 p-5 rounded-xl border border-white/5">
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-post-yellow/10 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-post-yellow" />
              </div>
              <p className="text-xs font-medium text-white/80 leading-relaxed mt-0.5">
                Dhenkanal Railway Station SO,<br/>
                Dhenkanal, Odisha - 759013
              </p>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-post-yellow/10 flex items-center justify-center shrink-0">
                <Phone size={16} className="text-post-yellow" />
              </div>
              <p className="text-xs font-bold tracking-wider text-white/80">1800 266 6868</p>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-post-yellow/10 flex items-center justify-center shrink-0">
                <Mail size={16} className="text-post-yellow" />
              </div>
              <a href="mailto:dhenkanalrsso@indiapost.gov.in" className="text-xs font-medium text-white/80 hover:text-post-yellow transition-colors underline-offset-4 hover:underline break-all">
                dhenkanalrsso@indiapost.gov.in
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-white/70">© 2024 Department of Posts, Government of India. All rights reserved.</p>
            <p className="text-post-yellow/80 bg-post-yellow/10 px-3 py-1.5 rounded-md mt-1 inline-block border border-post-yellow/20">
              Prepared by Kalandi Charan Sahoo, Postal Assistant
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <a href="#" className="hover:text-post-yellow transition-colors">Sitemap</a>
            <a href="#" className="hover:text-post-yellow transition-colors">Terms of Use</a>
            <span>Last Updated: 28 April 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
