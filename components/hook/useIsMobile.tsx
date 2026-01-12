import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial value after component mounts
    setIsMobile(window.innerWidth <= breakpoint);
    
    const onResize = () =>
      setIsMobile(window.innerWidth <= breakpoint);

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return isMobile;
}
