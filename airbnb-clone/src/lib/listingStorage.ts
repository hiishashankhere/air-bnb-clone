import { parseISO } from 'date-fns';
import type { ListingData } from '../types/listing';

export const LISTING_STORAGE_KEY = 'airbnb-clone:v1';

export type ModalType = 'PHOTO_TOUR_SCROLLABLE' | 'PHOTO_TOUR_LIGHTBOX' | null;

export interface BookingRecord {
  id: string;
  createdAt: string;
  listingId: string;
  guests: number;
  checkIn: string | null;
  checkOut: string | null;
  nights: number;
  totalBeforeTaxes: number;
}

export interface ListingUiStorageState {
  activeModal: ModalType;
  lastOpenedModal: ModalType;
  photoIndex: number;
  checkIn: string | null;
  checkOut: string | null;
  isSaved: boolean;
  guestCount: number;
  bookings: BookingRecord[];
}

const defaultState: ListingUiStorageState = {
  activeModal: null,
  lastOpenedModal: null,
  photoIndex: 0,
  checkIn: null,
  checkOut: null,
  isSaved: false,
  guestCount: 1,
  bookings: [],
};

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function clampGuestCount(value: unknown) {
  const count = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(count)) return defaultState.guestCount;
  return Math.min(3, Math.max(1, Math.trunc(count)));
}

function normalizeDate(value: unknown) {
  if (typeof value !== 'string' || !value) return null;
  const parsed = parseISO(value);
  return Number.isNaN(parsed.getTime()) ? null : value;
}

function normalizeModal(value: unknown): ModalType {
  return value === 'PHOTO_TOUR_SCROLLABLE' || value === 'PHOTO_TOUR_LIGHTBOX' ? value : null;
}

function normalizeBookings(value: unknown): BookingRecord[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry): BookingRecord | null => {
      if (!entry || typeof entry !== 'object') return null;
      const record = entry as Partial<BookingRecord>;
      if (
        typeof record.id !== 'string' ||
        typeof record.createdAt !== 'string' ||
        typeof record.listingId !== 'string'
      ) {
        return null;
      }

      return {
        id: record.id,
        createdAt: record.createdAt,
        listingId: record.listingId,
        guests: clampGuestCount(record.guests),
        checkIn: normalizeDate(record.checkIn),
        checkOut: normalizeDate(record.checkOut),
        nights: Number.isFinite(record.nights) ? Math.max(0, Math.trunc(record.nights ?? 0)) : 0,
        totalBeforeTaxes:
          typeof record.totalBeforeTaxes === 'number' && Number.isFinite(record.totalBeforeTaxes)
            ? record.totalBeforeTaxes
            : 0,
      };
    })
    .filter((value): value is BookingRecord => value !== null);
}

export function loadListingUiState(): ListingUiStorageState {
  if (!isBrowser()) return defaultState;

  try {
    const raw = window.localStorage.getItem(LISTING_STORAGE_KEY);
    if (!raw) return defaultState;

    const parsed = JSON.parse(raw) as Partial<ListingUiStorageState>;
    return {
      activeModal: normalizeModal(parsed.activeModal),
      lastOpenedModal: normalizeModal(parsed.lastOpenedModal),
      photoIndex:
        typeof parsed.photoIndex === 'number' && Number.isFinite(parsed.photoIndex)
          ? Math.max(0, Math.trunc(parsed.photoIndex))
          : defaultState.photoIndex,
      checkIn: normalizeDate(parsed.checkIn),
      checkOut: normalizeDate(parsed.checkOut),
      isSaved: Boolean(parsed.isSaved),
      guestCount: clampGuestCount(parsed.guestCount),
      bookings: normalizeBookings(parsed.bookings),
    };
  } catch {
    return defaultState;
  }
}

export function saveListingUiState(state: ListingUiStorageState) {
  if (!isBrowser()) return;
  window.localStorage.setItem(LISTING_STORAGE_KEY, JSON.stringify(state));
}

export function createBookingRecord(
  listing: ListingData,
  options: {
    guests: number;
    checkIn: Date | null;
    checkOut: Date | null;
    nights: number;
    totalBeforeTaxes: number;
  }
): BookingRecord {
  return {
    id: `${listing.id}-${Date.now()}`,
    createdAt: new Date().toISOString(),
    listingId: listing.id,
    guests: clampGuestCount(options.guests),
    checkIn: options.checkIn ? options.checkIn.toISOString() : null,
    checkOut: options.checkOut ? options.checkOut.toISOString() : null,
    nights: Math.max(0, Math.trunc(options.nights)),
    totalBeforeTaxes: options.totalBeforeTaxes,
  };
}

export function getDefaultListingUiState() {
  return defaultState;
}
