import { useClerk } from "@clerk/clerk-expo";
import { Alert } from "react-native";
import { useCallback } from "react";

export const useSignOut = () => {
  const { signOut } = useClerk();

  const handleSignOut = useCallback(async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
          } catch (error) {
            console.error("Sign out error:", error);
            Alert.alert("Error", "Failed to sign out. Please try again.");
          }
        },
      },
    ]);
  }, [signOut]);
  return { handleSignOut };
};
