'use client';

import { gallery } from '@/content/gallery';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Analytics, EVT } from '@/utils/analytics';

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
    Analytics.instance.capture(EVT.GALLERY_IMAGE_SELECTED, {
      screenshot: gallery[index].alt,
      index,
    });
  };

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-gray-900 py-24 text-white"
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 id="gallery-heading" className="mb-4 text-4xl font-bold md:text-5xl">
            See It In Action
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-300">
            Discover how Easly makes grocery shopping a breeze
          </p>
        </motion.div>

        {/* Main Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mx-auto max-w-xs">
            <div className="relative rounded-[2.5rem] bg-gray-800 p-2.5 shadow-2xl">
              <div className="aspect-9/19 overflow-hidden rounded-4xl bg-white">
                <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
                  <Image
                    src={gallery[selectedImage].src}
                    alt={gallery[selectedImage].alt}
                    width={300}
                    height={630}
                    className="h-full w-full"
                  />
                </div>
              </div>
              {/* Notch */}
              <div
                className="absolute top-0 left-1/2 h-5 w-1/3 -translate-x-1/2 transform rounded-b-2xl bg-gray-800"
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </motion.div>

        {/* Thumbnail Navigation */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 overflow-x-auto pb-4">
            {gallery.map((image, index) => (
              <button
                key={image.id}
                onClick={() => handleImageSelect(index)}
                aria-label={`View ${image.alt}`}
                aria-current={selectedImage === index ? 'true' : 'false'}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${selectedImage === index ? 'scale-110 border-white' : 'border-transparent opacity-50 hover:opacity-100'} `}
              >
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
                  <Image
                    src={image.src}
                    alt=""
                    width={80}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
