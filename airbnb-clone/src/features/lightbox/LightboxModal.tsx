import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Share, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { Photo } from '../../types/listing';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: Photo[];
  initialIndex?: number;
  isSaved: boolean;
  onToggleSaved: () => void;
  onIndexChange: (index: number) => void;
}

export function LightboxModal({
  isOpen,
  onClose,
  photos,
  initialIndex = 0,
  isSaved,
  onToggleSaved,
  onIndexChange,
}: LightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<number>(0);
  const safeInitialIndex = Math.min(Math.max(0, initialIndex), Math.max(0, photos.length - 1));

  useEffect(() => {
    setCurrentIndex(safeInitialIndex);
  }, [safeInitialIndex]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => {
      const next = prev > 0 ? prev - 1 : photos.length - 1;
      onIndexChange(next);
      return next;
    });
  }, [onIndexChange, photos.length]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => {
      const next = prev < photos.length - 1 ? prev + 1 : 0;
      onIndexChange(next);
      return next;
    });
  }, [onIndexChange, photos.length]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (photos.length === 0) return null;
  const currentPhoto = photos[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-white/98 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 text-gray-900"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-counter"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between z-10">
            <div id="lightbox-counter" className="text-sm font-semibold tracking-wider text-gray-800">
              {currentIndex + 1} / {photos.length}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="p-2.5 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-black"
                aria-label="Share photo"
              >
                <Share className="w-5 h-5 text-gray-900" />
              </button>
              <button
                onClick={onToggleSaved}
                className="p-2.5 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-black"
                aria-label="Save photo"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-gray-900'
                  }`}
                />
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-black"
                aria-label="Close photo viewer"
              >
                <X className="w-6 h-6 text-gray-900" />
              </button>
            </div>
          </div>

          {/* Main Image Stage with Slide Navigation */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Left Arrow Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 shadow-md transition transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image Slide */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentPhoto.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="max-w-5xl max-h-[75vh] flex flex-col items-center justify-center p-2"
              >
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.caption}
                  className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-airbnb-modal cursor-pointer"
                  onClick={handleNext}
                />
              </motion.div>
            </AnimatePresence>

            {/* Right Arrow Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 shadow-md transition transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="text-center z-10 py-2">
            <p className="text-sm font-medium text-gray-800 max-w-xl mx-auto line-clamp-2">
              {currentPhoto.caption}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
