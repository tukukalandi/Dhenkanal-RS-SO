import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1596460391300-2d888147779f?q=80&w=2670&auto=format&fit=crop',
    title: 'Modernizing Logistics',
    subtitle: 'State-of-the-art sorting and delivery networks ensuring your parcels reach faster than ever.',
    accent: 'Digital Transformation'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop',
    title: 'Trusted Savings',
    subtitle: 'From Mahila Samman to Sukanya Samriddhi, we secure the future of every Indian citizen.',
    accent: 'Financial Inclusion'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1566121316353-3837a71f76da?q=80&w=2670&auto=format&fit=crop',
    title: 'Last Mile Connection',
    subtitle: 'Crossing every geographical barrier to deliver smiles and essential services to your doorstep.',
    accent: 'Dak Seva, Jan Seva'
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
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-gray-900 mb-8">
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
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto w-full flex flex-col justify-center px-4 md:px-8">
            <div className="max-w-3xl relative">
              <div className="absolute -left-4 md:-left-8 top-0 bottom-0 w-1.5 bg-post-red-primary" />
              <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-post-yellow font-black text-xs md:text-sm uppercase tracking-[0.4em] mb-4"
            >
              {slides[current].accent}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6"
            >
              {slides[current].title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 max-w-xl font-medium leading-relaxed mb-10"
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button className="bg-post-red-primary text-white px-8 py-4 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-post-red-dark transition-all shadow-xl shadow-red-900/20 active:scale-95">
                Explore Services
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>

      {/* Manual Controls - Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all group"
      >
        <ChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all group"
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
            className={`h-1.5 transition-all rounded-full ${idx === current ? 'w-10 bg-post-yellow' : 'w-4 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
