import { useApiClient, userApiClient } from "@/utils/api";
import { useClerk } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export const useSyncUser = (): null => {
  const { isSignedIn } = useClerk();
  const api = useApiClient();
  const hasSynced = useRef(false);

  const { mutate } = useMutation({
    mutationFn: () => userApiClient.syncUser(api),
    onSuccess: (response: any) =>
      console.log("User synced successfully: ", response),
    onError: (error: any) => console.error("Error syncing user:", error),
  });

  useEffect(() => {
    if (isSignedIn && !hasSynced.current) {
      hasSynced.current = true;
      mutate();
    }
  }, [isSignedIn, mutate]);

  return null;
};
