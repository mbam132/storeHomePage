import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useGQLQuery from '../../hooks/useGQLQuery';
import TaskTableRow from '../Table/TaskTableRow';
import { setTasks, selectTasks } from '../../store';
import Table from '../Table';

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
      <Table
        columnNames={columnNames}
        rows={userTasks}
        RowComponent={TaskTableRow}
      />
    </div>
  );
}

export default TasksList;
