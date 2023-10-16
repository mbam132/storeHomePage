import React, { useState } from 'react';
import Link from 'next/link';
import PasswordInput from './PasswordInput';
import useAuth from '../hooks/useAuth';
import useThrottle from '../hooks/useThrottle';
import useOnKeyPress from '../hooks/useOnKeyPress';
import { msIntervalBetweenCalls } from '../utils/constants';
import Button from './Button';

const inputWidth: string = '150px';

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const secondsToShowSuccessMessage = 30;

  const [userCreated, setUserCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputValues, setInputValues] = useState({
    name: '',
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
    if (
      inputValues.name === '' ||
      inputValues.email === '' ||
      inputValues.password === ''
    ) {
      setErrorMessage('All fields have to have a value');
      return;
    }

    setIsLoading(true);

    let createdUser;
    try {
      createdUser = await signUp(
        inputValues.email,
        inputValues.password,
        inputValues.name
      );
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }

    if (createdUser.email) {
      setUserCreated(true);
      setInputValues({ name: '', email: '', password: '' });

      setTimeout(() => {
        setUserCreated(false);
      }, secondsToShowSuccessMessage * 1000);
    }
  };

  const { throttledCallback: throttledHandleSubmit } = useThrottle({
    ms: msIntervalBetweenCalls,
    callback: handleSubmit,
  });

  useOnKeyPress({ keyName: 'Enter', callback: throttledHandleSubmit });

  if (userCreated) {
    return (
      <div className="p-3">
        <h1 className="text-primary-300 text-xl">
          The user was successfuly created
        </h1>
        <div className="mt-0.5">
          <Link href="/login" className="underline text-[#0E467A]	">
            Login page
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col gap-y-1.5 w-fit border-primary-300 border-2 rounded-md py-3 px-2 items-start h-fit">
        <h1 className="text-xl">Sign up</h1>

        <div>
          <input
            name="name"
            value={inputValues.name}
            onChange={handleInputValueChange}
            placeholder="Name"
            className={`w-[${inputWidth}] p-1.5 border-gray-300 border-2 focus:border-primary-300 focus:outline-none rounded-md`}
          />
        </div>

        <div>
          <input
            name="email"
            value={inputValues.email}
            onChange={handleInputValueChange}
            placeholder="Email"
            className={`w-[${inputWidth}] p-1.5 border-gray-300 border-2 focus:border-primary-300 focus:outline-none rounded-md`}
          />
        </div>

        <PasswordInput
          setValue={handleInputValueChange}
          value={inputValues.password}
          inputWidth={inputWidth}
        />

        <Button
          handleOnClick={throttledHandleSubmit}
          disabled={errorMessage !== ''}
          showSpinner={isLoading}
          width={inputWidth}
        >
          Submit
        </Button>
      </div>
      {errorMessage !== '' && (
        <p className="mt-1 text-sm text-primary-300">{errorMessage}</p>
      )}
    </div>
  );
}

export default SignUp;
