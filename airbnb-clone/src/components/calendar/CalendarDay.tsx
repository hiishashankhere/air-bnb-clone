import { isAfter, startOfDay } from 'date-fns';
import { memo } from 'react';
import {
  isDateDisabled,
  isDateInRange,
  isDateInHoverPreview,
  isRangeEnd,
  isRangeStart,
} from '../../utils/dateUtils';

interface CalendarDayProps {
  date: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  hoverDate: Date | null;
  onSelectDate: (date: Date) => void;
  onHoverDate: (date: Date | null) => void;
}

export const CalendarDay = memo(function CalendarDay({
  date,
  checkIn,
  checkOut,
  hoverDate,
  onSelectDate,
  onHoverDate,
}: CalendarDayProps) {
  const disabled = isDateDisabled(date);
  const isStart = isRangeStart(date, checkIn);
  const isEnd = isRangeEnd(date, checkOut);
  const isHoverEnd = !checkOut && hoverDate && isRangeEnd(date, hoverDate);
  const inRange = isDateInRange(date, checkIn, checkOut);
  const inHoverRange = isDateInHoverPreview(date, checkIn, checkOut, hoverDate);

  const dayNumber = date.getDate();

  if (disabled) {
    return (
      <div className="py-1 flex items-center justify-center">
        <span className="w-10 h-10 rounded-full flex items-center justify-center text-sm text-gray-300 font-normal line-through cursor-not-allowed select-none">
          {dayNumber}
        </span>
      </div>
    );
  }

  // Connection bar flags for range bounds
  const hasRangeEnd = checkOut || (hoverDate && isAfter(startOfDay(hoverDate), startOfDay(checkIn || new Date(0))));
  const showRightBar = isStart && hasRangeEnd;
  const showLeftBar = (isEnd || isHoverEnd) && checkIn;

  return (
    <div
      className="py-1 relative flex items-center justify-center w-full"
      onMouseEnter={() => onHoverDate(date)}
      onMouseLeave={() => onHoverDate(null)}
    >
      {/* Intermediate day background grey bar */}
      {(inRange || inHoverRange) && (
        <div className="absolute inset-y-1 inset-x-0 bg-gray-100" />
      )}

      {/* Start date right-half grey connection bar */}
      {showRightBar && (
        <div className="absolute inset-y-1 right-0 w-1/2 bg-gray-100" />
      )}

      {/* End date left-half grey connection bar */}
      {showLeftBar && (
        <div className="absolute inset-y-1 left-0 w-1/2 bg-gray-100" />
      )}

      <button
        onClick={() => onSelectDate(date)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelectDate(date);
          }
        }}
        tabIndex={0}
        aria-label={`${date.toDateString()}${isStart ? ', check-in date' : ''}${isEnd ? ', checkout date' : ''}`}
        aria-disabled={disabled}
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-black z-10 ${
          isStart || isEnd || isHoverEnd
            ? 'bg-black text-white font-bold shadow-md'
            : inRange || inHoverRange
            ? 'text-gray-900 font-bold hover:bg-gray-200'
            : 'text-gray-900 hover:bg-gray-200'
        }`}
      >
        {dayNumber}
      </button>
    </div>
  );
});
