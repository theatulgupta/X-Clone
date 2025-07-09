import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "@/components/SignOutButton";
import { useSyncUser } from "@/hooks/useSyncUser";

const HomeScreen = () => {
  useSyncUser();
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <SignOutButton />
    </SafeAreaView>
  );
};

export default HomeScreen;
