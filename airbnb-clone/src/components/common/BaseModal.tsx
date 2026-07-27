import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  ariaLabelledBy?: string;
  maxWidthClass?: string;
  children: ReactNode;
}

export function BaseModal({
  isOpen,
  onClose,
  title,
  ariaLabelledBy = 'base-modal-title',
  maxWidthClass = 'max-w-2xl',
  children,
}: BaseModalProps) {
  useFocusTrap(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? ariaLabelledBy : undefined}
        >
          {/* Backdrop Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative bg-white w-full ${maxWidthClass} rounded-3xl max-h-[88vh] flex flex-col shadow-airbnb-modal overflow-hidden z-10`}
          >
            {/* Top Sticky Header */}
            {title && (
              <div className="p-4 px-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-black"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-800" />
                </button>
                <h2 id={ariaLabelledBy} className="font-bold text-gray-900 text-base">
                  {title}
                </h2>
                <div className="w-9" />
              </div>
            )}

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
