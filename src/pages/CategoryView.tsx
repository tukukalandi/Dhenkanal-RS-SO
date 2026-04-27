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
}

export default function CategoryView() {
  const { categoryId } = useParams();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const displayCategory = categoryId?.replace('-', '/');

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
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
        <div>
          <Link to="/" className="flex items-center gap-2 text-post-red-primary hover:text-post-red-dark font-bold mb-6 transition-all group uppercase text-[10px] tracking-widest">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <h2 className="text-4xl font-black text-post-red-primary uppercase tracking-tighter leading-none">
            {displayCategory}
          </h2>
          <p className="text-gray-400 mt-3 font-bold uppercase tracking-widest text-[10px]">Portal Archive / {displayCategory}</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-lg outline-none focus:border-post-red-primary shadow-sm transition-all font-medium text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-lg border border-gray-100 shadow-sm">
          <Loader2 size={40} className="animate-spin text-post-red-primary mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Synchronizing Records...</p>
        </div>
      ) : filteredDocs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-xl transition-all border-l-4 border-l-post-red-primary flex gap-6 items-start group"
            >
              <div className="bg-post-yellow-light text-post-red-primary p-4 rounded-lg group-hover:scale-110 transition-transform">
                <FileText size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-sm text-gray-800 uppercase tracking-tight mb-2 truncate">
                  {doc.fileName}
                </h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2 mb-6 h-8 opacity-80">
                  {doc.description || 'Official document archive entry for postal services.'}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">
                    {doc.createdAt?.toDate().toLocaleDateString('en-GB') || 'LATEST'}
                  </span>
                  <a 
                    href={doc.fileLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-post-red-primary text-white px-5 py-2 rounded-md text-[10px] font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-sm"
                  >
                    <Download size={14} />
                    View File
                  </a>
                </div>
              </div>
            </motion.div>
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
      <div className="mt-16 bg-post-yellow-light border border-post-yellow p-8 rounded-lg">
        <h4 className="font-black text-post-red-primary mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
          <Info size={16} />
          Portal Compliance
        </h4>
        <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-600 leading-relaxed">
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
