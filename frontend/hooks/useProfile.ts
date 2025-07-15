import { useApiClient, userApiClient } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useCallback, useMemo } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { Alert } from "react-native";

export interface EditProfileProps {
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
}

export const useProfile = () => {
  const api = useApiClient();

  const queryClient = useQueryClient();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [formData, setFormData] = useState<EditProfileProps>({
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
  });

  const { currentUser } = useCurrentUser();

  const updateProfileMutation = useMutation({
    mutationFn: (profileData: EditProfileProps) =>
      userApiClient.updateProfile(api, profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setIsEditModalVisible(false);
      Alert.alert("Success", "Profile updated successfully!");
    },
    onError: (error: any) => {
      Alert.alert(
        "Failed to update profile",
        error?.message || "Please try again."
      );
    },
  });

  const openEditModal = useCallback(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        bio: currentUser.bio || "",
        location: currentUser.location || "",
      });
    }
    setIsEditModalVisible(true);
  }, [currentUser]);

  const closeEditModal = useCallback(() => setIsEditModalVisible(false), []);

  const saveProfile = useCallback(
    () => updateProfileMutation.mutate(formData),
    [formData, updateProfileMutation]
  );

  const updateFormField = useCallback(
    <K extends keyof EditProfileProps>(field: K, value: string) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    },
    []
  );

  const refetch = useCallback(
    () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    [queryClient]
  );

  return useMemo(
    () => ({
      isEditModalVisible,
      formData,
      openEditModal,
      closeEditModal,
      saveProfile,
      updateFormField,
      isUpdating: updateProfileMutation.isPending,
      refetch,
    }),
    [
      isEditModalVisible,
      formData,
      openEditModal,
      closeEditModal,
      saveProfile,
      updateFormField,
      updateProfileMutation.isPending,
      refetch,
    ]
  );
};
