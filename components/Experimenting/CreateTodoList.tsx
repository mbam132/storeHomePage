import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GQLClient from '../../services/GQLClient';
import SelectList from './SelectList';
import useUser from '../../hooks/useUser';
import useGQLQuery from '../../hooks/useGQLQuery';
import useOnKeyPress from '../../hooks/useOnKeyPress';

function CreateTodoList() {
  const router = useRouter();
  const { user } = useUser();

  const [todoListName, setTodoListName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTodo = async () => {
    const mutation = `
      mutation {
        createTodo(data: {name: "${todoListName}", userEmail: "${user.email}" })
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

    setIsLoading(true);

    const requestResult: any = await GQLClient.request(mutation);

    // const anErrorOcurred: boolean = !!requestResult.createTodo.message;

    setTodoListName('');
    setIsLoading(false);
    // if (anErrorOcurred) {
    //   return;
    // }
  };

  useOnKeyPress({
    keyName: 'Enter',
    callback: handleCreateTodo,
  });

  return (
    <div className="flex flex-col gap-y-2.5">
      <h1 className="text-2xl">Create a task</h1>

      <div>
        <input
          type="text"
          placeholder="Name"
          value={todoListName}
          onChange={(e) => setTodoListName(e.target.value)}
          className="w-[150px]  focus:border-primary-300 focus:outline-none rounded-md mb-0.5"
        />
      </div>
      <div className="flex items-center gap-x-2">
        <button
          disabled={todoListName === ''}
          type="button"
          className="bg-primary-300 p-1.5 rounded-md w-fit"
          onClick={handleCreateTodo}
        >
          Submit
        </button>
        {isLoading && <div className="loading-spinner" />}
      </div>
    </div>
  );
}

export default CreateTodoList;
