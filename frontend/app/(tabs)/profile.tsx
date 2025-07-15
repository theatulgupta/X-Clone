import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { format } from "date-fns";
import { usePosts } from "@/hooks/usePosts";
import PostsList from "@/components/PostsList";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileInfo from "@/components/ProfileInfo";
import ProfileAvatarBanner from "@/components/ProfileAvatarBanner";

const ProfileScreen = () => {
  const { currentUser, isLoading } = useCurrentUser();
  const insets = useSafeAreaInsets();

  const {
    posts: userPosts,
    refetch: refetchPosts,
    isLoading: isRefetching,
  } = usePosts(currentUser.username);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size={"large"} color={"#1DA1F2"} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <ProfileHeader
        firstName={currentUser.firstName}
        lastName={currentUser.lastName}
        postCount={userPosts.length}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetchPosts}
            tintColor={"#1DA1F2"}
          />
        }
      >
        {/* BANNER */}
        <ProfileAvatarBanner
          banner={
            currentUser.banner ||
            "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          profilePicture={currentUser.profilePicture}
          onEditProfile={() => {
            // TODO: Implement edit profile functionality
          }}
        />

        <View className="px-4 pb-4 border-b border-gray-100">
          <ProfileInfo
            firstName={currentUser.firstName}
            lastName={currentUser.lastName}
            username={currentUser.username}
            bio={currentUser.bio}
            location={currentUser.location}
            createdAt={format(new Date(currentUser.createdAt), "MMM d, yyyy")}
            followingCount={currentUser.following?.length || 0}
            followersCount={currentUser.followers?.length || 0}
          />
        </View>

        <PostsList username={currentUser.username} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
