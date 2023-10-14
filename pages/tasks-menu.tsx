import React from 'react';
import Head from 'next/head';
import ProtectedRoute from '../components/ProtectedRoute';
import CreateTask from '../components/Experimenting/CreateTask';
import { IUserScope } from '../utils/types';
import TasksList from '../components/Experimenting/TasksList';

function TasksMenu() {
  return (
    <div className="mt-navbar mb-[40%] flex flex-col gap-y-3 p-3">
      <Head>
        <title>Tasks Menu</title>
      </Head>
      <h1 className="text-2xl">Tasks menu</h1>
      <CreateTask />
      <TasksList />
    </div>
  );
}

export default () => (
  <ProtectedRoute component={TasksMenu} authScope={IUserScope.PLAINUSER} />
);
