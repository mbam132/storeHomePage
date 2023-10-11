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
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  const userScopeMatchesWithRouteScope: boolean = user?.authScope === authScope;
  const userIsSuperUser: boolean = user?.authScope === IUserScope.SUPERUSER;

  if (!(user && (userScopeMatchesWithRouteScope || userIsSuperUser))) {
    router.push('/login');
  } else {
    const Component = component;
    return <Component />;
  }
}

export default ProtectedRoute;
