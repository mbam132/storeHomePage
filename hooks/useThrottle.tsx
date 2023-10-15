import { useState } from 'react';

interface IProps {
  callback: any;
  ms: number;
}

function useThrottle({ callback, ms }: IProps) {
  const [lastTime, setLastTime] = useState(null);

  const throttledCallback = ({ ...params } = {}) => {
    const now = Date.now();

    if (now > lastTime + ms) {
      setLastTime(now);
      callback({ ...params });
    }
  };

  return { throttledCallback };
}

export default useThrottle;
