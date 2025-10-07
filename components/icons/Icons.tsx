
import React from 'react';

const iconClass = "h-5 w-5 text-gray-400";

export const CarIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
  </svg>
);

export const TrackIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor">
    <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
  </svg>
);

export const StyleIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 011-1h.5a1.5 1.5 0 000-3H6a1 1 0 01-1-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
  </svg>
);

export const SparklesIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 2a1 1 0 00-1 1v1.586l-1.707 1.707A1 1 0 003 8v4a1 1 0 001 1h1.586l1.707 1.707A1 1 0 009 16h2a1 1 0 00.707-.293L13.414 14H15a1 1 0 001-1V9a1 1 0 00-1-1h-1.586l-1.707-1.707A1 1 0 009 4H7a1 1 0 00-1-1V2a1 1 0 00-1-1zm10 2.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zM15 10a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5z" clipRule="evenodd" />
    </svg>
);
