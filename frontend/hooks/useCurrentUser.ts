import { useApiClient, userApiClient } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useCurrentUser = () => {
  const api = useApiClient();
  const {
    data: currentUser,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: () => userApiClient.getCurrentUser(api),
    select: (response) => response.data.user,
  });
  return useMemo(
    () => ({ currentUser, isLoading, error, refetch }),
    [currentUser, isLoading, error, refetch]
  );
};
