import React from 'react';
import { 
  Search, 
  AlertCircle, 
  MapPin, 
  Landmark, 
  HandHeart, 
  Calculator, 
  Fingerprint, 
  Hash, 
  FileDown, 
  Briefcase, 
  Smartphone, 
  ArrowRightLeft 
} from 'lucide-react';

const services = [
  { name: 'Track Consignment', icon: Search, color: 'text-emerald-600', link: 'https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx' },
  { name: 'File Complaint', icon: AlertCircle, color: 'text-red-500', link: 'https://www.indiapost.gov.in/VAS/Pages/ComplaintRegistration.aspx' },
  { name: 'Locate Post Office', icon: MapPin, color: 'text-red-600', link: 'https://www.indiapost.gov.in/vas/pages/locatemypostoffice.aspx' },
  { name: 'Banking & Savings', icon: Landmark, color: 'text-red-600', link: 'https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx' },
  { name: 'PLI / RPLI', icon: HandHeart, color: 'text-red-600', link: 'https://pli.indiapost.gov.in/' },
  { name: 'Postage Calculator', icon: Calculator, color: 'text-orange-500', link: 'https://www.indiapost.gov.in/VAS/Pages/CalculatePostage.aspx' },
  { name: 'Aadhaar Services', icon: Fingerprint, color: 'text-gray-700', link: 'https://www.indiapost.gov.in/vas/pages/aadhaar.aspx' },
  { name: 'DIGIPIN', icon: Hash, color: 'text-red-600', link: 'https://www.indiapost.gov.in/vas/Pages/Digipin.aspx' },
  { name: 'Download Forms', icon: FileDown, color: 'text-slate-600', link: 'https://www.indiapost.gov.in/VAS/Pages/Form.aspx' },
  { name: 'Vacancies', icon: Briefcase, color: 'text-amber-800', link: 'https://www.indiapost.gov.in/VAS/Pages/Content/Recruitments.aspx' },
  { name: 'IPPB Service', icon: Smartphone, color: 'text-blue-800', link: 'https://www.ippbonline.com/' },
  { name: 'Money Transfer', icon: ArrowRightLeft, color: 'text-blue-600', link: 'https://www.indiapost.gov.in/Financial/Pages/Content/Money-Remittance-Services.aspx' },
];

export default function OurServices() {
  return (
    <div className="w-full bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="bg-[#f08c3a] text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-widest text-[#5c2d0c]">
            OUR SERVICES
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#801818] mb-2 font-serif">
            What would you like to do today?
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Access all postal services of Dhenkanal Division
          </p>
          <div className="w-12 h-0.5 bg-[#e87c24] mt-5"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
          {services.map((service) => (
            <a 
              key={service.name}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#fafafa] flex flex-col items-center justify-center w-[140px] h-[120px] rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer text-center group"
            >
              <service.icon size={26} className={`${service.color} mb-3 group-hover:scale-110 transition-transform`} />
              <span className="text-[12px] font-semibold text-[#5c1c1c] leading-tight px-2">
                {service.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
