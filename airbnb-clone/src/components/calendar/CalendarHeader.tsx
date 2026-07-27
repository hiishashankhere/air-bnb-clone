import { ChevronLeft, ChevronRight } from 'lucide-react';
import { memo } from 'react';

interface CalendarHeaderProps {
  leftMonthName: string;
  rightMonthName: string;
  canNavigatePrev: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarHeader = memo(function CalendarHeader({
  leftMonthName,
  rightMonthName,
  canNavigatePrev,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 px-2">
      {/* Previous Month Navigation Button (Disabled if viewing current month) */}
      <button
        onClick={onPrevMonth}
        disabled={!canNavigatePrev}
        aria-label="Previous month"
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed transition text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
      >
        <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* 2 Month Titles */}
      <div className="flex gap-16 font-bold text-gray-900 text-base sm:text-lg">
        <span className="w-56 text-center">{leftMonthName}</span>
        <span className="w-56 text-center hidden md:inline">{rightMonthName}</span>
      </div>

      {/* Next Month Navigation Button */}
      <button
        onClick={onNextMonth}
        aria-label="Next month"
        className="p-2 rounded-full hover:bg-gray-100 transition text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
      >
        <ChevronRight className="w-5 h-5 stroke-[2.5]" />
      </button>
    </div>
  );
});
