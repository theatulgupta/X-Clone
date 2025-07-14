import { useState, useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { useApiClient, commentApiClient } from "../utils/api";

export const useComments = () => {
  const [commentText, setCommentText] = useState("");
  const api = useApiClient();

  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: string;
      content: string;
    }) => {
      const response = await commentApiClient.createComment(
        api,
        postId,
        content
      );
      return response.data;
    },
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      Alert.alert("Error", "Failed to post comment. Try again.");
    },
  });

  const createComment = useCallback(
    (postId: string) => {
      if (!commentText.trim()) {
        Alert.alert("Empty Comment", "Please write something before posting!");
        return;
      }
      createCommentMutation.mutate({ postId, content: commentText.trim() });
    },
    [commentText, createCommentMutation]
  );

  return useMemo(
    () => ({
      commentText,
      setCommentText,
      createComment,
      isCreatingComment: createCommentMutation.isPending,
    }),
    [
      commentText,
      setCommentText,
      createComment,
      createCommentMutation.isPending,
    ]
  );
};
