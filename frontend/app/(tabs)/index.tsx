import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  FlatList,
} from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SignOutButton from "@/components/SignOutButton";
import { useSyncUser } from "@/hooks/useSyncUser";
import { Ionicons } from "@expo/vector-icons";
import PostComposer from "@/components/PostComposer";
import { usePosts } from "@/hooks/usePosts";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import PostCard from "@/components/PostCard";
import FeedEmptyState from "@/components/FeedEmptyState";

const HomeScreen = () => {
  useSyncUser();
  const insets = useSafeAreaInsets();
  const keyboardVerticalOffset = Platform.OS === "ios" ? insets.top + 44 : 0;

  const { currentUser } = useCurrentUser();
  const {
    posts,
    isLoading,
    error,
    refetch,
    toggleLike,
    deletePost,
    checkIsLiked,
  } = usePosts();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
        <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
        <Text className="text-xl font-bold text-gray-900">Home</Text>
        <SignOutButton />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={keyboardVerticalOffset}
        className="flex-1"
      >
        <FlatList
          ListHeaderComponent={<PostComposer />}
          data={posts || []}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PostCard
              key={item._id}
              post={item}
              onLike={(postId) => toggleLike(postId)}
              onDelete={(postId) => deletePost(postId)}
              currentUser={currentUser}
              isLiked={checkIsLiked(item.likes, currentUser)}
            />
          )}
          refreshing={isLoading}
          onRefresh={refetch}
          ListEmptyComponent={
            <FeedEmptyState
              isLoading={isLoading}
              error={!!error}
              onRetry={() => refetch()}
            />
          }
          contentContainerStyle={{ paddingBottom: 18 }}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
