import React, { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';

function PasswordInput({ label, value, setValue }) {
  const [show, setShow] = useState(false);

  const toggleShowingPassword = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className="border-none w-fit flex items-center">
      <label>{label}</label>
      <div className="flex ml-2">
        <input
          name="password"
          placeholder="Password"
          type={show ? 'text' : 'password'}
          value={value}
          onChange={setValue}
          autoComplete="off"
          className="w-[150px] p-1.5 border-gray-300 border-2 focus:border-primary-300 focus:outline-none"
        />
        <button
          className="flex items-center	pl-1.5"
          onClick={toggleShowingPassword}
          type="button"
        >
          {show ? (
            <BiHide className="w-[16px] h-[16px]" />
          ) : (
            <BiShow className="w-[16px] h-[16px]" />
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
