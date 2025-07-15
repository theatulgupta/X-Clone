import { View, Text, Alert, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Post, User } from "@/types";
import { formatDate, formatNumber } from "@/utils/formatters";
import { AntDesign, Feather } from "@expo/vector-icons";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onDelete: (postId: string) => void;
  onComment: (post: Post) => void;
  isLiked?: boolean;
  currentUser: User;
}

function PostCard({
  currentUser,
  post,
  onLike,
  onDelete,
  isLiked,
  onComment,
}: PostCardProps) {
  if (!post || !post.user || !currentUser) {
    return null;
  }
  const isOwnPost =
    post.user?._id && currentUser?._id && post.user._id === currentUser._id;

  const handleDelete = () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(post._id),
      },
    ]);
  };

  return (
    <View className="border-b border-gray-100 bg-white">
      <View className="flex-row p-4">
        <Image
          source={
            post.user.profilePicture
              ? { uri: post.user.profilePicture }
              : require("../assets/images/default-avatar.png")
          }
          className="size-12 rounded-full mr-3"
          onError={() => {}}
        />
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <View className="flex-row items-center flex-shrink">
              <Text className="font-bold text-gray-900 mr-1" numberOfLines={1}>
                {post.user.firstName} {post.user.lastName}
              </Text>
              <Text className="text-gray-500 ml-1" numberOfLines={1}>
                @{post.user.username} · {formatDate(post.createdAt)}
              </Text>
            </View>
            {isOwnPost && (
              <TouchableOpacity
                onPress={handleDelete}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityLabel="Delete post"
                accessibilityHint="Double tap to delete this post"
              >
                <Feather name="trash" size={20} color="#657786" />
              </TouchableOpacity>
            )}
          </View>
          {post.content ? (
            <Text className="text-gray-500 text-base leading-5 mb-3">
              {post.content}
            </Text>
          ) : null}
          {post.image ? (
            <Image
              source={{ uri: post.image }}
              className="w-full h-48 rounded-2xl mb-3"
              resizeMode="cover"
            />
          ) : null}
          <View className="flex-row justify-between max-w-xs">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => onComment(post)}
            >
              <Feather name="message-circle" size={18} color="#657786" />
              <Text className="text-gray-500 ml-2 text-sm">
                {formatNumber(post.comments.length || 0)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => {
                // TODO: Implement retweet functionality
              }}
            >
              <Feather name="repeat" size={18} color="#657786" />
              <Text className="text-gray-500 ml-2 text-sm">0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => onLike(post._id)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {isLiked ? (
                <AntDesign name="heart" size={18} color="#E0245E" />
              ) : (
                <AntDesign name="heart" size={18} color="#657786" />
              )}
              <Text
                className={`text-sm ml-2 ${
                  isLiked ? "text-red-500" : "text-gray-500"
                }`}
              >
                {formatNumber(post.likes.length || 0)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="share" size={18} color="#657786" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
export default React.memo(PostCard);
