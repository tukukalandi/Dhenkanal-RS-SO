import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import OurServices from '../components/OurServices';
import NewsMarquee from '../components/NewsMarquee';

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="w-full bg-[#f8f9fa] pb-24">
      <div className="w-full">
        <HeroSlider />
        <OurServices />
      </div>

      <div className="max-w-7xl mx-auto p-3 md:p-8 space-y-6 md:space-y-8">
        <NewsMarquee />
      </div>
    </main>
  );
}
