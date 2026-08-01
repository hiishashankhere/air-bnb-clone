import { parseISO } from 'date-fns';

const STORAGE_PREFIX = 'airbnb-clone';

export interface DemoSearchRecord {
  id: string;
  createdAt: string;
  location: string;
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
}

export interface HostMessageRecord {
  id: string;
  createdAt: string;
  listingId: string;
  guestName: string;
  guestEmail: string;
  message: string;
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
}

export interface HostMessageDraft {
  guestName: string;
  guestEmail: string;
  message: string;
}

export interface ListingReportRecord {
  id: string;
  createdAt: string;
  listingId: string;
  listingTitle: string;
  reason: string;
  details: string;
  contactEmail: string;
}

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function normalizeDate(value: unknown) {
  if (typeof value !== 'string' || !value) return null;
  const parsed = parseISO(value);
  return Number.isNaN(parsed.getTime()) ? null : value;
}

function clampGuests(value: unknown) {
  const count = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(count)) return 1;
  return Math.min(4, Math.max(1, Math.trunc(count)));
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function sortNewestFirst<T extends { createdAt: string }>(items: T[]) {
  return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

const recentSearchesKey = `${STORAGE_PREFIX}:recent-searches:v1`;
const hostMessagesKey = `${STORAGE_PREFIX}:host-messages:v1`;
const hostDraftKey = (listingId: string) => `${STORAGE_PREFIX}:host-message-draft:${listingId}:v1`;
const listingReportsKey = `${STORAGE_PREFIX}:listing-reports:v1`;

export function loadRecentSearches() {
  const items = readJson<DemoSearchRecord[]>(recentSearchesKey, []);
  return sortNewestFirst(items)
    .slice(0, 5)
    .map((item) => ({
      ...item,
      guests: clampGuests(item.guests),
      checkIn: normalizeDate(item.checkIn),
      checkOut: normalizeDate(item.checkOut),
    }));
}

export function saveRecentSearch(input: Omit<DemoSearchRecord, 'id' | 'createdAt'>) {
  const next: DemoSearchRecord = {
    id: createId('search'),
    createdAt: new Date().toISOString(),
    location: input.location.trim() || 'Anywhere',
    checkIn: normalizeDate(input.checkIn),
    checkOut: normalizeDate(input.checkOut),
    guests: clampGuests(input.guests),
  };

  const current = loadRecentSearches();
  const deduped = [
    next,
    ...current.filter(
      (item) =>
        item.location !== next.location ||
        item.checkIn !== next.checkIn ||
        item.checkOut !== next.checkOut ||
        item.guests !== next.guests
    ),
  ];

  writeJson(recentSearchesKey, deduped.slice(0, 5));
  return next;
}

export function loadHostMessageDraft(listingId: string): HostMessageDraft {
  return readJson<HostMessageDraft>(hostDraftKey(listingId), {
    guestName: '',
    guestEmail: '',
    message: '',
  });
}

export function saveHostMessageDraft(listingId: string, draft: HostMessageDraft) {
  writeJson(hostDraftKey(listingId), draft);
}

export function clearHostMessageDraft(listingId: string) {
  if (!isBrowser()) return;
  window.localStorage.removeItem(hostDraftKey(listingId));
}

export function loadHostMessages(listingId: string) {
  const items = readJson<HostMessageRecord[]>(hostMessagesKey, []);
  return sortNewestFirst(items.filter((item) => item.listingId === listingId));
}

export function saveHostMessage(input: Omit<HostMessageRecord, 'id' | 'createdAt'>) {
  const next: HostMessageRecord = {
    id: createId('message'),
    createdAt: new Date().toISOString(),
    listingId: input.listingId,
    guestName: input.guestName.trim() || 'Guest',
    guestEmail: input.guestEmail.trim(),
    message: input.message.trim(),
    checkIn: normalizeDate(input.checkIn),
    checkOut: normalizeDate(input.checkOut),
    guests: clampGuests(input.guests),
  };

  const current = readJson<HostMessageRecord[]>(hostMessagesKey, []);
  writeJson(hostMessagesKey, [next, ...current].slice(0, 25));
  return next;
}

export function loadListingReports(listingId: string) {
  const items = readJson<ListingReportRecord[]>(listingReportsKey, []);
  return sortNewestFirst(items.filter((item) => item.listingId === listingId));
}

export function saveListingReport(input: Omit<ListingReportRecord, 'id' | 'createdAt'>) {
  const next: ListingReportRecord = {
    id: createId('report'),
    createdAt: new Date().toISOString(),
    listingId: input.listingId,
    listingTitle: input.listingTitle,
    reason: input.reason.trim(),
    details: input.details.trim(),
    contactEmail: input.contactEmail.trim(),
  };

  const current = readJson<ListingReportRecord[]>(listingReportsKey, []);
  writeJson(listingReportsKey, [next, ...current].slice(0, 25));
  return next;
}
