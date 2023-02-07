import { useCallback } from 'react';
import { useRef } from 'react';

const useDebounce = () => {
  const debounce = useRef<NodeJS.Timeout>();

  const setDebounce = useCallback((fn: () => void, time: number) => {
    clearTimeout(debounce.current);
    debounce.current = setTimeout(fn, time);
  }, []);

  const clearDebounce = useCallback(() => {
    clearTimeout(debounce.current);
  }, []);

  return { setDebounce, clearDebounce };
};

export default useDebounce;
