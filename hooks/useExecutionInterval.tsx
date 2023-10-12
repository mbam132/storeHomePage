import { useState } from 'react';

interface IProps {
  callback: any;
  ms: number;
}

function useExecutionInterval({ callback, ms }: IProps) {
  const [lastTime, setLastTime] = useState(null);

  const intervaledCallback = ({ ...params } = {}) => {
    const now = Date.now();

    if (now > lastTime + ms) {
      setLastTime(now);
      callback({ ...params });
    }
  };

  return { intervaledCallback };
}

export default useExecutionInterval;
