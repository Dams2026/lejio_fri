import React from 'react';

type AutofiqLogoProps = {
  className?: string;
  iconClassName?: string;
  showWordmark?: boolean;
  alt?: string;
};

export function AutofiqLogo({
  className = '',
  iconClassName = '',
  showWordmark = false,
  alt = 'Autofiq logo',
}: AutofiqLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <img
        src="/autofiq-logo.svg"
        alt={alt}
        className={iconClassName || (showWordmark ? 'h-12 w-auto' : 'h-10 w-10 rounded-xl')}
      />
      {showWordmark && (
        <span className="text-xl font-bold bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
          AUTOFIQ
        </span>
      )}
    </div>
  );
}
