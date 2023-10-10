import React, { useState, useRef, useEffect } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

interface IProps {
  placeHolder: string;
  options: string[];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

function SelectList({
  placeHolder,
  options,
  selectedOption,
  setSelectedOption,
}: IProps) {
  const listRef = useRef(null);
  const [displayList, setDisplayList] = useState(false);

  const toggleDisplayList = () => {
    setDisplayList((prev) => !prev);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setDisplayList(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setDisplayList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [listRef]);

  return (
    <div className="relative">
      <div
        className={`${
          displayList
            ? 'border-primary-300 border-2'
            : 'border-gray-300 border-2'
        } w-fit	p-1 flex items-center	cursor-pointer`}
        onClick={toggleDisplayList}
        onKeyDown={() => {}}
        role="presentation"
      >
        <span>{!selectedOption ? placeHolder : selectedOption}</span>
        <RiArrowDownSLine className="w-[24px] h-[24px]" />
      </div>
      {displayList && (
        <div
          className="w-fit absolute	top-[19px] left-[14px] bg-white flex flex-col"
          ref={listRef}
        >
          {options.map((option) => (
            <button
              className="cursor-pointer p-[6px] hover:bg-primary-300"
              onClick={() => {
                selectOption(option);
              }}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectList;
