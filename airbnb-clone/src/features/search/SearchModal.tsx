import { format } from 'date-fns';
import { History, Search, Sparkles, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Calendar } from '../../components/calendar/Calendar';
import { BaseModal } from '../../components/common/BaseModal';
import { loadRecentSearches, saveRecentSearch, type DemoSearchRecord } from '../../lib/demoStorage';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  currentCheckIn: Date | null;
  currentCheckOut: Date | null;
  currentGuests: number;
  onApplySearch: (search: {
    location: string;
    checkIn: Date | null;
    checkOut: Date | null;
    guests: number;
  }) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  currentLocation,
  currentCheckIn,
  currentCheckOut,
  currentGuests,
  onApplySearch,
}: SearchModalProps) {
  const [location, setLocation] = useState(currentLocation);
  const [checkIn, setCheckIn] = useState<Date | null>(currentCheckIn);
  const [checkOut, setCheckOut] = useState<Date | null>(currentCheckOut);
  const [guests, setGuests] = useState(currentGuests);
  const [recentSearches, setRecentSearches] = useState<DemoSearchRecord[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setLocation(currentLocation);
    setCheckIn(currentCheckIn);
    setCheckOut(currentCheckOut);
    setGuests(currentGuests);
    setRecentSearches(loadRecentSearches());
    setStatusMessage(null);
  }, [currentCheckIn, currentCheckOut, currentGuests, currentLocation, isOpen]);

  const dateSummary = useMemo(() => {
    if (checkIn && checkOut) {
      return `${format(checkIn, 'dd MMM')} - ${format(checkOut, 'dd MMM yyyy')}`;
    }
    if (checkIn) return `${format(checkIn, 'dd MMM yyyy')} - add checkout`;
    return 'Choose your dates';
  }, [checkIn, checkOut]);

  const handleApply = () => {
    const trimmedLocation = location.trim() || currentLocation;
    saveRecentSearch({
      location: trimmedLocation,
      checkIn: checkIn ? checkIn.toISOString() : null,
      checkOut: checkOut ? checkOut.toISOString() : null,
      guests,
    });
    setRecentSearches(loadRecentSearches());
    onApplySearch({ location: trimmedLocation, checkIn, checkOut, guests });
    setStatusMessage('Search saved locally and applied to this listing.');
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Search stays" maxWidthClass="max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-0 lg:gap-6 p-6 sm:p-8">
        <div className="space-y-5 border-b lg:border-b-0 lg:border-r border-gray-200 pb-6 lg:pb-0 lg:pr-6">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
              <Search className="w-4 h-4" />
              <span>Search preferences</span>
            </div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Where to
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Anywhere"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Guests
            </label>
            <div className="relative">
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value={1}>1 guest</option>
                <option value={2}>2 guests</option>
                <option value={3}>3 guests</option>
                <option value={4}>4 guests</option>
              </select>
              <Users className="pointer-events-none absolute right-4 top-1/2 w-4 h-4 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Current selection</span>
            </div>
            <p className="text-sm text-gray-600">{currentLocation}</p>
            <p className="text-sm text-gray-600 mt-1">{dateSummary}</p>
            <p className="text-sm text-gray-600 mt-1">
              {guests} guest{guests > 1 ? 's' : ''}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <History className="w-4 h-4" />
              <span>Recent searches</span>
            </div>
            {recentSearches.length === 0 ? (
              <p className="text-sm text-gray-500">No recent searches saved yet.</p>
            ) : (
              <div className="space-y-2">
                {recentSearches.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setLocation(item.location);
                      setCheckIn(item.checkIn ? new Date(item.checkIn) : null);
                      setCheckOut(item.checkOut ? new Date(item.checkOut) : null);
                      setGuests(item.guests);
                    }}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-left transition hover:border-gray-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <div className="text-sm font-semibold text-gray-900">{item.location}</div>
                    <div className="mt-1 text-xs text-gray-500">
                      {item.checkIn && item.checkOut
                        ? `${format(new Date(item.checkIn), 'dd MMM')} - ${format(
                            new Date(item.checkOut),
                            'dd MMM yyyy'
                          )}`
                        : 'Dates not set'}
                      {' · '}
                      {item.guests} guest{item.guests > 1 ? 's' : ''}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 pt-6 lg:pt-0 lg:pl-2">
          <Calendar
            checkIn={checkIn}
            checkOut={checkOut}
            onSelectDates={(start, end) => {
              setCheckIn(start);
              setCheckOut(end);
            }}
            onClearDates={() => {
              setCheckIn(null);
              setCheckOut(null);
            }}
            locationName={currentLocation.split(',')[0] || 'Candolim'}
          />

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              This demo saves search intent in your browser so you can revisit it later.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setLocation(currentLocation);
                  setCheckIn(currentCheckIn);
                  setCheckOut(currentCheckOut);
                  setGuests(currentGuests);
                }}
                className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
              >
                Save search
              </button>
            </div>
          </div>

          {statusMessage && <p className="text-sm font-medium text-gray-600">{statusMessage}</p>}
        </div>
      </div>
    </BaseModal>
  );
}
