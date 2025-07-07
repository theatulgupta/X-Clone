import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useSocialAuth } from "@/hooks/useSocialAuth";

const Index = () => {
  const { isLoading, handleSocialAuth } = useSocialAuth();
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-8 justify-between">
        <View className="flex-1 justify-center">
          {/* DEMO IMAGE */}
          <View className="items-center">
            <Image
              className="size-96"
              resizeMode="contain"
              source={require("../../assets/images/auth2.png")}
            />
          </View>

          {/* BUTTONS */}
          <View className="flex-col gap-2 ">
            {/* GOOGLE SIGNIN */}
            <TouchableOpacity
              className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6"
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0.5 },
                shadowOpacity: 0.1,
                shadowRadius: 1,
                elevation: 2,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#4285F4" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    className="size-10 mr-3"
                    resizeMode="contain"
                    source={require("../../assets/images/google.png")}
                  />
                  <Text className="text-black font-medium text-base">
                    Continue with Google
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* APPLE SIGNIN */}
            <TouchableOpacity
              className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6"
              onPress={() => handleSocialAuth("oauth_apple")}
              disabled={isLoading}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0.5 },
                shadowOpacity: 0.1,
                shadowRadius: 1,
                elevation: 2,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size={"small"} color={"#000"} />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    className="size-8 mr-3"
                    resizeMode="contain"
                    source={require("../../assets/images/apple.png")}
                  />
                  <Text className="text-black font-medium text-base">
                    Continue with Apple
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Terms and Conditions */}
          <Text className="text-center text-xs text-gray-500 leading-4 mt-6 px-2">
            By signing up, you agree to our <Text>Terms</Text>
            {", "}
            <Text className="text-blue-500 font-medium">Privacy Policy</Text>
            {", and "}
            <Text className="text-blue-500 font-medium">Cookie Use</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Index;
