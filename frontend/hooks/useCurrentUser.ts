import { useApiClient, userApiClient } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

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
  return { currentUser, isLoading, error, refetch };
};
