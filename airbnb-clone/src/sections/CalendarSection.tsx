import { memo } from 'react';
import { Calendar } from '../components/calendar/Calendar';
import { SectionContainer } from '../components/common/SectionContainer';

interface CalendarSectionProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onSelectDates: (checkIn: Date | null, checkOut: Date | null) => void;
  onClearDates: () => void;
  locationName?: string;
}

export const CalendarSection = memo(function CalendarSection({
  checkIn,
  checkOut,
  onSelectDates,
  onClearDates,
  locationName = 'Candolim',
}: CalendarSectionProps) {
  return (
    <SectionContainer>
      <Calendar
        checkIn={checkIn}
        checkOut={checkOut}
        onSelectDates={onSelectDates}
        onClearDates={onClearDates}
        locationName={locationName}
      />
    </SectionContainer>
  );
});
