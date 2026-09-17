import React from 'react';
import { CLUB_IMAGES } from '../data/teamData';

interface CrestProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showImageDirect?: boolean;
}

export const OfficialCrest: React.FC<CrestProps> = ({ 
  className = '', 
  size = 'md',
  showImageDirect = true 
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-44 h-44 sm:w-52 sm:h-52',
  }[size];

  if (showImageDirect) {
    return (
      <div className={`relative shrink-0 flex items-center justify-center ${sizeClasses} ${className}`}>
        <img
          src={CLUB_IMAGES.crest}
          alt="Escudo Oficial Las Winx FC"
          className="w-full h-full object-contain filter drop-shadow-md"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`relative shrink-0 flex items-center justify-center ${sizeClasses} ${className}`}>
      <img
        src={CLUB_IMAGES.crest}
        alt="Escudo Oficial Las Winx FC"
        className="w-full h-full object-contain filter drop-shadow-md"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
