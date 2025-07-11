import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { useApiClient } from "@/utils/api";
import * as ImagePicker from "expo-image-picker";

// Types
export type PostProps = {
  content: string;
  image?: string;
};

export const useCreatePost = () => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const api = useApiClient();
  const queryClient = useQueryClient();

  const getMimeType = (uri: string) => {
    const ext = uri.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "png":
        return "image/png";
      case "gif":
        return "image/gif";
      case "webp":
        return "image/webp";
      default:
        return "image/jpeg";
    }
  };

  const getFileName = (uri: string) => {
    const parts = uri.split("/");
    return parts[parts.length - 1] || `image.jpeg`;
  };

  const handleImagePicker = async (useCamera = false) => {
    const permission = useCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        `Please grant permission to access ${useCamera ? "camera" : "photo library"}.`
      );
      return;
    }

    const pickerOptions = {
      allowsEditing: true,
      aspect: [16, 9] as [number, number],
      quality: 0.8,
    };

    const result = useCamera
      ? await ImagePicker.launchCameraAsync(pickerOptions)
      : await ImagePicker.launchImageLibraryAsync({
          ...pickerOptions,
          mediaTypes: ["images"],
        });

    if (!result.canceled) {
      const asset = result.assets[0];
      if (!asset?.type?.startsWith("image")) {
        Alert.alert("Invalid File", "Please select an image.");
        return;
      }
      setSelectedImage(asset.uri);
    }
  };

  const createPostMutation = useMutation({
    mutationFn: async ({ content, image }: PostProps) => {
      const formData = new FormData();
      if (content) formData.append("content", content);
      if (image) {
        formData.append("image", {
          uri: image,
          name: getFileName(image),
          type: getMimeType(image),
        } as any);
      }
      return api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      setContent("");
      setSelectedImage(null);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      Alert.alert("Success", "Post created successfully!");
    },
    onError: (error: any) => {
      Alert.alert(
        "Failed to create post",
        error?.message || "Please try again."
      );
    },
  });

  const createPost = () => {
    if (!content.trim() && !selectedImage) {
      Alert.alert("Empty Post", "Please add content or select an image.");
      return;
    }
    createPostMutation.mutate({
      content,
      image: selectedImage || undefined,
    });
  };

  return {
    content,
    setContent,
    selectedImage,
    setSelectedImage,
    isCreating: createPostMutation.isPending,
    pickImageFromGallery: () => handleImagePicker(false),
    takePhoto: () => handleImagePicker(true),
    removeImage: () => setSelectedImage(null),
    createPost,
    error: createPostMutation.error,
  };
};
