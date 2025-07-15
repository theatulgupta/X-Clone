import { View, Text } from "react-native";
import React from "react";
import SignOutButton from "./SignOutButton";

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  postCount: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  firstName,
  lastName,
  postCount,
}) => (
  <View
    className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100"
    accessibilityRole="header"
  >
    <View>
      <Text
        className="text-xl font-bold text-gray-900"
        accessibilityRole="header"
      >
        {firstName} {lastName}
      </Text>
      <Text
        className="text-gray-500 text-sm"
        accessibilityLabel={`${postCount} posts`}
      >
        {postCount} posts
      </Text>
    </View>
    <SignOutButton />
  </View>
);

export default React.memo(ProfileHeader);
