import React from 'react';
import { useRouter } from 'next/navigation';
import useUser from '../hooks/useUser';

interface IProps {
  component: React.FC;
}

function ProtectedRoute({ component }: IProps) {
  const router = useRouter();
  const { isLoading, user } = useUser();

  if (!isLoading && user === null) {
    router.push('/login');
  } else {
    const Component = component;
    return <Component />;
  }
}

export default ProtectedRoute;
