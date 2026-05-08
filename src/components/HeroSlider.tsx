import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=75&w=1600&auto=format&fit=crop',
    title: 'Transforming Postal Services',
    subtitle: 'Bringing digital efficiency and financial inclusion to every corner of India through modernized networks.',
    accent: 'Digital India',
    style: {
      gradient: 'md:from-blue-900/95 md:via-blue-900/40',
      accentText: 'text-blue-300',
      accentBg: 'bg-blue-400',
      btnBg: 'bg-blue-500 text-white',
      arrowBg: 'bg-white text-blue-900'
    }
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1621360841013-c7683c659ec6?q=75&w=1600&auto=format&fit=crop',
    title: 'Sukanya Samriddhi Yojana',
    subtitle: 'Securing the bright future of your girl child with the trust and reliability of India Post savings.',
    accent: 'Financial Empowerment',
    style: {
      gradient: 'md:from-pink-900/95 md:via-pink-900/40',
      accentText: 'text-pink-300',
      accentBg: 'bg-pink-400',
      btnBg: 'bg-pink-500 text-white',
      arrowBg: 'bg-white text-pink-900'
    }
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1454165833762-0102409830e7?q=75&w=1600&auto=format&fit=crop',
    title: 'Postal Life Insurance',
    subtitle: 'High returns and low premiums. Secure your family\'s future with India\'s oldest and most trusted insurer.',
    accent: 'Trusted Protection',
    style: {
      gradient: 'md:from-emerald-900/95 md:via-emerald-900/40',
      accentText: 'text-emerald-300',
      accentBg: 'bg-emerald-400',
      btnBg: 'bg-emerald-500 text-white',
      arrowBg: 'bg-white text-emerald-900'
    }
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=75&w=1600&auto=format&fit=crop',
    title: 'Modernizing Logistics',
    subtitle: 'From Speed Post to parcel services, we deliver your trust across the global network with precision.',
    accent: 'Dak Seva, Jan Seva',
    style: {
      gradient: 'md:from-orange-900/95 md:via-orange-900/40',
      accentText: 'text-orange-300',
      accentBg: 'bg-orange-400',
      btnBg: 'bg-orange-500 text-white',
      arrowBg: 'bg-white text-orange-900'
    }
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-900 mb-8">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.7 }
          }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <img 
            src={slides[current].image} 
            alt={slides[current].title}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 bg-black/60 md:bg-gradient-to-r ${slides[current].style.gradient} md:to-transparent`} />

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto w-full flex flex-col justify-center px-4 md:px-8">
            <div className="max-w-3xl relative px-4 md:px-0">
              <div className={`absolute -left-2 md:-left-8 top-0 bottom-0 w-1 md:w-2 ${slides[current].style.accentBg}`} />
              <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${slides[current].style.accentText} font-black text-[10px] md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] mb-2 md:mb-4 block`}
            >
              {slides[current].accent}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight md:leading-none mb-4 md:mb-6 drop-shadow-2xl"
            >
              {slides[current].title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm md:text-xl text-white/80 max-w-xl font-medium leading-relaxed mb-6 md:mb-10"
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button className={`${slides[current].style.btnBg} px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:scale-105 transition-all shadow-xl shadow-black/40 active:scale-95`}>
                Explore Services
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>

      {/* Manual Controls - Arrows - Hidden on small mobile */}
      <button 
        onClick={prevSlide}
        className={`hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center ${slides[current].style.arrowBg} hover:scale-110 shadow-lg rounded-full transition-all group`}
      >
        <ChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button 
        onClick={nextSlide}
        className={`hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center ${slides[current].style.arrowBg} hover:scale-110 shadow-lg rounded-full transition-all group`}
      >
        <ChevronRight className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > current ? 1 : -1);
              setCurrent(idx);
            }}
            className={`h-1.5 transition-all rounded-full ${idx === current ? `w-10 ${slides[current].style.accentBg}` : 'w-4 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
