import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

interface FeedEmptyStateProps {
  isLoading: boolean;
  error: boolean;
  onRetry: () => void;
}

const FeedEmptyState: React.FC<FeedEmptyStateProps> = ({
  isLoading,
  error,
  onRetry,
}) => {
  if (isLoading) {
    return (
      <View className="p-8 items-center">
        <ActivityIndicator size="large" color="#1DA1F2" />
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View className="p-8 items-center">
        <Text className="text-gray-500 mb-4">Failed to load posts.</Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onPress={onRetry}
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View className="p-8 items-center">
      <Text className="text-gray-500 mb-4">No posts yet.</Text>
    </View>
  );
};

export default FeedEmptyState;
