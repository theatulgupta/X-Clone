import { useApiClient, userApiClient } from "@/utils/api";
import { useClerk } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const useSyncUser = (): null => {
  const { isSignedIn } = useClerk();
  const api = useApiClient();

  const syncUserMutation = useMutation({
    mutationFn: () => userApiClient.syncUser(api),
  });

  useEffect(() => {
    if (isSignedIn && !syncUserMutation.data) {
      syncUserMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return null;
};
