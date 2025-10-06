import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

interface RouletteContextType {
  isPreview: boolean;
}

const RouletteContext = createContext<RouletteContextType | undefined>(
  undefined
);

export function RouletteProvider({
  isPreview,
  children,
}: {
  children: ReactNode;
  isPreview: boolean;
}): JSX.Element {
  return (
    <RouletteContext.Provider value={{ isPreview }}>
      {children}
    </RouletteContext.Provider>
  );
}

export function useRouletteContext(): RouletteContextType {
  const context = useContext(RouletteContext);
  if (context === undefined) {
    return { isPreview: false };
  }
  return context;
}
