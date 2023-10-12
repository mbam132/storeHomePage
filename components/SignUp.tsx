import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import GQLClient from '../services/GQLClient';
import useAuth from '../hooks/useAuth';
import useOnKeyPress from '../hooks/useOnKeyPress';

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

  useOnKeyPress({
    keyName: 'Enter',
    callback: handleSubmit,
  });

  if (userCreated) {
    return (
      <div className="p-3">
        <h1 className="text-primary-300 text-xl">
          The user was successfuly created
        </h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2.5">
      <h1 className="text-2xl">Sign up</h1>

      <div>
        <input
          name="name"
          value={inputValues.name}
          onChange={handleInputValueChange}
          placeholder="Name"
          className="w-[150px] p-1.5 border-gray-300 border-2 focus:border-primary-300 focus:outline-none rounded-md "
        />
      </div>

      <div>
        <input
          name="email"
          value={inputValues.email}
          onChange={handleInputValueChange}
          placeholder="Email"
          className="w-[150px] p-1.5 border-gray-300 border-2 focus:border-primary-300 focus:outline-none rounded-md "
        />
      </div>

      <PasswordInput
        setValue={handleInputValueChange}
        value={inputValues.password}
      />

      <div className="flex items-center gap-x-2">
        <button
          onClick={handleSubmit}
          disabled={errorMessage !== ''}
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
  );
}

export default SignUp;
