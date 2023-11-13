import { useEffect, useState } from 'react';
import { useTheme } from '../utils/styledWrapper.js';

export const useBreakpoint = (breakpoint: any): boolean => {
  const theme = useTheme();
  // @ts-expect-error Property breakpointsMap does not exist on type
  const maxWidth = theme.breakpointsMap[breakpoint].width;

  const [isBreakpoint, seIsBreakpoint] = useState(() => {
    try {
      return window.matchMedia(`(max-width: ${maxWidth})`).matches;
    } catch (error) {
      return false;
    }
  });

  useEffect(() => {
    try {
      const mql = window.matchMedia(`(max-width: ${maxWidth})`);

      const setMobileFromQuery = ({ matches }: { matches: boolean }) => {
        seIsBreakpoint(matches);
      };

      mql.addEventListener('change', setMobileFromQuery);
      setMobileFromQuery(mql);

      return () => {
        mql.removeEventListener('change', setMobileFromQuery);
      };
    } catch (error) {
      return;
    }
  }, [maxWidth]);

  return isBreakpoint;
};
