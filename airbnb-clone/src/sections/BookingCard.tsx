import { format } from 'date-fns';
import { ChevronDown, Flag, Star, X } from 'lucide-react';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Calendar } from '../components/calendar/Calendar';
import { BaseModal } from '../components/common/BaseModal';
import { calculateNights } from '../utils/dateUtils';
import {
  loadListingReports,
  saveListingReport,
} from '../lib/demoStorage';

interface BookingCardProps {
  listingId: string;
  listingTitle: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  cleaningFee: number;
  serviceFee: number;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  bookingsCount: number;
  onGuestsChange: (guests: number) => void;
  onReserve: (pricing: { nights: number; totalBeforeTaxes: number }) => void;
  onSelectDates: (checkIn: Date | null, checkOut: Date | null) => void;
  onClearDates: () => void;
}

export const BookingCard = memo(function BookingCard({
  listingId,
  listingTitle,
  pricePerNight,
  rating,
  reviewsCount,
  cleaningFee,
  serviceFee,
  checkIn,
  checkOut,
  guests,
  bookingsCount,
  onGuestsChange,
  onReserve,
  onSelectDates,
  onClearDates,
}: BookingCardProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Incorrect listing details');
  const [reportDetails, setReportDetails] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [reportStatusMessage, setReportStatusMessage] = useState<string | null>(null);
  const [recentReports, setRecentReports] = useState(() => loadListingReports(listingId));
  const cardRef = useRef<HTMLDivElement | null>(null);

  const actualNights = calculateNights(checkIn, checkOut);
  const nightsCount = actualNights > 0 ? actualNights : 5;
  const subtotal = pricePerNight * nightsCount;
  const totalPrice = subtotal + cleaningFee + serviceFee;

  const checkInText = checkIn ? format(checkIn, 'dd/MM/yyyy') : 'Add date';
  const checkOutText = checkOut ? format(checkOut, 'dd/MM/yyyy') : 'Add date';
  const bookingSummary = useMemo(() => {
    if (bookingsCount <= 0) return 'No local reservations yet';
    return `${bookingsCount} local reservation${bookingsCount > 1 ? 's' : ''} saved in this browser`;
  }, [bookingsCount]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!cardRef.current) return;
      if (!cardRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDatePickerOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isReportOpen) {
      setRecentReports(loadListingReports(listingId));
    }
  }, [isReportOpen, listingId]);

  const handleToggleDatePicker = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  const handleReserveClick = () => {
    if (!checkIn || !checkOut) {
      setStatusMessage('Select check-in and checkout dates first.');
      setIsDatePickerOpen(true);
      return;
    }

    onReserve({ nights: nightsCount, totalBeforeTaxes: totalPrice });
    setIsDatePickerOpen(false);
    setStatusMessage(`Reservation saved locally for ${nightsCount} nights.`);
  };

  const handleSubmitReport = () => {
    if (!reportDetails.trim()) {
      setReportStatusMessage('Please add a few details so the demo can store the report locally.');
      return;
    }

    const saved = saveListingReport({
      listingId,
      listingTitle,
      reason: reportReason,
      details: reportDetails,
      contactEmail,
    });

    setRecentReports((prev) => [saved, ...prev].slice(0, 3));
    setReportDetails('');
    setContactEmail('');
    setReportReason('Incorrect listing details');
    setReportStatusMessage('Report saved locally in this browser.');
  };

  return (
    <div
      ref={cardRef}
      className="sticky top-28 w-full bg-white border border-gray-200 rounded-3xl p-6 shadow-airbnb-card space-y-6 relative"
    >
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-extrabold text-gray-900">₹{pricePerNight.toLocaleString('en-IN')}</span>
          <span className="text-base text-gray-600 font-normal"> / night</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-gray-900">
          <Star className="w-3.5 h-3.5 fill-current text-gray-900" />
          <span>{rating.toFixed(2)}</span>
          <span className="text-gray-400">·</span>
          <span className="underline text-gray-500">{reviewsCount} reviews</span>
        </div>
      </div>

      <div className="border border-gray-400 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-black">
        <div className="grid grid-cols-2 border-b border-gray-400">
          <button
            type="button"
            onClick={handleToggleDatePicker}
            className="p-3 border-r border-gray-400 cursor-pointer hover:bg-gray-50 focus:outline-none text-left"
          >
            <span className="block text-[10px] font-extrabold text-gray-800 uppercase tracking-wider">
              CHECK-IN
            </span>
            <span className="text-xs text-gray-800 font-semibold">{checkInText}</span>
          </button>
          <button
            type="button"
            onClick={handleToggleDatePicker}
            className="p-3 cursor-pointer hover:bg-gray-50 focus:outline-none text-left"
          >
            <span className="block text-[10px] font-extrabold text-gray-800 uppercase tracking-wider">
              CHECKOUT
            </span>
            <span className="text-xs text-gray-800 font-semibold">{checkOutText}</span>
          </button>
        </div>

        <div className="relative">
          <label className="block p-3 cursor-pointer hover:bg-gray-50 focus-within:bg-gray-50 text-left">
            <span className="block text-[10px] font-extrabold text-gray-800 uppercase tracking-wider">
              GUESTS
            </span>
            <select
              value={guests}
              onChange={(e) => {
                const count = Number(e.target.value);
                onGuestsChange(count);
                setIsDatePickerOpen(false);
              }}
              className="w-full bg-transparent text-xs text-gray-800 font-semibold focus:outline-none cursor-pointer pr-6 appearance-none"
              aria-label="Select number of guests"
            >
              <option value={1}>1 guest</option>
              <option value={2}>2 guests</option>
              <option value={3}>3 guests</option>
              <option value={4}>4 guests</option>
            </select>
          </label>
          <ChevronDown className="w-4 h-4 text-gray-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {isDatePickerOpen && (
        <div className="absolute right-0 top-0 sm:top-12 z-50 w-[640px] max-w-[90vw] bg-white rounded-3xl p-6 shadow-2xl border border-gray-200">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <div>
              <div className="text-base sm:text-lg font-bold text-gray-900">
                {checkIn && checkOut
                  ? `${nightsCount} night${nightsCount > 1 ? 's' : ''}`
                  : checkIn
                  ? 'Select checkout date'
                  : 'Select check-in date'}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {checkInText} - {checkOutText}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsDatePickerOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 focus:outline-none transition"
              aria-label="Close calendar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-white">
            <Calendar
              checkIn={checkIn}
              checkOut={checkOut}
              onSelectDates={(start, end) => {
                onSelectDates(start, end);
                if (start && end) {
                  setStatusMessage(`Selected ${calculateNights(start, end)} nights.`);
                }
              }}
              onClearDates={onClearDates}
              locationName="Candolim"
            />
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onClearDates();
                setStatusMessage('Dates cleared.');
              }}
              className="text-sm font-semibold text-gray-900 underline hover:text-gray-700 focus:outline-none"
            >
              Clear dates
            </button>
            <button
              type="button"
              onClick={() => setIsDatePickerOpen(false)}
              className="px-6 py-2 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-xl transition focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleReserveClick}
        className="w-full py-3.5 bg-gradient-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] hover:brightness-95 text-white font-semibold text-base rounded-xl shadow-md transition transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black"
      >
        Reserve
      </button>

      {statusMessage && <p className="text-center text-xs text-gray-600 font-medium">{statusMessage}</p>}

      <p className="text-center text-xs text-gray-500 font-normal">You won't be charged yet</p>

      <div className="space-y-3 text-sm text-gray-700 pt-2 border-t border-gray-200 font-normal">
        <div className="flex items-center justify-between">
          <span className="underline cursor-pointer">
            ₹{pricePerNight.toLocaleString('en-IN')} x {nightsCount} nights
          </span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="underline cursor-pointer">Cleaning fee</span>
          <span>₹{cleaningFee.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="underline cursor-pointer">Airbnb service fee</span>
          <span>₹{serviceFee.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-base font-bold text-gray-900 pt-4 border-t border-gray-200">
        <span>Total before taxes</span>
        <span>₹{totalPrice.toLocaleString('en-IN')}</span>
      </div>

      <div className="text-xs text-gray-500 leading-relaxed">
        <p>{bookingSummary}</p>
      </div>

      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={() => setIsReportOpen(true)}
          className="inline-flex items-center gap-2 text-xs text-gray-500 font-semibold hover:text-gray-900 underline focus:outline-none"
        >
          <Flag className="w-3.5 h-3.5" />
          <span>Report this listing</span>
        </button>
      </div>

      <BaseModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        title="Report this listing"
        maxWidthClass="max-w-2xl"
      >
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <p className="text-sm text-gray-600">
              This is a frontend-only demo. Reports are stored locally in your browser for the listing
              {` `}{listingTitle}.
            </p>
            <p className="text-sm font-semibold text-gray-900 mt-2">{recentReports.length} local report(s) saved</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Reason
              </label>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option>Incorrect listing details</option>
                <option>Safety concern</option>
                <option>Host communication issue</option>
                <option>Accessibility issue</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Details
              </label>
              <textarea
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                rows={5}
                placeholder="Tell us what happened"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Contact email
              </label>
              <input
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {reportStatusMessage && <p className="text-sm font-medium text-gray-600">{reportStatusMessage}</p>}

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500">
              Your report will stay on this device only, so you can review it later in the demo.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsReportOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-black"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitReport}
                className="px-5 py-2.5 rounded-xl bg-black text-white text-sm font-semibold hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-black"
              >
                Save report
              </button>
            </div>
          </div>

          {recentReports.length > 0 && (
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Recent local reports</h3>
              <div className="space-y-2">
                {recentReports.slice(0, 3).map((report) => (
                  <div key={report.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <div className="text-sm font-semibold text-gray-900">{report.reason}</div>
                    <p className="text-xs text-gray-500 mt-1">{report.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </BaseModal>
    </div>
  );
});
