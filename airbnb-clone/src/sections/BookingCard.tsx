import { format } from 'date-fns';
import { ChevronDown, Flag, Star } from 'lucide-react';
import { memo, useState } from 'react';
import { calculateNights } from '../utils/dateUtils';

interface BookingCardProps {
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  cleaningFee: number;
  serviceFee: number;
  checkIn: Date | null;
  checkOut: Date | null;
  onClearDates?: () => void;
}

export const BookingCard = memo(function BookingCard({
  pricePerNight,
  rating,
  reviewsCount,
  cleaningFee,
  serviceFee,
  checkIn,
  checkOut,
}: BookingCardProps) {
  const [guests, setGuests] = useState(1);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);

  // Dynamic night count calculation (fallback to default 5 nights if unselected)
  const actualNights = calculateNights(checkIn, checkOut);
  const nightsCount = actualNights > 0 ? actualNights : 5;

  const subtotal = pricePerNight * nightsCount;
  const totalPrice = subtotal + cleaningFee + serviceFee;

  const checkInText = checkIn ? format(checkIn, 'dd/MM/yyyy') : 'Add date';
  const checkOutText = checkOut ? format(checkOut, 'dd/MM/yyyy') : 'Add date';

  return (
    <div className="sticky top-28 w-full bg-white border border-gray-200 rounded-3xl p-6 shadow-airbnb-card space-y-6">
      {/* Price Header */}
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-extrabold text-gray-900">
            ₹{pricePerNight.toLocaleString('en-IN')}
          </span>
          <span className="text-base text-gray-600 font-normal"> / night</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-gray-900">
          <Star className="w-3.5 h-3.5 fill-current text-gray-900" />
          <span>{rating.toFixed(2)}</span>
          <span className="text-gray-400">·</span>
          <span className="underline text-gray-500">{reviewsCount} reviews</span>
        </div>
      </div>

      {/* Date & Guest Picker Box */}
      <div className="border border-gray-400 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-black">
        {/* Dates Row */}
        <div className="grid grid-cols-2 border-b border-gray-400">
          <div
            tabIndex={0}
            role="button"
            className="p-3 border-r border-gray-400 cursor-pointer hover:bg-gray-50 focus:outline-none"
          >
            <span className="block text-[10px] font-extrabold text-gray-800 uppercase tracking-wider">
              CHECK-IN
            </span>
            <span className="text-xs text-gray-800 font-semibold">{checkInText}</span>
          </div>
          <div
            tabIndex={0}
            role="button"
            className="p-3 cursor-pointer hover:bg-gray-50 focus:outline-none"
          >
            <span className="block text-[10px] font-extrabold text-gray-800 uppercase tracking-wider">
              CHECKOUT
            </span>
            <span className="text-xs text-gray-800 font-semibold">{checkOutText}</span>
          </div>
        </div>

        {/* Guests Dropdown Row */}
        <div className="relative">
          <div
            onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsGuestDropdownOpen(!isGuestDropdownOpen);
              }
            }}
            tabIndex={0}
            role="button"
            aria-expanded={isGuestDropdownOpen}
            aria-label="Guests selector"
            className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 focus:outline-none"
          >
            <div>
              <span className="block text-[10px] font-extrabold text-gray-800 uppercase tracking-wider">
                GUESTS
              </span>
              <span className="text-xs text-gray-800 font-medium">{guests} guest</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-700 transition-transform ${
                isGuestDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </div>

          {/* Guest Selector Popover */}
          {isGuestDropdownOpen && (
            <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border border-gray-200 rounded-2xl shadow-airbnb-modal p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-900">Guests</div>
                  <div className="text-xs text-gray-500">Maximum 3 guests</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    disabled={guests <= 1}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-700 hover:border-gray-900 disabled:opacity-30 transition focus:outline-none focus:ring-2 focus:ring-black"
                    aria-label="Decrease guest count"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-gray-900">{guests}</span>
                  <button
                    onClick={() => setGuests((g) => Math.min(3, g + 1))}
                    disabled={guests >= 3}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-700 hover:border-gray-900 disabled:opacity-30 transition focus:outline-none focus:ring-2 focus:ring-black"
                    aria-label="Increase guest count"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => setIsGuestDropdownOpen(false)}
                className="w-full text-right text-xs font-semibold text-gray-900 underline pt-2 hover:text-gray-700 focus:outline-none"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Gradient Reserve Button */}
      <button className="w-full py-3.5 bg-gradient-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] hover:brightness-95 text-white font-semibold text-base rounded-xl shadow-md transition transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black">
        Reserve
      </button>

      <p className="text-center text-xs text-gray-500 font-normal">You won't be charged yet</p>

      {/* Price Breakdown Calculation */}
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

      {/* Total Price Row */}
      <div className="flex items-center justify-between text-base font-bold text-gray-900 pt-4 border-t border-gray-200">
        <span>Total before taxes</span>
        <span>₹{totalPrice.toLocaleString('en-IN')}</span>
      </div>

      {/* Report Listing Action */}
      <div className="pt-2 text-center">
        <button className="inline-flex items-center gap-2 text-xs text-gray-500 font-semibold hover:text-gray-900 underline focus:outline-none">
          <Flag className="w-3.5 h-3.5" />
          <span>Report this listing</span>
        </button>
      </div>
    </div>
  );
});
