import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import GQLClient from '../../services/GQLClient';
import useOnKeyPress from '../../hooks/useOnKeyPress';
import useThrottle from '../../hooks/useThrottle';
import { msIntervalBetweenCalls } from '../../utils/constants';
import { addTask } from '../../store';
import Card from '../Card';
import Button from '../Button';

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

  const { throttledCallback: throttledCreateTodo } = useThrottle({
    ms: msIntervalBetweenCalls,
    callback: handleCreateTask,
  });

  useOnKeyPress({ keyName: 'Enter', callback: throttledCreateTodo });

  return (
    <div>
      <Card title="New Task">
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
          <Button
            disabled={taskName === ''}
            handleOnClick={throttledCreateTodo}
            showSpinner={isLoading}
            width="150px"
          >
            Create
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CreateTask;
