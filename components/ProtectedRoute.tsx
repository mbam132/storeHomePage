import React from 'react';
import { useRouter } from 'next/navigation';
import useUser from '../hooks/useUser';
import { IUserScope } from '../utils/types';

interface IProps {
  component: React.FC;
  authScope?: IUserScope;
}

function ProtectedRoute({ component, authScope }: IProps) {
  const router = useRouter();
  const { isLoading, user } = useUser();

  if (isLoading) {
    return (
      <div className="mt-navbar mb-[40%] p-3">
        <h1>Loading...</h1>
      </div>
    );
  }

  const scopeMatch: boolean = user?.authScope === authScope;
  const userIsSuperUser: boolean = user?.authScope === IUserScope.SUPERUSER;

  if (!(user && (scopeMatch || userIsSuperUser))) {
    router.push('/login');
  } else {
    const Component = component;
    return <Component />;
  }
}

export default ProtectedRoute;
