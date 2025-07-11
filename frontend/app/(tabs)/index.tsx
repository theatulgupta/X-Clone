import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
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

const HomeScreen = () => {
  useSyncUser();
  const insets = useSafeAreaInsets();
  const keyboardVerticalOffset = Platform.OS === "ios" ? insets.top + 44 : 0;
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 18 }}
        >
          <PostComposer />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
