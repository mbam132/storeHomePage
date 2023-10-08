import React, { useState } from 'react';
import { request } from 'graphql-request';
import { GRAPHQL_REQUEST_URL } from '../utils/constants';
import PasswordInput from './PasswordInput';

function SignUp() {
  const secondsToShowSuccessMessage = 30;

  const [userCreated, setUserCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputValueChange = (event) => {
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

    const mutationName = 'signUp';
    const mutation = `
      mutation {
        ${mutationName}(email: "${inputValues.email}", password: "${inputValues.password}", name: "${inputValues.name}" )
      {
        ...on Error {
          message
        }
        ...on MutationSignUpSuccess {
          data{
            email
          }
        }
      }
    }
    `;

    const requestResult: any = await request(GRAPHQL_REQUEST_URL, mutation);

    const anErrorOcurred: boolean = !!requestResult[mutationName].message;

    if (anErrorOcurred) {
      setErrorMessage(requestResult[mutationName].message);
      return;
    }

    if (requestResult[mutationName].data.email) {
      setUserCreated(true);
      setInputValues({ name: '', email: '', password: '' });

      setTimeout(() => {
        setUserCreated(false);
      }, secondsToShowSuccessMessage * 1000);
    }
  };

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
    <div className="p-3">
      <h1 className="underline text-primary-300 text-xl">Sign up</h1>

      <label>Name</label>
      <input
        name="name"
        value={inputValues.name}
        onChange={handleInputValueChange}
        placeholder="Name"
        className="w-[150px] p-1.5 border-gray-300 border-2 focus:border-primary-300 focus:outline-none "
      />

      <label>Email</label>
      <input
        name="email"
        value={inputValues.email}
        onChange={handleInputValueChange}
        placeholder="Email"
        className="w-[150px] p-1.5 border-gray-300 border-2 focus:border-primary-300 focus:outline-none "
      />

      <PasswordInput
        label="Password"
        setValue={handleInputValueChange}
        value={inputValues.password}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 w-fit p-1.5 bg-primary-300"
        type="button"
      >
        Sign up
      </button>

      {errorMessage !== '' && (
        <p className="mt-1 text-sm text-primary-300">{errorMessage}</p>
      )}
    </div>
  );
}

export default SignUp;