import type { ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
  hasDivider?: boolean;
}

export function SectionContainer({
  children,
  className = '',
  id,
  hasDivider = true,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`py-8 sm:py-10 ${hasDivider ? 'border-b border-gray-200' : ''} ${className}`}
    >
      {children}
    </section>
  );
}
