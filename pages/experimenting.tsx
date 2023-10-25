import React from 'react';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import ProtectedRoute from '../components/ProtectedRoute';
// import AnimBeforeRender from '../components/Experimenting/AnimBeforeRender';
// import FetchingAndCaching from '../components/Experimenting/FetchingAndCaching';
// import StateHandling from '../components/Experimenting/StateHandling';
import HandleUsers from '../components/Experimenting/HandleUsers';
import GridExample from '../components/Experimenting/GridExample';
import { IUserScope } from '../utils/types';

function Experimenting() {
  return (
    <div className="mt-navbar mb-[40%] p-3">
      {/* <AnimBeforeRender/> */}
      {/* <FetchingAndCaching /> */}
      {/* <StateHandling /> */}
      {/* <GridExample /> */}
      <HandleUsers />
    </div>
  );
}

export default () => (
  <ProtectedRoute component={Experimenting} authScope={IUserScope.SUPERUSER} />
);
