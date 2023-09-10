import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import AnimBeforeRender from '../components/AnimBeforeRender';
import FetchingAndCaching from '../components/FetchingAndCaching';

function Experimenting() {
  return (
    <div className="mt-navbar mb-[75%]">
      <AnimBeforeRender />
      <FetchingAndCaching />
    </div>
  );
}
export default Experimenting;
