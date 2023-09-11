import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import AnimBeforeRender from '../components/Experimenting/AnimBeforeRender';
import FetchingAndCaching from '../components/Experimenting/FetchingAndCaching';
import StateHandling from '../components/Experimenting/StateHandling';

function Experimenting() {
  return (
    <div className="mt-navbar mb-[75%]">
      {/* <AnimBeforeRender/> */}
      {/* <FetchingAndCaching /> */}
      <StateHandling />
    </div>
  );
}
export default Experimenting;
