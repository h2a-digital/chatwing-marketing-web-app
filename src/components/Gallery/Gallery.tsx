'use client';

import { gallery } from '@/content/gallery';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Analytics, EVT } from '@/utils/analytics';

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleImageSelect = (index: number) => {
    setDirection(index > selectedImage ? 1 : -1);
    setSelectedImage(index);
    Analytics.instance.capture(EVT.GALLERY_IMAGE_SELECTED, {
      screenshot: gallery[index].alt,
      index,
    });
  };

  const handleNext = () => {
    const nextIndex = (selectedImage + 1) % gallery.length;
    handleImageSelect(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = selectedImage === 0 ? gallery.length - 1 : selectedImage - 1;
    handleImageSelect(prevIndex);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 py-24 text-white"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-pink-500 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-purple-500 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 text-5xl">📱</div>
          <h2 id="gallery-heading" className="mb-4 text-4xl font-black md:text-5xl lg:text-6xl">
            See the Magic
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              In Action
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl font-medium text-gray-300">
            Real screenshots, real results 💬✨
          </p>
        </motion.div>

        {/* Phone mockup with swipe animation */}
        <div className="relative mx-auto mb-12 max-w-sm">
          <div className="relative rounded-[3rem] bg-gray-800 p-3 shadow-2xl">
            <div className="relative aspect-[9/19] overflow-hidden rounded-[2.5rem] bg-white">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={selectedImage}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={gallery[selectedImage].src}
                    alt={gallery[selectedImage].alt}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Notch */}
            <div
              className="absolute top-0 left-1/2 h-6 w-1/3 -translate-x-1/2 transform rounded-b-2xl bg-gray-800"
              aria-hidden="true"
            />

            {/* Navigation arrows */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 -translate-x-16 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous screenshot"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 translate-x-16 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next screenshot"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-3">
          {gallery.map((_, index) => (
            <button
              key={index}
              onClick={() => handleImageSelect(index)}
              aria-label={`View screenshot ${index + 1}`}
              aria-current={selectedImage === index ? 'true' : 'false'}
              className={`rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white ${
                selectedImage === index
                  ? 'h-3 w-8 bg-white'
                  : 'h-3 w-3 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
