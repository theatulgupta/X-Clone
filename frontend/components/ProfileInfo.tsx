import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

interface ProfileInfoProps {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  location: string;
  createdAt: string;
  followingCount: number;
  followersCount: number;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  firstName,
  lastName,
  username,
  bio,
  location,
  createdAt,
  followingCount,
  followersCount,
}) => (
  <View className="mb-4">
    <View className="flex-row items-center mb-1">
      <Text className="text-xl font-bold text-gray-900 mr-1">
        {firstName} {lastName}
      </Text>
      <Feather name="check-circle" size={16} color="#1DA1F2" />
    </View>
    <Text className="text-gray-500 mb-2">@{username}</Text>
    <Text className="text-gray-900 mb-3">{bio}</Text>
    <View className="flex-row items-center mb-1">
      <Feather
        name="map-pin"
        size={16}
        color="#657786"
        accessibilityLabel="Location"
      />
      <Text className="text-gray-500 ml-2">{location}</Text>
    </View>
    <View className="flex-row items-center mb-2">
      <Feather
        name="calendar"
        size={16}
        color="#657786"
        accessibilityLabel="Join date"
      />
      <Text className="text-gray-500 ml-2">Joined {createdAt}</Text>
    </View>
    <View className="flex-row ml-[2px]">
      <Text className="text-gray-900 mr-3">
        <Text className="font-bold">{followingCount}</Text>
        <Text className="text-gray-500"> Following</Text>
      </Text>
      <Text className="text-gray-900">
        <Text className="font-bold">{followersCount}</Text>
        <Text className="text-gray-500"> Followers</Text>
      </Text>
    </View>
  </View>
);

export default React.memo(ProfileInfo);
