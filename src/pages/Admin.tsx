import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  deleteDoc, 
  doc, 
  updateDoc 
} from 'firebase/firestore';
import { uploadToDrive, makeFilePublic, deleteFromDrive } from '../services/drive';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Link as LinkIcon, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Plus, 
  Settings, 
  Trash2, 
  ExternalLink,
  Search,
  Pencil,
  X
} from 'lucide-react';
import { auth } from '../lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const PRODUCT_CATEGORIES = [
  'Savings',
  'PLI/RPLI',
  'Domestic Mails',
  'International Mails',
  'Parcels',
  'BD/CCS'
];

interface Document {
  id: string;
  productId: string;
  fileName: string;
  description: string;
  fileLink: string;
  driveFileId?: string;
  uploadedBy: string;
  createdAt: any;
}

export default function Admin() {
  const { user, login, accessToken } = useAuth();
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('manage');
  const [formData, setFormData] = useState({
    product: PRODUCT_CATEGORIES[0],
    fileName: '',
    description: '',
    fileLink: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // Management State
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);

  useEffect(() => {
    if (user && activeTab === 'manage') {
      fetchDocuments();
    }
  }, [user, activeTab]);

  const fetchDocuments = async () => {
    setLoadingDocs(true);
    try {
      // Fetch only user's own documents or all if needed (assuming user's own for now)
      const q = query(
        collection(db, 'documents'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const docsArr = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Document));
      setDocuments(docsArr);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoadingDocs(false);
    }
  };

  const handleDelete = async (docItem: Document) => {
    if (!window.confirm(`Are you sure you want to delete "${docItem.fileName}"? This action cannot be undone.`)) return;
    
    setIsSubmitting(true);
    try {
      // 1. Delete from Firestore
      try {
        await deleteDoc(doc(db, 'documents', docItem.id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `documents/${docItem.id}`);
      }

      // 2. Delete from Drive if applicable
      if (docItem.driveFileId && accessToken) {
        try {
          await deleteFromDrive(docItem.driveFileId, accessToken);
        } catch (driveErr) {
          console.error('Failed to remove Drive file:', driveErr);
          // Don't block the UI if Drive fails but FS succeeded
        }
      }

      setDocuments(prev => prev.filter(d => d.id !== docItem.id));
      setStatus({ type: 'success', message: 'Document deleted successfully.' });
    } catch (error: any) {
      console.error(error);
      let message = 'Failed to delete document.';
      if (error.message) {
        try {
          const parsed = JSON.parse(error.message);
          message = parsed.error || parsed.message || parsed;
        } catch(e) {
          message = error.message;
        }
      }
      setStatus({ type: 'error', message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc) return;
    
    setIsSubmitting(true);
    try {
      const docRef = doc(db, 'documents', editingDoc.id);
      await updateDoc(docRef, {
        productId: editingDoc.productId,
        fileName: editingDoc.fileName,
        description: editingDoc.description,
        fileLink: editingDoc.fileLink
      });
      setDocuments(prev => prev.map(d => d.id === editingDoc.id ? editingDoc : d));
      setEditingDoc(null);
      setStatus({ type: 'success', message: 'Document updated successfully.' });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `documents/${editingDoc.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="w-20 h-20 bg-post-yellow-light text-post-red-primary rounded-full flex items-center justify-center mb-6">
          <AlertCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-post-red-primary mb-2 uppercase tracking-tight">Admin Access Required</h2>
        <p className="text-gray-500 mb-8 max-w-md font-medium">Please sign in with your authorized Google account to manage portal documents.</p>
        <button 
          onClick={login}
          className="bg-post-red-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-post-red-dark transition-all flex items-center gap-2 shadow-lg"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      let finalLink = formData.fileLink;
      let driveId = '';

      if (file) {
        if (!accessToken) {
          throw new Error('No Google access token found. Please re-login.');
        }
        const driveRes = await uploadToDrive(file, accessToken);
        finalLink = driveRes.webViewLink;
        driveId = driveRes.id;
        await makeFilePublic(driveId, accessToken);
      }

      if (!finalLink) {
        throw new Error('Please provide a file or a direct link.');
      }

      try {
        await addDoc(collection(db, 'documents'), {
          productId: formData.product,
          fileName: formData.fileName,
          description: formData.description,
          fileLink: finalLink,
          driveFileId: driveId,
          uploadedBy: user.uid,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, 'documents');
      }

      setStatus({ type: 'success', message: 'Document uploaded and registered successfully!' });
      setFormData({ product: PRODUCT_CATEGORIES[0], fileName: '', description: '', fileLink: '' });
      setFile(null);
      setActiveTab('manage');
      fetchDocuments();
    } catch (error: any) {
      console.error(error);
      setStatus({ type: 'error', message: error.message || 'Something went wrong.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredDocs = documents.filter(doc => 
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.productId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-8">
        <div>
          <h2 className="text-3xl font-black text-post-red-primary uppercase tracking-tight">Admin Console</h2>
          <p className="text-gray-500 font-medium">Control center for portal documentation.</p>
        </div>
        
        <div className="flex bg-gray-200/50 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === 'manage' ? 'bg-white text-post-red-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Settings size={14} />
            Manage
          </button>
          <button 
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === 'upload' ? 'bg-white text-post-red-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Plus size={14} />
            Upload
          </button>
        </div>
      </div>

      {status && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-4 rounded-lg flex items-center justify-between gap-3 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}
        >
          <div className="flex items-center gap-3 font-bold uppercase tracking-widest text-[10px]">
            {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {status.message}
          </div>
          <button onClick={() => setStatus(null)} className="opacity-50 hover:opacity-100"><X size={16} /></button>
        </motion.div>
      )}

      {activeTab === 'upload' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl border border-gray-100 p-8 md:p-10 border-t-8 border-post-red-primary"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Category Assignment</label>
              <select 
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 outline-none focus:border-post-red-primary transition-all font-bold uppercase text-xs"
                required
              >
                {PRODUCT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Display Title</label>
              <input 
                type="text"
                value={formData.fileName}
                onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 outline-none focus:border-post-red-primary transition-all font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">System Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 outline-none focus:border-post-red-primary transition-all resize-none font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${!formData.fileLink ? 'border-post-red-primary bg-red-50/10' : 'border-gray-50'}`} onClick={() => setFormData({ ...formData, fileLink: '' })}>
                <div className="flex items-center gap-3 mb-3">
                  <Upload size={18} className="text-post-red-primary" />
                  <span className="font-black text-[10px] uppercase tracking-widest">DRIVE UPLOAD</span>
                </div>
                <input 
                  type="file" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="text-[10px] text-gray-400 w-full"
                />
              </div>

              <div className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${formData.fileLink ? 'border-post-blue bg-blue-50/10' : 'border-gray-50'}`} onClick={() => setFile(null)}>
                <div className="flex items-center gap-3 mb-3">
                  <LinkIcon size={18} className="text-post-blue" />
                  <span className="font-black text-[10px] uppercase tracking-widest">EXTERNAL LINK</span>
                </div>
                <input 
                  type="url"
                  value={formData.fileLink}
                  onChange={(e) => setFormData({ ...formData, fileLink: e.target.value })}
                  className="w-full h-10 bg-white border border-gray-100 rounded px-2 text-[10px]"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-post-red-primary text-white rounded-lg font-black shadow-lg shadow-red-900/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <FileText />}
              Authorize Record Creation
            </button>
          </form>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="text"
              placeholder="Filter by title or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 pl-12 pr-6 bg-white border border-gray-100 rounded-xl outline-none focus:border-post-red-primary shadow-sm font-medium"
            />
          </div>

          {loadingDocs ? (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-50 flex flex-col items-center">
              <Loader2 className="animate-spin text-post-red-primary mb-4" size={32} />
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em]">Querying Database...</p>
            </div>
          ) : filteredDocs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredDocs.map(docItem => (
                <motion.div 
                  layout
                  key={docItem.id}
                  className="bg-white p-6 rounded-xl border border-gray-50 shadow-sm flex items-center justify-between gap-6 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-5 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-post-yellow-light rounded-lg flex items-center justify-center text-post-red-primary">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[9px] font-black uppercase bg-post-red-primary text-white px-2 py-0.5 rounded tracking-widest whitespace-nowrap">
                          {docItem.productId}
                        </span>
                        <h4 className="font-bold text-gray-800 text-sm truncate">{docItem.fileName}</h4>
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium truncate opacity-60 italic">{docItem.description || 'System entry'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a 
                      href={docItem.fileLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-post-blue hover:bg-post-yellow-light rounded-lg transition-all"
                      title="View File"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <button 
                      onClick={() => setEditingDoc(docItem)}
                      className="p-2 text-gray-400 hover:text-post-red-primary hover:bg-red-50 rounded-lg transition-all"
                      title="Edit Metadata"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(docItem)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all"
                      title="Delete Record"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-100">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">No document records found matching your query.</p>
            </div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingDoc && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setEditingDoc(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white rounded-2xl shadow-2xl z-[110] overflow-hidden"
            >
              <div className="p-6 bg-post-red-primary text-white flex justify-between items-center">
                <h3 className="text-lg font-black uppercase tracking-widest">Edit Document Record</h3>
                <button onClick={() => setEditingDoc(null)} className="p-2 hover:bg-white/10 rounded-full"><X size={20} /></button>
              </div>
              <form onSubmit={handleUpdate} className="p-8 space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
                  <select 
                    value={editingDoc.productId}
                    onChange={(e) => setEditingDoc({ ...editingDoc, productId: e.target.value })}
                    className="w-full h-12 bg-gray-50 border border-gray-100 rounded-lg px-4 font-bold text-xs uppercase"
                  >
                    {PRODUCT_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Title</label>
                  <input 
                    type="text"
                    value={editingDoc.fileName}
                    onChange={(e) => setEditingDoc({ ...editingDoc, fileName: e.target.value })}
                    className="w-full h-12 bg-gray-50 border border-gray-100 rounded-lg px-4 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Description</label>
                  <textarea 
                    value={editingDoc.description}
                    onChange={(e) => setEditingDoc({ ...editingDoc, description: e.target.value })}
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg p-4 font-medium resize-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Asset URL</label>
                  <input 
                    type="text"
                    value={editingDoc.fileLink}
                    onChange={(e) => setEditingDoc({ ...editingDoc, fileLink: e.target.value })}
                    className="w-full h-12 bg-gray-50 border border-gray-100 rounded-lg px-4 font-mono text-[10px] text-blue-600"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-post-red-primary text-white rounded-xl font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-red-900/20 active:scale-95 transition-all"
                >
                  {isSubmitting ? 'Processing...' : 'Apply Permanent Changes'}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="mt-12 text-center">
        <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.3em]">Authorized Terminal / Session: Secure_POST_{user.uid.slice(0, 6)}</p>
      </div>
    </div>
  );
}

