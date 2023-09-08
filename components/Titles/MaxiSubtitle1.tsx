import React from 'react';

interface IProps {
  children: string;
  className?: string;
}

function MaxiSubtitle1({ children, className }: IProps) {
  return (
    <p
      className={`text-[#777] text-sm font-normal leading-[1.0625rem] ${className}`}
    >
      {children}
    </p>
  );
}

export default MaxiSubtitle1;
