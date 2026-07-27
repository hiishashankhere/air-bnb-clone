import { format, parseISO } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export type ModalType = 'PHOTO_TOUR_SCROLLABLE' | 'PHOTO_TOUR_LIGHTBOX' | null;

/**
 * Custom hook to synchronize modal overlay states and booking date selections with URL query parameters.
 */
export function useListingState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const modalParam = searchParams.get('modal') as ModalType;
  const photoIndexParam = searchParams.get('photoIndex');
  const checkInParam = searchParams.get('checkIn');
  const checkOutParam = searchParams.get('checkOut');

  const isPhotoTourOpen = modalParam === 'PHOTO_TOUR_SCROLLABLE';
  const isLightboxOpen = modalParam === 'PHOTO_TOUR_LIGHTBOX';
  const initialLightboxIndex = photoIndexParam ? parseInt(photoIndexParam, 10) : 0;

  // Dates default to null if not specified in URL params
  const checkIn = useMemo(() => {
    if (checkInParam) {
      try {
        const date = parseISO(checkInParam);
        return isNaN(date.getTime()) ? null : date;
      } catch {
        return null;
      }
    }
    return null;
  }, [checkInParam]);

  const checkOut = useMemo(() => {
    if (checkOutParam) {
      try {
        const date = parseISO(checkOutParam);
        return isNaN(date.getTime()) ? null : date;
      } catch {
        return null;
      }
    }
    return null;
  }, [checkOutParam]);

  const handleOpenPhotoTour = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('modal', 'PHOTO_TOUR_SCROLLABLE');
      return next;
    });
  }, [setSearchParams]);

  const handleOpenLightbox = useCallback(
    (index: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set('modal', 'PHOTO_TOUR_LIGHTBOX');
        next.set('photoIndex', index.toString());
        return next;
      });
    },
    [setSearchParams]
  );

  const handleCloseModal = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('modal');
      next.delete('photoIndex');
      return next;
    });
  }, [setSearchParams]);

  const handleSelectDates = useCallback(
    (start: Date | null, end: Date | null) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (start) {
          next.set('checkIn', format(start, 'yyyy-MM-dd'));
        } else {
          next.delete('checkIn');
        }
        if (end) {
          next.set('checkOut', format(end, 'yyyy-MM-dd'));
        } else {
          next.delete('checkOut');
        }
        return next;
      });
    },
    [setSearchParams]
  );

  const handleClearDates = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('checkIn');
      next.delete('checkOut');
      return next;
    });
  }, [setSearchParams]);

  return {
    isPhotoTourOpen,
    isLightboxOpen,
    initialLightboxIndex,
    checkIn,
    checkOut,
    handleOpenPhotoTour,
    handleOpenLightbox,
    handleCloseModal,
    handleSelectDates,
    handleClearDates,
  };
}
