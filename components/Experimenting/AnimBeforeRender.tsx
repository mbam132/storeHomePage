'use client';

import React, { useRef, useLayoutEffect } from 'react';

function AnimBeforeRender() {
  // start an animation before the painting on the screen
  const elementRef = useRef(null);
  useLayoutEffect(() => {
    const secondsBeforeShowing: number = 8;

    const element = elementRef.current;
    element.style.opacity = 0;
    setTimeout(() => {
      element.style.opacity = 1;
    }, secondsBeforeShowing * 1000);

    return () => {
      element.style.opacity = 0;
    };
  }, []);

  return (
    <div ref={elementRef}>
      <p>Testing useLayoutEffect</p>
    </div>
  );
}

export default AnimBeforeRender;
