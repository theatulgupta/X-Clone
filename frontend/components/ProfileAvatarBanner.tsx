import { View, Image, TouchableOpacity } from "react-native";
import React from "react";

interface ProfileAvatarBannerProps {
  banner: string;
  profilePicture: string;
  onEditProfile: () => void;
}

const ProfileAvatarBanner: React.FC<ProfileAvatarBannerProps> = ({
  banner,
  profilePicture,
  onEditProfile,
}) => (
  <>
    {/* BANNER */}
    <Image
      source={{ uri: banner }}
      className="w-full h-48"
      resizeMode="cover"
    />
    <View className="px-4 pb-4 border-b border-gray-100">
      <View className="flex-row justify-between items-end -mt-16 mb-4">
        <Image
          source={{ uri: profilePicture }}
          className="size-32 rounded-full border-4 border-white"
        />
        <TouchableOpacity
          className="border border-gray-300 px-6 py-2 rounded-full"
          onPress={onEditProfile}
        >
          {/* You can replace with a prop for button text if needed */}
        </TouchableOpacity>
      </View>
    </View>
  </>
);

export default React.memo(ProfileAvatarBanner);
