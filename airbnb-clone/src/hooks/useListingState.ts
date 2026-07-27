import { format, parseISO } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createBookingRecord,
  loadListingUiState,
  saveListingUiState,
} from '../lib/listingStorage';
import type { ListingData } from '../types/listing';

export type ModalType = 'PHOTO_TOUR_SCROLLABLE' | 'PHOTO_TOUR_LIGHTBOX' | null;

function toDate(value: string | null): Date | null {
  if (!value) return null;
  const parts = value.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    if (!Number.isNaN(year) && !Number.isNaN(month) && !Number.isNaN(day)) {
      return new Date(year, month, day);
    }
  }
  try {
    const date = parseISO(value);
    return Number.isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

/**
 * Custom hook that keeps listing UI state in localStorage instead of URL params.
 */
export function useListingState(listing: ListingData) {
  const [state, setState] = useState(() => loadListingUiState());

  useEffect(() => {
    saveListingUiState(state);
  }, [state]);

  const checkIn = useMemo(() => toDate(state.checkIn), [state.checkIn]);
  const checkOut = useMemo(() => toDate(state.checkOut), [state.checkOut]);

  const isPhotoTourOpen = state.activeModal === 'PHOTO_TOUR_SCROLLABLE';
  const isLightboxOpen = state.activeModal === 'PHOTO_TOUR_LIGHTBOX';
  const initialLightboxIndex = state.photoIndex;
  const isSaved = state.isSaved;
  const guestCount = state.guestCount;
  const bookings = state.bookings;
  const lastOpenedModal = state.lastOpenedModal;

  const handleOpenPhotoTour = useCallback(() => {
    setState((prev) => ({
      ...prev,
      activeModal: 'PHOTO_TOUR_SCROLLABLE',
      lastOpenedModal: 'PHOTO_TOUR_SCROLLABLE',
    }));
  }, []);

  const handleOpenLightbox = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      activeModal: 'PHOTO_TOUR_LIGHTBOX',
      lastOpenedModal: 'PHOTO_TOUR_LIGHTBOX',
      photoIndex: Math.max(0, index),
    }));
  }, []);

  const setPhotoIndex = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      photoIndex: Math.max(0, index),
    }));
  }, []);

  const handleCloseModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      activeModal: null,
    }));
  }, []);

  const handleSelectDates = useCallback((start: Date | null, end: Date | null) => {
    setState((prev) => ({
      ...prev,
      checkIn: start ? format(start, 'yyyy-MM-dd') : null,
      checkOut: end ? format(end, 'yyyy-MM-dd') : null,
    }));
  }, []);

  const handleClearDates = useCallback(() => {
    setState((prev) => ({
      ...prev,
      checkIn: null,
      checkOut: null,
    }));
  }, []);

  const toggleSaved = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isSaved: !prev.isSaved,
    }));
  }, []);

  const setGuestCount = useCallback((count: number) => {
    setState((prev) => ({
      ...prev,
      guestCount: Math.min(4, Math.max(1, Math.trunc(count))),
    }));
  }, []);

  const handleReserve = useCallback(
    (pricing: { nights: number; totalBeforeTaxes: number }) => {
      setState((prev) => ({
        ...prev,
        bookings: [
          createBookingRecord(listing, {
            guests: prev.guestCount,
            checkIn: prev.checkIn ? parseISO(prev.checkIn) : null,
            checkOut: prev.checkOut ? parseISO(prev.checkOut) : null,
            nights: pricing.nights,
            totalBeforeTaxes: pricing.totalBeforeTaxes,
          }),
          ...prev.bookings,
        ],
      }));
    },
    [listing]
  );

  return {
    isPhotoTourOpen,
    isLightboxOpen,
    initialLightboxIndex,
    checkIn,
    checkOut,
    isSaved,
    guestCount,
    bookings,
    lastOpenedModal,
    handleOpenPhotoTour,
    handleOpenLightbox,
    setPhotoIndex,
    handleCloseModal,
    handleSelectDates,
    handleClearDates,
    toggleSaved,
    setGuestCount,
    handleReserve,
  };
}
