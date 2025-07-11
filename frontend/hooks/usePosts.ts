import { postApiClient, useApiClient } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePosts = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const {
    data: postsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => postApiClient.getPosts(api),
    select: (response) => response.data.posts,
  });

  const likePostMutation = useMutation({
    mutationFn: (postId: string) => postApiClient.likePost(api, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => postApiClient.deletePost(api, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });

  const checkIsLiked = (
    postLikes: string[],
    currentUser: { _id: string } | null
  ) => !!(currentUser && postLikes.includes(currentUser._id));

  return {
    posts: postsData || [],
    isLoading,
    error,
    refetch,
    toggleLike: (postId: string) => likePostMutation.mutate(postId),
    deletePost: (postId: string) => deletePostMutation.mutate(postId),
    checkIsLiked,
  };
};
