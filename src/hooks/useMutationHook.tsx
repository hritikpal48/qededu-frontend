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

export const useMutationHook = (mutationFn: MutationFunction<any, any>) => (params: MutationParams) => {
    return useMutation({
        mutationFn,
        onError: params.onError,
        onSuccess: params.onSuccess
    })
};


export const useQueryHook = <TData = unknown>(params: QueryParams<TData>) => {
    return useQuery<TData>({
        queryKey: params.queryKey,
        queryFn: params.queryFn,
        enabled: params.enabled ?? true,
        staleTime: params.staleTime,
    });
};
