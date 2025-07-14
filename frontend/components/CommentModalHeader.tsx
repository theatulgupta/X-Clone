import React from "react";
import { View, Text, Image } from "react-native";
import { Post } from "@/types";

interface CommentModalHeaderProps {
  post: Post;
}

const CommentModalHeader = ({ post }: CommentModalHeaderProps) => (
  <View className="border-b border-gray-100 bg-white p-4">
    <View className="flex-row">
      <Image
        source={{ uri: post.user.profilePicture }}
        className="size-12 rounded-full mr-3"
      />
      <View className="flex-1">
        <View className="flex-row items-center mb-1">
          <Text className="font-bold text-gray-900 mr-1">
            {post.user.firstName} {post.user.lastName}
          </Text>
          <Text className="text-gray-500 ml-1">@{post.user.username}</Text>
        </View>
        {post.content && (
          <Text className="text-gray-900 text-base leading-5 mb-3">
            {post.content}
          </Text>
        )}
        {post.image && (
          <Image
            source={{ uri: post.image }}
            className="w-full h-48 rounded-2xl mb-3"
            resizeMode="cover"
          />
        )}
      </View>
    </View>
  </View>
);

export default React.memo(CommentModalHeader);
