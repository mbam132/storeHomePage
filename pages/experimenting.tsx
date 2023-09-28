import React from 'react';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
// import AnimBeforeRender from '../components/Experimenting/AnimBeforeRender';
// import FetchingAndCaching from '../components/Experimenting/FetchingAndCaching';
// import StateHandling from '../components/Experimenting/StateHandling';
import HandleUsers from '../components/Experimenting/HandleUsers';

function Experimenting() {
  return (
    <div className="mt-navbar mb-[40%]">
      {/* <AnimBeforeRender/> */}
      {/* <FetchingAndCaching /> */}
      {/* <StateHandling /> */}
      <HandleUsers />
    </div>
  );
}
export default Experimenting;
