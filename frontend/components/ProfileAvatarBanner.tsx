import { View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";

interface ProfileAvatarBannerProps {
  banner: string;
  profilePicture: string;
  onEditProfile: () => void;
}

const FALLBACK_BANNER =
  "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const FALLBACK_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=E5E7EB&color=374151&size=128";

const ProfileAvatarBanner: React.FC<ProfileAvatarBannerProps> = ({
  banner,
  profilePicture,
  onEditProfile,
}) => {
  const [bannerSrc, setBannerSrc] = React.useState(banner);
  const [avatarSrc, setAvatarSrc] = React.useState(profilePicture);

  const handleBannerError = () => setBannerSrc(FALLBACK_BANNER);
  const handleAvatarError = () => setAvatarSrc(FALLBACK_AVATAR);

  return (
    <>
      {/* BANNER */}
      <Image
        source={{ uri: bannerSrc }}
        className="w-full h-48"
        resizeMode="cover"
        onError={handleBannerError}
      />
      <View className="px-4 pb-4 border-b border-gray-100">
        <View className="flex-row justify-between items-end -mt-16 mb-4">
          <Image
            source={{ uri: avatarSrc }}
            className="size-32 rounded-full border-4 border-white"
            onError={handleAvatarError}
          />
          <TouchableOpacity
            className="border border-gray-300 px-6 py-2 rounded-full"
            onPress={onEditProfile}
          >
            <Text className="font-semibold text-gray-900">Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default React.memo(ProfileAvatarBanner);
