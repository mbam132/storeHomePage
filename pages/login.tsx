import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PasswordInput from '../components/PasswordInput';
import useAuth from '../hooks/useAuth';

function LogIn() {
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

    try {
      await login(inputValues.email, inputValues.password);

      console.log('the user was successfully logged in');
      router.push('create-todo');
    } catch (error) {
      console.error(error.message);
      setErrorMessage('There was an error login in');
    }
  };

  return (
    <div className="mt-navbar mb-[40%]">
      <div className="p-3  flex flex-col gap-y-2.5">
        <h1 className="underline text-primary-300 text-xl">Log in</h1>

        <div>
          <label>Email</label>
          <input
            name="email"
            value={inputValues.email}
            onChange={handleInputValueChange}
            placeholder="Email"
            className="w-[150px] p-1.5 ml-2 border-gray-300 border-2 focus:border-primary-300 focus:outline-none "
          />
        </div>

        <PasswordInput
          label="Password"
          setValue={handleInputValueChange}
          value={inputValues.password}
        />

        <button
          onClick={handleSubmit}
          disabled={errorMessage !== ''}
          className="mt-4 w-fit p-1.5 bg-primary-300"
          type="button"
        >
          Login
        </button>

        {errorMessage !== '' && (
          <p className="mt-1 text-sm text-primary-300">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default LogIn;
