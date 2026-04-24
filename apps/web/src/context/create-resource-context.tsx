"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  useQuery,
  useQueryClient,
  QueryKey,
  QueryObserverResult,
} from "@tanstack/react-query";
import { api } from "@/lib/api";

interface ResourceContextType<T> {
  data: T | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<QueryObserverResult<T, Error>>;
  invalidate: () => Promise<void>;
}

export function createResourceContext<T>(queryKey: QueryKey, url: string) {
  const Context = createContext<ResourceContextType<T> | undefined>(undefined);

  function Provider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();

    const query = useQuery<T, Error>({
      queryKey,
      queryFn: async () => {
        const response = await api.get(url);
        return response.data;
      },
      staleTime: 1000 * 60 * 5,
    });

    const invalidate = async () => {
      await queryClient.invalidateQueries({ queryKey });
    };

    const value = {
      data: query.data,
      isLoading: query.isLoading,
      isFetching: query.isFetching,
      isError: query.isError,
      error: query.error,
      refetch: query.refetch,
      invalidate,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  const useData = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error(
        `useData must be used within Provider for key: ${JSON.stringify(queryKey)}`,
      );
    }
    return context;
  };

  return { Provider, useData };
}
