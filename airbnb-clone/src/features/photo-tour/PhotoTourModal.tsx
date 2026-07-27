import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Heart, Share } from 'lucide-react';
import { useEffect, useState } from 'react';
import { photoTourCategorySections } from '../../data/photoTourData';
import type { Photo } from '../../types/listing';
import { PhotoSection } from './PhotoSection';

interface PhotoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: Photo[];
  onOpenLightbox: (index: number) => void;
}

export function PhotoTourModal({
  isOpen,
  onClose,
  photos,
  onOpenLightbox,
}: PhotoTourModalProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handle escape key & lock body overflow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 z-50 bg-white overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Photo tour overlay"
        >
          {/* Top Sticky Bar */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="Back to listing"
            >
              <ArrowLeft className="w-5 h-5 text-gray-900" />
            </button>

            <h1 className="text-base font-bold text-gray-900">Photo tour</h1>

            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-black text-xs font-semibold"
                aria-label="Share photo tour"
              >
                <Share className="w-4 h-4 text-gray-900" />
                {copied && <span className="text-gray-900 font-semibold">Copied!</span>}
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="p-2.5 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-black"
                aria-label="Save photo tour"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-gray-900'
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Continuous Vertically Scrollable Document Container (Max 1600px width, 120px section gap) */}
          <main className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-16 py-12 space-y-[120px]">
            {photoTourCategorySections.map((section) => (
              <PhotoSection
                key={section.id}
                section={section}
                allPhotos={photos}
                onOpenLightbox={onOpenLightbox}
              />
            ))}
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
