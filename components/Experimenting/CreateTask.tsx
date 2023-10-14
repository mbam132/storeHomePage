import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import GQLClient from '../../services/GQLClient';
import useOnKeyPress from '../../hooks/useOnKeyPress';
import useExecutionInterval from '../../hooks/useExecutionInterval';
import { msIntervalBetweenCalls } from '../../utils/constants';
import { addTask } from '../../store';

function CreateTask() {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTask = async () => {
    const mutationName = 'createTask';
    const mutation = `
       mutation{
        ${mutationName}(name: "${taskName}")
      {
        ...on Error {
          message
        }
        ...on MutationCreateTaskSuccess {
          data{
            id
            name
            completed
            createdAt
          }
        }
      }
    }
    `;

    setIsLoading(true);

    const requestResult: any = await GQLClient.request(mutation);

    setTaskName('');
    setIsLoading(false);

    const anErrorOcurred: boolean = !!requestResult[mutationName].message;

    if (anErrorOcurred) {
      return;
    }

    dispatch(addTask(requestResult[mutationName].data));
  };

  const { intervaledCallback: intervaledCreateTodo } = useExecutionInterval({
    ms: msIntervalBetweenCalls,
    callback: handleCreateTask,
  });

  useOnKeyPress({ keyName: 'Enter', callback: intervaledCreateTodo });

  return (
    <div className="flex flex-col gap-y-2.5 w-fit border-primary-300 border-2 rounded-md p-3">
      <h1 className="text-xl">New task</h1>

      <div>
        <input
          type="text"
          placeholder="Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-[150px] focus:outline-none rounded-md mb-0.5 border-gray-300 border-2 focus:border-primary-300 focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-x-2">
        <button
          disabled={taskName === ''}
          type="button"
          className="bg-primary-300 p-1.5 rounded-md w-fit"
          onClick={intervaledCreateTodo}
        >
          Create
        </button>
        {isLoading && <div className="loading-spinner" />}
      </div>
    </div>
  );
}

export default CreateTask;
