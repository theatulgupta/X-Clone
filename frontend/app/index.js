import { View, Text, Button } from "react-native";
import { useClerk } from "@clerk/clerk-expo";

const HomeScreen = () => {
  const { signOut } = useClerk();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button onPress={() => signOut()} title="Sign Out">
        Logout
      </Button>
    </View>
  );
};

export default HomeScreen;
