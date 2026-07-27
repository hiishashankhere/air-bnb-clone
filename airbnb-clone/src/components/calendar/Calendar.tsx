import { isAfter, isBefore, isSameDay, startOfDay, startOfMonth } from 'date-fns';
import { Keyboard } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import {
  addMonths,
  calculateNights,
  formatDateRange,
  getMonthData,
  subMonths,
} from '../../utils/dateUtils';
import { CalendarDay } from './CalendarDay';
import { CalendarHeader } from './CalendarHeader';

interface CalendarProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onSelectDates: (checkIn: Date | null, checkOut: Date | null) => void;
  onClearDates: () => void;
  locationName?: string;
}

export function Calendar({
  checkIn,
  checkOut,
  onSelectDates,
  onClearDates,
  locationName = 'Candolim',
}: CalendarProps) {
  // Current month state (default to current month or checkIn month)
  const currentToday = useMemo(() => new Date(), []);
  const initialBaseMonth = useMemo(
    () => (checkIn ? startOfMonth(checkIn) : startOfMonth(currentToday)),
    [checkIn, currentToday]
  );

  const [currentBaseMonth, setCurrentBaseMonth] = useState<Date>(initialBaseMonth);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  // Month navigation logic
  const minMonth = useMemo(() => startOfMonth(currentToday), [currentToday]);
  const canNavigatePrev = useMemo(
    () => isAfter(currentBaseMonth, minMonth),
    [currentBaseMonth, minMonth]
  );

  const handlePrevMonth = useCallback(() => {
    if (canNavigatePrev) {
      setCurrentBaseMonth((prev) => subMonths(prev, 1));
    }
  }, [canNavigatePrev]);

  const handleNextMonth = useCallback(() => {
    setCurrentBaseMonth((prev) => addMonths(prev, 1));
  }, []);

  // Calculate left and right month data
  const leftMonthData = useMemo(
    () => getMonthData(currentBaseMonth.getFullYear(), currentBaseMonth.getMonth()),
    [currentBaseMonth]
  );

  const rightBaseMonth = useMemo(() => addMonths(currentBaseMonth, 1), [currentBaseMonth]);
  const rightMonthData = useMemo(
    () => getMonthData(rightBaseMonth.getFullYear(), rightBaseMonth.getMonth()),
    [rightBaseMonth]
  );

  // Date selection logic
  const handleSelectDate = useCallback(
    (date: Date) => {
      // 1. If no checkIn or both checkIn & checkOut are already selected, start a new checkIn
      if (!checkIn || (checkIn && checkOut)) {
        onSelectDates(date, null);
        return;
      }

      // 2. If checkIn is selected but no checkOut yet
      if (checkIn && !checkOut) {
        const targetDate = date;

        if (isBefore(startOfDay(targetDate), startOfDay(checkIn))) {
          // If clicked date is before checkIn, update checkIn to clicked date
          onSelectDates(targetDate, null);
        } else if (isSameDay(targetDate, checkIn)) {
          // Clicking checkIn date again clears dates
          onSelectDates(null, null);
        } else {
          // Valid checkout date
          onSelectDates(checkIn, targetDate);
        }
      }
    },
    [checkIn, checkOut, onSelectDates]
  );

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const nightsCount = calculateNights(checkIn, checkOut);
  const dateRangeText = formatDateRange(checkIn, checkOut);

  return (
    <div className="w-full">
      {/* Dynamic Title Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {nightsCount > 0
            ? `${nightsCount} night${nightsCount > 1 ? 's' : ''} in ${locationName}`
            : `Select dates in ${locationName}`}
        </h2>
        <p className="text-sm text-gray-500 font-normal mt-1">{dateRangeText}</p>
      </div>

      {/* Main 2-Month Calendar Container */}
      <div className="bg-white border border-gray-200 rounded-3xl p-4 sm:p-8 shadow-airbnb-card">
        {/* Navigation Header */}
        <CalendarHeader
          leftMonthName={leftMonthData.name}
          rightMonthName={rightMonthData.name}
          canNavigatePrev={canNavigatePrev}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        {/* 2 Month Side-by-Side Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Month */}
          <div>
            <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-500 mb-3">
              {daysOfWeek.map((day, idx) => (
                <div key={idx} className="py-1">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 text-center text-sm gap-y-1">
              {/* Empty leading slots for weekday alignment */}
              {Array.from({ length: leftMonthData.startDayOfWeek }).map((_, i) => (
                <div key={`empty-left-${i}`} />
              ))}
              {leftMonthData.days.map((date) => (
                <CalendarDay
                  key={date.toISOString()}
                  date={date}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  hoverDate={hoverDate}
                  onSelectDate={handleSelectDate}
                  onHoverDate={setHoverDate}
                />
              ))}
            </div>
          </div>

          {/* Right Month (Hidden on small mobile, visible on MD+) */}
          <div className="hidden md:block">
            <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-500 mb-3">
              {daysOfWeek.map((day, idx) => (
                <div key={idx} className="py-1">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 text-center text-sm gap-y-1">
              {Array.from({ length: rightMonthData.startDayOfWeek }).map((_, i) => (
                <div key={`empty-right-${i}`} />
              ))}
              {rightMonthData.days.map((date) => (
                <CalendarDay
                  key={date.toISOString()}
                  date={date}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  hoverDate={hoverDate}
                  onSelectDate={handleSelectDate}
                  onHoverDate={setHoverDate}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions: Keyboard & Clear Dates */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Keyboard shortcuts"
          >
            <Keyboard className="w-5 h-5 text-gray-800" />
          </button>

          <button
            onClick={onClearDates}
            className="font-semibold text-gray-900 underline hover:text-gray-700 focus:outline-none"
          >
            Clear dates
          </button>
        </div>
      </div>
    </div>
  );
}
