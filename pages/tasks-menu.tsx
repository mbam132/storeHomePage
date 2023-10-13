import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import CreateTask from '../components/Experimenting/CreateTask';
import { IUserScope } from '../utils/types';

function CreateTodo() {
  return (
    <div className="mt-navbar mb-[40%] flex flex-col gap-y-3 p-3">
      <CreateTask />
    </div>
  );
}

export default () => (
  <ProtectedRoute component={CreateTodo} authScope={IUserScope.PLAINUSER} />
);
