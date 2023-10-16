import React, { SyntheticEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import PasswordInput from '../components/PasswordInput';
import useAuth from '../hooks/useAuth';
import { IUserScope, IUser } from '../utils/types';
import useThrottle from '../hooks/useThrottle';
import useOnKeyPress from '../hooks/useOnKeyPress';
import { msIntervalBetweenCalls } from '../utils/constants';
import Button from '../components/Button';

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

  const { throttledCallback: throttledSubmit } = useThrottle({
    ms: msIntervalBetweenCalls,
    callback: handleSubmit,
  });

  useOnKeyPress({ keyName: 'Enter', callback: throttledSubmit });

  return (
    <div className="mt-navbar mb-[40%] p-3">
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-col gap-y-1.5 w-fit border-primary-300 border-2 rounded-md py-3 px-2 items-start h-fit">
        <h1 className="text-xl">Log in</h1>

        <div>
          <input
            name="email"
            type="text"
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

        <Button
          handleOnClick={throttledSubmit}
          width="150px"
          showSpinner={isLoading}
        >
          Submit
        </Button>
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-primary-300 leading-5">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default LogIn;
