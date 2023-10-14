import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useGQLQuery from '../../hooks/useGQLQuery';
import TaskListItem from './TaskListItem';
import { setTasks, addTask, selectTasks } from '../../store';

const columnNames = ['Name', 'Date Created', 'Completed', ''];

function TasksList() {
  const dispatch = useDispatch();

  const queryName = 'authGetTasks';
  const query = `
    query {
      ${queryName}{
        ...on Error{
          message
        }
        ...on QueryAuthGetTasksSuccess{
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

  const { queryData, queryErrorMessage } = useGQLQuery({ queryName, query });

  useEffect(() => {
    const dataWasFetched: boolean =
      queryData?.data?.length > 0 && queryErrorMessage === '';

    if (dataWasFetched) {
      dispatch(setTasks(queryData.data));
    }
  }, [queryData]);

  const userTasks = useSelector(selectTasks);

  return (
    <div>
      <h2 className="text-xl">Tasks</h2>

      <div className="relative overflow-x-auto rounded-md border-2 border-primary-300">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-primary-300">
            <tr>
              {columnNames.map((name) => (
                <th className="px-3 py-1.5">{name}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-primary-300">
            {userTasks.map((task) => (
              <TaskListItem item={task} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TasksList;
