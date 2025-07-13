import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useCreatePost } from "@/hooks/useCreatePost";
import { useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";

function PostComposer() {
  const {
    content,
    setContent,
    selectedImage,
    isCreating,
    pickImageFromGallery,
    takePhoto,
    removeImage,
    createPost,
  } = useCreatePost();
  const { user } = useUser();

  return (
    <View className="border-b border-gray-100 p-4 bg-white">
      <View className="flex-row">
        <Image
          source={
            user?.imageUrl
              ? { uri: user.imageUrl }
              : require("../assets/images/default-avatar.png")
          }
          className="size-12 rounded-full mr-3"
        />
        <View className="flex-1">
          <TextInput
            className="text-gray-900 text-lg"
            placeholder="What's happening?"
            placeholderTextColor="#657786"
            multiline
            maxLength={280}
            value={content}
            onChangeText={setContent}
          />
        </View>
      </View>

      {selectedImage && (
        <View className="mt-3 ml-15">
          <View className="relative">
            <Image
              source={{ uri: selectedImage }}
              className="w-full h-48 rounded-2xl"
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={removeImage}
              className="absolute top-2 right-2 size-8 bg-black bg-opacity-50 rounded-full items-center justify-center"
            >
              <Feather name="x" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View className="flex-row justify-between items-center mt-3">
        <View className="flex-row">
          <TouchableOpacity onPress={pickImageFromGallery} className="mr-4">
            <Feather name="image" size={20} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto} className="mr-4">
            <Feather name="camera" size={20} color="#1DA1F2" />
          </TouchableOpacity>
        </View>

        {/* REMAINING CHARS INDICATOR */}
        {content.length > 0 && (
          <Text
            className={`text-xm mr-3 ${
              content.length > 260 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {280 - content.length}
          </Text>
        )}

        {/* POST BUTTON */}
        <TouchableOpacity
          onPress={createPost}
          disabled={isCreating || !(content.trim() || selectedImage)}
          className={`px-6 py-2 rounded-full ${
            content.trim() || selectedImage ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          {isCreating ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text
              className={`font-semibold ${
                content.trim() || selectedImage ? "text-white" : "text-gray-500"
              }`}
            >
              Post
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PostComposer;
