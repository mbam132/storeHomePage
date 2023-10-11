import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import CreateTodoList from '../components/Experimenting/CreateTodoList';
import { IUserScope } from '../utils/types';

function CreateTodo() {
  return (
    <div className="mt-navbar mb-[40%] p-3.5 flex flex-col gap-y-3">
      <CreateTodoList />
    </div>
  );
}

export default () => (
  <ProtectedRoute component={CreateTodo} authScope={IUserScope.PLAINUSER} />
);
