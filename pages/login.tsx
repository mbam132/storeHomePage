import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PasswordInput from '../components/PasswordInput';
import useAuth from '../hooks/useAuth';
import useOnKeyPress from '../hooks/useOnKeyPress';
import { IUserScope, IUser } from '../utils/types';

function LogIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  const handleInputValueChange = (event) => {
    setErrorMessage('');
    setInputValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (inputValues.email === '' || inputValues.password === '') {
      setErrorMessage('All fields have to have a value');
      return;
    }
    setIsLoading(true);

    try {
      const loggedInUser: IUser = await login(
        inputValues.email,
        inputValues.password
      );

      setIsLoading(false);
      console.log('the user was successfully logged in');
      if (loggedInUser.authScope === IUserScope.SUPERUSER) {
        router.push('/experimenting');
      } else {
        router.push('tasks-menu');
      }
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
      setErrorMessage('There was an error login in');
    }
  };

  useOnKeyPress({
    keyName: 'Enter',
    callback: handleSubmit,
  });

  return (
    <div className="mt-navbar mb-[40%] p-3">
      <div className="flex flex-col gap-y-2.5">
        <h1 className="text-2xl">Log in</h1>

        <div>
          <input
            name="email"
            value={inputValues.email}
            onChange={handleInputValueChange}
            placeholder="Email"
            className="w-[150px] p-1.5 border-gray-300 border-2 focus:border-primary-300 focus:outline-none rounded-md"
          />
        </div>

        <PasswordInput
          setValue={handleInputValueChange}
          value={inputValues.password}
        />

        <div className="flex items-center gap-x-2">
          <button
            onClick={handleSubmit}
            className="w-fit p-1.5 bg-primary-300 rounded-md"
            type="button"
          >
            Submit
          </button>
          {isLoading && <div className="loading-spinner" />}
        </div>

        {errorMessage !== '' && (
          <p className="mt-1 text-sm text-primary-300">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default LogIn;
