import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient, postApiClient } from "../utils/api";
import { useCallback, useMemo } from "react";

export const usePosts = (username?: string) => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const {
    data: postsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: username ? ["userPosts", username] : ["posts"],
    queryFn: () =>
      username
        ? postApiClient.getUserPosts(api, username)
        : postApiClient.getPosts(api),
    select: (response) => response.data.posts,
  });

  const likePostMutation = useMutation({
    mutationFn: (postId: string) => postApiClient.likePost(api, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (username) {
        queryClient.invalidateQueries({ queryKey: ["userPosts", username] });
      }
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => postApiClient.deletePost(api, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (username) {
        queryClient.invalidateQueries({ queryKey: ["userPosts", username] });
      }
    },
  });

  const checkIsLiked = useCallback((postLikes: string[], currentUser: any) => {
    return !!(currentUser && postLikes.includes(currentUser._id));
  }, []);

  const toggleLike = useCallback(
    (postId: string) => likePostMutation.mutate(postId),
    [likePostMutation]
  );
  const deletePost = useCallback(
    (postId: string) => deletePostMutation.mutate(postId),
    [deletePostMutation]
  );
  return useMemo(
    () => ({
      posts: postsData || [],
      isLoading,
      error,
      refetch,
      toggleLike,
      deletePost,
      checkIsLiked,
    }),
    [postsData, isLoading, error, refetch, toggleLike, deletePost, checkIsLiked]
  );
};
