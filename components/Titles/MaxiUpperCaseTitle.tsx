import React from 'react';

interface IProps {
  children: string;
  className?: string;
}

function MaxiUpperCaseTitle({ children, className }: IProps) {
  return (
    <h2
      className={`text-primary-300 text-wl font-bold uppercase tracking-wide leading-[1.5rem] ${className}`}
    >
      {children}
    </h2>
  );
}

export default MaxiUpperCaseTitle;
