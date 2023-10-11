import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GQLClient from '../../services/GQLClient';
import SelectList from './SelectList';

import useGQLQuery from '../../hooks/useGQLQuery';

function CreateTodoList() {
  const router = useRouter();

  const queryName = 'allUsers';
  const query = `
        {
          ${queryName} {
            ... on Error {
              message
            }

            ... on QueryAllUsersSuccess {
              data {
                email
              }
            }
          }
        }
      `;
  const { queryData, queryErrorMessage } = useGQLQuery({
    query,
    queryName,
  });
  const [listOfEmails, setListOfEmails] = useState([]);
  const [todoListName, setTodoListName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if (queryData?.data?.length > 0 && !queryErrorMessage) {
      setListOfEmails(queryData.data.map(({ email }) => email));
    }
  }, [queryData]);

  const handleCreateTodo = async () => {
    const mutation = `
      mutation {
        createTodo(data: {name: "${todoListName}", userEmail: "${selectedOption}" })
      {
        ...on Error {
          message
        }
        ...on MutationCreateTodoSuccess {
          data{
            id
            name
            userEmail
          }
        }
      }
    }
    `;

    const requestResult: any = await GQLClient.request(mutation);

    const anErrorOcurred: boolean = !!requestResult.createTodo.message;

    if (anErrorOcurred) {
      return;
    }

    router.push('/experimenting');
  };

  const errorFetchingEmails: boolean = queryErrorMessage.length > 0;
  if (errorFetchingEmails) {
    return (
      <div>
        <h1>An error ocurred, please try again later</h1>
        <p>{queryErrorMessage}</p>
      </div>
    );
  }

  const noUsersOnDatabase: boolean = queryData?.data?.length === 0;
  if (noUsersOnDatabase) {
    return (
      <div>
        <h1>Can not create a todo list at the moment</h1>
        <p>No users on the database</p>
      </div>
    );
  }

  const isLoading: boolean = queryData === null && queryErrorMessage === '';

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl">Create a Todo List</h1>

      <div>
        <label>Name:</label>
        <input
          id="todoListNameInput"
          placeholder=""
          value={todoListName}
          onChange={(e) => setTodoListName(e.target.value)}
          className="w-[150px] border-gray-300 border-2 focus:border-primary-300 focus:outline-none ml-2"
        />
      </div>
      <div>
        <label>User's email:</label>
        <SelectList
          placeHolder="Select user's email"
          options={listOfEmails}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>

      <button
        disabled={selectedOption === '' || todoListName === ''}
        type="button"
        className="bg-primary-300 p-1 mt-2"
        onClick={handleCreateTodo}
      >
        Create
      </button>
    </div>
  );
}

export default CreateTodoList;
