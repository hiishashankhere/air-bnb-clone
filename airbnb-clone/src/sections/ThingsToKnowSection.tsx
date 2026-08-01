import { CalendarX, ChevronRight, KeyRound, ShieldAlert } from 'lucide-react';
import { memo, useState } from 'react';
import { BaseModal } from '../components/common/BaseModal';
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
  const [activeTopic, setActiveTopic] = useState<'cancellation' | 'rules' | 'safety' | null>(null);

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
          <button
            type="button"
            onClick={() => setActiveTopic('cancellation')}
            className="flex items-center gap-1 text-sm font-semibold text-gray-900 underline hover:text-gray-700 focus:outline-none"
          >
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
          <button
            type="button"
            onClick={() => setActiveTopic('rules')}
            className="flex items-center gap-1 text-sm font-semibold text-gray-900 underline hover:text-gray-700 pt-1 focus:outline-none"
          >
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
          <button
            type="button"
            onClick={() => setActiveTopic('safety')}
            className="flex items-center gap-1 text-sm font-semibold text-gray-900 underline hover:text-gray-700 pt-1 focus:outline-none"
          >
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <BaseModal
        isOpen={activeTopic !== null}
        onClose={() => setActiveTopic(null)}
        title="Learn more"
        maxWidthClass="max-w-2xl"
      >
        <div className="p-6 sm:p-8 space-y-4">
          {activeTopic === 'cancellation' && (
            <>
              <h3 className="text-lg font-semibold text-gray-900">Cancellation policy</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{cancellationPolicy}</p>
              <p className="text-xs text-gray-500">
                In the demo, this copy is static and fully frontend-driven.
              </p>
            </>
          )}

          {activeTopic === 'rules' && (
            <>
              <h3 className="text-lg font-semibold text-gray-900">House rules</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                {houseRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
              <p className="text-xs text-gray-500">
                These rules are stored as part of the mock listing data for this assignment.
              </p>
            </>
          )}

          {activeTopic === 'safety' && (
            <>
              <h3 className="text-lg font-semibold text-gray-900">Safety & property</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                {safetyProperty.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-xs text-gray-500">
                The safety details are demo content and do not come from a backend source.
              </p>
            </>
          )}
        </div>
      </BaseModal>
    </SectionContainer>
  );
});
