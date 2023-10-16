import React from 'react';

interface IProps {
  showSpinner: boolean;
  handleOnClick: (event: React.MouseEvent<HTMLElement>) => void;
  width: string;
  children: string;
  disabled?: boolean;
}

function Button({
  showSpinner,
  handleOnClick,
  width,
  children,
  disabled = false,
}: IProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`w-[${width}] bg-primary-300 rounded-md p-1.5 flex relative justify-center`}
      onClick={handleOnClick}
    >
      <span>{children}</span>
      {showSpinner && (
        <div className="loading-spinner white-spinner absolute right-[0.6rem]" />
      )}
    </button>
  );
}

export default Button;
