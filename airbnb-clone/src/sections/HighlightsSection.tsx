import { DoorOpen, UtensilsCrossed, Wind } from 'lucide-react';
import { memo } from 'react';
import { SectionContainer } from '../components/common/SectionContainer';

interface HighlightItem {
  icon: string;
  title: string;
  description: string;
}

interface HighlightsSectionProps {
  highlights: HighlightItem[];
}

export const HighlightsSection = memo(function HighlightsSection({ highlights }: HighlightsSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-gray-800 shrink-0" />;
      case 'Wind':
        return <Wind className="w-6 h-6 text-gray-800 shrink-0" />;
      case 'KeyRound':
      case 'DoorOpen':
        return <DoorOpen className="w-6 h-6 text-gray-800 shrink-0" />;
      default:
        return <UtensilsCrossed className="w-6 h-6 text-gray-800 shrink-0" />;
    }
  };

  return (
    <SectionContainer className="space-y-6">
      {highlights.map((item, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="pt-0.5">{getIcon(item.icon)}</div>
          <div>
            <h3 className="font-semibold text-gray-900 text-base">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
          </div>
        </div>
      ))}
    </SectionContainer>
  );
});

