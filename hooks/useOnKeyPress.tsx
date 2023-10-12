import React, { useEffect } from 'react';

function useOnKeyPress({ keyName, callback }) {
  useEffect(() => {
    const handleSubmitOnEnter = (event: KeyboardEvent) => {
      if (event.key === keyName) {
        callback();
      }
    };
    document.addEventListener('keyup', handleSubmitOnEnter);

    return () => {
      document.removeEventListener('keyup', handleSubmitOnEnter);
    };
  }, [callback]);
}

export default useOnKeyPress;
