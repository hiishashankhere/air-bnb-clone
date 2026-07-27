import {
  addMonths,
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isAfter,
  isBefore,
  isSameDay,
  isWithinInterval,
  startOfDay,
  subMonths,
} from 'date-fns';

export { addMonths, format, subMonths };

export interface MonthData {
  year: number;
  monthIndex: number; // 0-indexed (0 = Jan, 9 = Oct)
  name: string;
  days: Date[];
  startDayOfWeek: number; // 0 = Sun, 1 = Mon ...
}

export function getMonthData(year: number, monthIndex: number): MonthData {
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const lastDayOfMonth = endOfMonth(firstDayOfMonth);

  const days = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  return {
    year,
    monthIndex,
    name: format(firstDayOfMonth, 'MMMM yyyy'),
    days,
    startDayOfWeek: getDay(firstDayOfMonth),
  };
}

export function isDateDisabled(date: Date, minDate: Date = startOfDay(new Date())): boolean {
  return isBefore(startOfDay(date), startOfDay(minDate));
}

export function isRangeStart(date: Date, checkIn: Date | null): boolean {
  if (!checkIn) return false;
  return isSameDay(date, checkIn);
}

export function isRangeEnd(date: Date, checkOut: Date | null): boolean {
  if (!checkOut) return false;
  return isSameDay(date, checkOut);
}

export function isDateInRange(
  date: Date,
  checkIn: Date | null,
  checkOut: Date | null
): boolean {
  if (!checkIn || !checkOut) return false;
  if (isSameDay(checkIn, checkOut)) return false;
  const start = startOfDay(isBefore(checkIn, checkOut) ? checkIn : checkOut);
  const end = startOfDay(isAfter(checkIn, checkOut) ? checkOut : checkIn);
  const target = startOfDay(date);
  return isWithinInterval(target, { start, end }) && !isSameDay(target, start) && !isSameDay(target, end);
}

export function isDateInHoverPreview(
  date: Date,
  checkIn: Date | null,
  checkOut: Date | null,
  hoverDate: Date | null
): boolean {
  if (!checkIn || checkOut || !hoverDate) return false;
  const start = startOfDay(checkIn);
  const end = startOfDay(hoverDate);
  const target = startOfDay(date);
  if (!isAfter(end, start)) return false;

  return (
    isWithinInterval(target, { start, end }) &&
    !isSameDay(target, start) &&
    !isSameDay(target, end)
  );
}

export function calculateNights(checkIn: Date | null, checkOut: Date | null): number {
  if (!checkIn || !checkOut) return 0;
  const diff = differenceInCalendarDays(checkOut, checkIn);
  return diff > 0 ? diff : 0;
}

export function formatDateRange(checkIn: Date | null, checkOut: Date | null): string {
  if (!checkIn && !checkOut) return 'Select check-in date';
  if (checkIn && !checkOut) return `${format(checkIn, 'dd MMM yyyy')} - Select checkout date`;
  if (checkIn && checkOut) {
    return `${format(checkIn, 'dd MMM yyyy')} - ${format(checkOut, 'dd MMM yyyy')}`;
  }
  return '';
}
