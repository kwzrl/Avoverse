'use client';

import { createContext, useContext, useState, useRef, useCallback, ReactNode } from 'react';

interface ScrollContextType {
  scrollVelocity: number;
  setScrollVelocity: React.Dispatch<React.SetStateAction<number>>;
  scrollVelocityRef: React.MutableRefObject<number>;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

interface ScrollProviderProps {
  children: ReactNode;
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const scrollVelocityRef = useRef(0);

  // Keep ref in sync with state for animation loops
  const setScrollVelocityWithRef: React.Dispatch<React.SetStateAction<number>> = useCallback((action) => {
    setScrollVelocity((prev) => {
      const newValue = typeof action === 'function' ? action(prev) : action;
      scrollVelocityRef.current = newValue;
      return newValue;
    });
  }, []);

  return (
    <ScrollContext.Provider value={{
      scrollVelocity,
      setScrollVelocity: setScrollVelocityWithRef,
      scrollVelocityRef
    }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return ctx;
}
