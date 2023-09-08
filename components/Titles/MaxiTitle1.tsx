import React from 'react';

interface IProps {
  children: string;
  className?: string;
}

function MaxiTitle1({ children, className }: IProps) {
  return (
    <h2
      className={`text-black-1 text-base font-semibold leading-[1.25rem] tracking-wide ${className}`}
    >
      {children}
    </h2>
  );
}

export default MaxiTitle1;
