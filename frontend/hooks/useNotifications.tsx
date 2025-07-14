import { notificationApiClient, useApiClient } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

export const useNotifications = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const {
    data: notificationsData,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationApiClient.getNotifications(api),
    select: (response) => response.data.notifications,
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: (notificationId: string) =>
      notificationApiClient.deleteNotification(api, notificationId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const deleteNotification = useCallback(
    (notificationId: string) => {
      deleteNotificationMutation.mutate(notificationId);
    },
    [deleteNotificationMutation]
  );

  return useMemo(
    () => ({
      notifications: notificationsData || [],
      isLoading,
      error,
      refetch,
      isRefetching,
      deleteNotification,
      isDeletingNotification: deleteNotificationMutation.isPending,
    }),
    [
      notificationsData,
      isLoading,
      error,
      refetch,
      isRefetching,
      deleteNotification,
      deleteNotificationMutation.isPending,
    ]
  );
};
