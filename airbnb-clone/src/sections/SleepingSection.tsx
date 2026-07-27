import { memo } from 'react';
import { SectionContainer } from '../components/common/SectionContainer';
import type { SleepingArrangement } from '../types/listing';

interface SleepingSectionProps {
  arrangements: SleepingArrangement[];
}

export const SleepingSection = memo(function SleepingSection({ arrangements }: SleepingSectionProps) {
  return (
    <SectionContainer>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Where you'll sleep</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {arrangements.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-2xl overflow-hidden shadow-airbnb-card hover:shadow-airbnb transition"
          >
            <div className="h-56 overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-gray-900 text-base">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
});

