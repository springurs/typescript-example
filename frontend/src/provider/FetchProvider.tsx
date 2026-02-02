import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';
import { fetcher } from '../utils/fetcher';

type Fetcher = typeof fetcher;

type FetchContextValue = {
  fetcher: Fetcher;
  response: unknown;
  setResponse: React.Dispatch<React.SetStateAction<unknown>>;
};

const FetchContext = createContext<FetchContextValue>({
  fetcher,
  response: null,
  setResponse: () => {},
});

type FetchProviderProps = {
  children: ReactNode;
};

export const FetchProvider = function FetchProvider({ children }: FetchProviderProps) {
  const [response, setResponse] = useState<unknown>(null);

  const fetchImpl = useCallback(
    async <T,>(path?: string, baseUrl?: string) => {
      const data = await fetcher<T>(path, baseUrl);
      setResponse(data);
      return data;
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      fetcher: fetchImpl,
      response,
      setResponse,
    }),
    [fetchImpl, response]
  );

  return (
    <FetchContext.Provider value={contextValue}>
      {children}
    </FetchContext.Provider>
  );
};

export default FetchContext;
