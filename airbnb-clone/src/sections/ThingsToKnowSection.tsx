import { CalendarX, ChevronRight, KeyRound, ShieldAlert } from 'lucide-react';
import { memo } from 'react';
import { SectionContainer } from '../components/common/SectionContainer';

interface ThingsToKnowSectionProps {
  cancellationPolicy: string;
  houseRules: string[];
  safetyProperty: string[];
}

export const ThingsToKnowSection = memo(function ThingsToKnowSection({
  cancellationPolicy,
  houseRules,
  safetyProperty,
}: ThingsToKnowSectionProps) {
  return (
    <SectionContainer>
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Things to know</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cancellation Policy */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-semibold text-gray-900 text-base">
            <CalendarX className="w-5 h-5 text-gray-800 shrink-0" />
            <h3>Cancellation policy</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed font-normal">{cancellationPolicy}</p>
          <button className="flex items-center gap-1 text-sm font-semibold text-gray-900 underline hover:text-gray-700 focus:outline-none">
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* House Rules */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-semibold text-gray-900 text-base">
            <KeyRound className="w-5 h-5 text-gray-800 shrink-0" />
            <h3>House rules</h3>
          </div>
          <ul className="text-sm text-gray-700 space-y-1.5 font-normal">
            {houseRules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
          <button className="flex items-center gap-1 text-sm font-semibold text-gray-900 underline hover:text-gray-700 pt-1 focus:outline-none">
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Safety & Property */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-semibold text-gray-900 text-base">
            <ShieldAlert className="w-5 h-5 text-gray-800 shrink-0" />
            <h3>Safety & property</h3>
          </div>
          <ul className="text-sm text-gray-700 space-y-1.5 font-normal">
            {safetyProperty.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <button className="flex items-center gap-1 text-sm font-semibold text-gray-900 underline hover:text-gray-700 pt-1 focus:outline-none">
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </SectionContainer>
  );
});

