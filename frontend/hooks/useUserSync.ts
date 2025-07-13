import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { useApiClient, userApiClient } from "../utils/api";

export const useUserSync = () => {
  const { isSignedIn } = useAuth();
  const api = useApiClient();

  const syncUserMutation = useMutation({
    mutationFn: () => userApiClient.syncUser(api),
    onError: (error) => console.error("User sync failed:", error),
  });

  useEffect(() => {
    if (isSignedIn && !syncUserMutation.data) {
      syncUserMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return null;
};
