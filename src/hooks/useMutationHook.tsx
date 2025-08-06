import { useQuery, useMutation, MutationFunction, QueryFunction } from "@tanstack/react-query";

type MutationParams = {
    onError: (err: any) => void;
    onSuccess: (data: any) => void
}

type QueryParams<TData = unknown> = {
    queryKey: string[];
    queryFn: QueryFunction<TData>;
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
};

export const createMutationHook = <TData = any, TVariables = any>(
  mutationFn: MutationFunction<TData, TVariables>
) => {
  return (params?: MutationParams) =>
    useMutation({
      mutationFn,
      onSuccess: params?.onSuccess,
      onError: params?.onError,
    });
};

export const useQueryHook = <TData = unknown>(params: QueryParams<TData>) => {
    return useQuery<TData>({
        queryKey: params.queryKey,
        queryFn: params.queryFn,
        enabled: params.enabled ?? true,
        staleTime: params.staleTime,
    });
};
