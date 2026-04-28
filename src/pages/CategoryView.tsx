import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { motion } from 'motion/react';
import { FileText, Download, ExternalLink, ArrowLeft, Loader2, Search, Info } from 'lucide-react';

interface Document {
  id: string;
  fileName: string;
  description: string;
  fileLink: string;
  createdAt: any;
  productId: string;
  subCategory?: string;
}

export default function CategoryView() {
  const { categoryId } = useParams();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Map URL-safe IDs back to the strings stored in Firestore
  const categoryMap: { [key: string]: string } = {
    'Savings': 'Savings',
    'PLI-RPLI': 'PLI/RPLI',
    'Domestic-Mails': 'Domestic Mails',
    'International-Mails': 'International Mails',
    'Parcels': 'Parcels',
    'BD-CCS': 'BD/CCS',
    'PO-Orders-Rules': 'PO Orders/Rules',
    'Official-Documents': 'Official Documents',
    'Others': 'Others'
  };

  const displayCategory = categoryId ? (categoryMap[categoryId] || categoryId.replace('-', '/')) : '';

  // Group documents by sub-category
  const groupedDocs = documents.reduce((acc, doc) => {
    const sub = doc.subCategory || 'General Documents';
    if (!acc[sub]) acc[sub] = [];
    acc[sub].push(doc);
    return acc;
  }, {} as { [key: string]: Document[] });

  // Filter grouped docs by search term
  const filteredGroups = Object.keys(groupedDocs).reduce((acc, sub) => {
    const matches = groupedDocs[sub].filter(doc => 
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matches.length > 0) {
      acc[sub] = matches;
    }
    return acc;
  }, {} as { [key: string]: Document[] });

  const cardThemes = [
    { bg: 'bg-[#e53e3e]', iconBg: 'bg-white', iconColor: 'text-[#e53e3e]', btnBg: 'bg-white', btnText: 'text-[#e53e3e]' }, // Red
    { bg: 'bg-[#319795]', iconBg: 'bg-white', iconColor: 'text-[#319795]', btnBg: 'bg-white', btnText: 'text-[#319795]' }, // Teal
    { bg: 'bg-[#805ad5]', iconBg: 'bg-white', iconColor: 'text-[#805ad5]', btnBg: 'bg-white', btnText: 'text-[#805ad5]' }, // Purple
    { bg: 'bg-[#3182ce]', iconBg: 'bg-white', iconColor: 'text-[#3182ce]', btnBg: 'bg-white', btnText: 'text-[#3182ce]' }, // Blue
    { bg: 'bg-[#dd6b20]', iconBg: 'bg-white', iconColor: 'text-[#dd6b20]', btnBg: 'bg-white', btnText: 'text-[#dd6b20]' }, // Orange
    { bg: 'bg-[#2c7a7b]', iconBg: 'bg-white', iconColor: 'text-[#2c7a7b]', btnBg: 'bg-white', btnText: 'text-[#2c7a7b]' }, // Dark Teal
    { bg: 'bg-[#d69e2e]', iconBg: 'bg-white', iconColor: 'text-[#d69e2e]', btnBg: 'bg-white', btnText: 'text-[#d69e2e]' }, // Yellow
    { bg: 'bg-[#c53030]', iconBg: 'bg-white', iconColor: 'text-[#c53030]', btnBg: 'bg-white', btnText: 'text-[#c53030]' }, // Dark Red
  ];

  useEffect(() => {
    async function fetchDocs() {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'documents'),
          where('productId', '==', displayCategory),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Document));
        setDocuments(docs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    }

    if (displayCategory) fetchDocs();
  }, [displayCategory]);

  const filteredDocs = documents.filter(doc => 
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-3 md:px-6 py-6 md:py-12">
      <div className="mb-6 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 border-b border-gray-100 pb-6 md:pb-8">
        <div>
          <Link to="/" className="flex items-center gap-2 text-post-red-primary hover:text-post-red-dark font-bold mb-4 md:mb-6 transition-all group uppercase text-[9px] md:text-[10px] tracking-widest">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <h2 className="text-2xl md:text-4xl font-black text-post-red-primary uppercase tracking-tighter leading-none">
            {displayCategory}
          </h2>
          <p className="text-gray-400 mt-2 md:mt-3 font-bold uppercase tracking-widest text-[8px] md:text-[10px]">Portal Archive / {displayCategory}</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input 
            type="text" 
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 md:h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-lg outline-none focus:border-post-red-primary shadow-sm transition-all font-medium text-xs md:text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-lg border border-gray-100 shadow-sm">
          <Loader2 size={40} className="animate-spin text-post-red-primary mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Synchronizing Records...</p>
        </div>
      ) : Object.keys(filteredGroups).length > 0 ? (
        <div className="space-y-12">
          {Object.entries(filteredGroups).map(([subCategory, docs]) => (
            <div key={subCategory} className="bg-white/40 rounded-xl md:rounded-2xl p-4 md:p-8 border border-gray-100 shadow-sm space-y-4 md:space-y-8">
              <div className="flex items-center gap-3 md:gap-4">
                <h3 className="text-[9px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-post-red-primary bg-post-yellow-light px-4 md:px-6 py-1.5 md:py-2 rounded-lg border border-post-yellow flex items-center gap-2 md:gap-3">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-post-red-primary animate-pulse" />
                  {subCategory}
                </h3>
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-[8px] md:text-[10px] font-black text-gray-300 uppercase tracking-widest">{docs.length} Items</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {docs.map((doc, index) => {
                  const theme = cardThemes[index % cardThemes.length];
                  return (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`${theme.bg} p-4 md:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all flex flex-col gap-4 items-start group relative overflow-hidden h-full`}
                    >
                      {/* Subtle pattern overlay */}
                      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-[-20deg] translate-x-8 group-hover:translate-x-4 transition-transform pointer-events-none" />

                      <div className="flex items-start gap-4 w-full z-10">
                        <div className={`${theme.iconBg} ${theme.iconColor} p-3 rounded-full shadow-inner flex-shrink-0`}>
                          <FileText size={20} className="md:w-6 md:h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-xs md:text-sm text-white uppercase tracking-tight mb-1 truncate">
                            {doc.fileName}
                          </h3>
                          <p className="text-[10px] md:text-xs text-white/70 font-bold uppercase tracking-tight mb-4 line-clamp-1">
                            {doc.subCategory || 'Official Record'}
                          </p>
                        </div>
                      </div>

                      <div className="w-full z-10 mb-4">
                        <p className="text-[10px] md:text-xs text-white/80 font-medium leading-relaxed line-clamp-2 h-8 md:h-10 opacity-90">
                          {doc.description || 'Official document archive entry for postal services and operational records.'}
                        </p>
                      </div>

                      <div className="mt-auto w-full flex items-center justify-between pt-4 border-t border-white/10 z-10">
                        <div className="flex flex-col">
                          <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">UPLOADED</span>
                          <span className="text-[9px] font-black text-white uppercase tracking-wider">
                            {doc.createdAt?.toDate().toLocaleDateString('en-GB') || 'LATEST'}
                          </span>
                        </div>
                        <a 
                          href={doc.fileLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`${theme.btnBg} ${theme.btnText} px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2`}
                        >
                          <Download size={12} strokeWidth={3} />
                          View
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-lg border border-gray-100 shadow-sm text-center px-10">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6 group">
            <Info size={32} />
          </div>
          <h3 className="text-xl font-black text-gray-800 uppercase tracking-tighter mb-2">No Records Found</h3>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest max-w-sm leading-loose">There are currently no active circulars or forms for this category.</p>
        </div>
      )}

      {/* Notice Section */}
      <div className="mt-10 md:mt-16 bg-post-yellow-light border border-post-yellow p-6 md:p-8 rounded-lg">
        <h4 className="font-black text-post-red-primary mb-4 md:mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px] md:text-xs">
          <Info size={14} className="md:w-4 md:h-4" />
          Portal Compliance
        </h4>
        <ul className="space-y-3 md:space-y-4 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-600 leading-relaxed">
          <li className="flex gap-4">
            <span className="text-post-red-primary">•</span>
            <span>All forms must be printed in A4 format unless specified otherwise.</span>
          </li>
          <li className="flex gap-4">
            <span className="text-post-red-primary">•</span>
            <span>Digital signatures are accepted on selected forms (marked with *).</span>
          </li>
          <li className="flex gap-4">
            <span className="text-post-red-primary">•</span>
            <span>Contact Dhenkanal RS SO for physical copies of these documents.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
