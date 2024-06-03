import { useState, useEffect } from 'react';

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

export default function useWindowWidth() {
  let [width, setWidth] = useState(getWidth());

  useEffect(() => {
    let timeout = null;

    const resizeListener = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setWidth(getWidth()), 150);
    };

    // set resize listener
    window.addEventListener('resize', resizeListener);

    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  const isDesktop = width >= 992;

  return [width, isDesktop];
}
