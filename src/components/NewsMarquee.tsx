import React, { useState, useEffect } from 'react';
import { Megaphone } from 'lucide-react';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/errorHandler';

interface NewsItem {
  id: string;
  content: string;
}

const FALLBACK_NEWS = [
  'Welcome to Dhenkanal Postal Division RS SO Portal.',
  'Please log in to internal portal for official documents.',
];

export default function NewsMarquee() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'news'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const news = snapshot.docs.map(doc => ({
        id: doc.id,
        content: doc.data().content
      }));
      setNewsItems(news);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'news');
    });

    return () => unsubscribe();
  }, []);

  const displayNews = newsItems.length > 0 ? newsItems.map(n => n.content) : FALLBACK_NEWS;

  return (
    <div className="bg-post-yellow-light border-y border-post-yellow/30 h-10 flex items-center overflow-hidden mb-8 rounded-lg">
      <div className="bg-post-red-primary text-white h-full px-4 flex items-center gap-2 z-10 shadow-lg relative rounded-r-xl">
        <Megaphone size={14} className="animate-bounce" />
        <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap hidden sm:inline-block">Latest News</span>
      </div>
      
      <div className="flex-1 overflow-hidden relative group">
        <div className="flex whitespace-nowrap animate-marquee group-hover:pause-marquee py-2">
          {displayNews.map((item, idx) => (
            <span key={idx} className="mx-8 text-[11px] font-bold text-post-red-dark uppercase tracking-wide">
              • {item}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {displayNews.map((item, idx) => (
            <span key={`dup-${idx}`} className="mx-8 text-[11px] font-bold text-post-red-dark uppercase tracking-wide">
              • {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
