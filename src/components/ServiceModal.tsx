import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/errorHandler';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string | null;
}

export default function ServiceModal({ isOpen, onClose, serviceType }: ServiceModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<any>({ office_name: 'Dhenkanal RS SO' });

  if (!isOpen || !serviceType) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let collectionName = '';
    
    switch (serviceType) {
      case 'Gangajal Order': collectionName = 'gangajal_orders'; break;
      case 'Aadhaar Updation / Enrollment': collectionName = 'aadhaar_bookings'; break;
      case 'Passport Services': collectionName = 'passport_requests'; break;
      case 'Booking of Articles': collectionName = 'booking_requests'; break;
      case 'Track Your Articles': collectionName = 'tracking_requests'; break;
      case 'Account Opening': collectionName = 'account_requests'; break;
      case 'PLI / RPLI Services': collectionName = 'pli_requests'; break;
      case 'Any Other Help': collectionName = 'other_requests'; break;
      default: collectionName = 'other_requests';
    }

    try {
      await addDoc(collection(db, collectionName), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setIsSuccess(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, collectionName);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ office_name: 'Dhenkanal RS SO' });
    }, 300);
  };

  const renderFormFields = () => {
    if (serviceType === 'Gangajal Order') {
      return (
        <>
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Full Name</label>
            <input required type="text" className="w-full text-sm border p-2 rounded" onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Mobile Number</label>
            <input required type="tel" className="w-full text-sm border p-2 rounded" onChange={e => setFormData({...formData, mobile: e.target.value})} />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Full Address</label>
            <textarea required className="w-full text-sm border p-2 rounded resize-none" rows={3} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Quantity / Requirements</label>
            <input required type="number" min="1" className="w-full text-sm border p-2 rounded" onChange={e => setFormData({...formData, quantity: e.target.value})} />
          </div>
        </>
      );
    }

    if (serviceType === 'Aadhaar Updation / Enrollment') {
      return (
        <>
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Full Name</label>
            <input required type="text" className="w-full text-sm border p-2 rounded" onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Mobile Number</label>
            <input required type="tel" className="w-full text-sm border p-2 rounded" onChange={e => setFormData({...formData, mobile: e.target.value})} />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Full Address</label>
            <textarea required className="w-full text-sm border p-2 rounded resize-none" rows={3} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Date of Booking</label>
            <input required type="date" className="w-full text-sm border p-2 rounded" onChange={e => setFormData({...formData, booking_date: e.target.value})} />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Office Name</label>
            <select required className="w-full text-sm border p-2 rounded" value={formData.office_name || 'Dhenkanal RS SO'} onChange={e => setFormData({...formData, office_name: e.target.value})}>
              <option value="Dhenkanal RS SO">Dhenkanal RS SO</option>
            </select>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Full Name</label>
          <input required type="text" className="w-full text-sm border p-2 rounded" onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Mobile Number</label>
          <input required type="tel" className="w-full text-sm border p-2 rounded" onChange={e => setFormData({...formData, mobile: e.target.value})} />
        </div>
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Full Address</label>
          <textarea required className="w-full text-sm border p-2 rounded resize-none" rows={3} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Service Requirement / Message</label>
          <textarea required className="w-full text-sm border p-2 rounded resize-none" rows={3} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
        </div>
      </>
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
        >
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <X size={18} />
          </button>
          
          <div className="p-6 md:p-8">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-2">Request Submitted</h3>
                <p className="text-sm text-gray-500 mb-6">Your request for {serviceType} has been successfully registered.</p>
                <button 
                  onClick={handleClose}
                  className="bg-post-red-primary text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-post-red-dark transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl font-black text-post-red-primary tracking-tight uppercase border-l-4 border-post-yellow pl-3">
                    {serviceType}
                  </h2>
                  <p className="text-xs text-gray-500 font-medium mt-1 pl-4">Please fill in the details below to submit your request.</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  {renderFormFields()}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-post-red-primary text-white py-3 mt-4 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-post-red-dark transition-colors flex justify-center items-center h-12"
                  >
                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Submit Request'}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
