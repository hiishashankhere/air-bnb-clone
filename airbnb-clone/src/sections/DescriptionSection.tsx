import { ChevronRight, Languages } from 'lucide-react';
import { memo, useState } from 'react';
import { SectionContainer } from '../components/common/SectionContainer';

interface DescriptionSectionProps {
  description: string;
}

export const DescriptionSection = memo(function DescriptionSection({ description }: DescriptionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SectionContainer>
      {/* Translation disclaimer */}
      <div className="flex items-center gap-2 text-sm text-gray-700 mb-4 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
        <Languages className="w-4 h-4 text-gray-500 shrink-0" />
        <span>
          Some info has been automatically translated.{' '}
          <button className="font-semibold underline hover:text-black focus:outline-none">Show original</button>
        </span>
      </div>

      {/* Description text */}
      <p className={`text-base text-gray-800 leading-relaxed font-normal ${!isExpanded ? 'line-clamp-3' : ''}`}>
        {description}
      </p>

      {/* Show more button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 flex items-center gap-1 font-semibold text-gray-900 underline hover:text-gray-700 focus:outline-none"
      >
        <span>{isExpanded ? 'Show less' : 'Show more'}</span>
        <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </button>
    </SectionContainer>
  );
});

