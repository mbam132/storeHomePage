import React from 'react';

interface IProps {
  children: string;
  className?: string;
}

function MaxiRedTitle({ children, className }: IProps) {
  return (
    <h2
      className={`text-primary-300 text-lg font-semibold leading-[1.375rem] ${className}`}
    >
      {children}
    </h2>
  );
}

export default MaxiRedTitle;
