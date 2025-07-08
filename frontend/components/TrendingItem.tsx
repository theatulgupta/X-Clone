import { Text, TouchableOpacity } from "react-native";

import type { AccessibilityRole } from "react-native";

export type TrendingProps = {
  topic: string;
  tweets: string;
  onPress?: () => void;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
};

export const TRENDING_TOPICS: TrendingProps[] = [
  { topic: "#ReactNative", tweets: "125k" },
  { topic: "#TypeScript", tweets: "89k" },
  { topic: "#ExpoGo", tweets: "74k" },
  { topic: "#TanstackQuery", tweets: "70k" },
  { topic: "#MobileDev", tweets: "65k" },
  { topic: "#NextJS", tweets: "105k" },
  { topic: "#GraphQL", tweets: "98k" },
  { topic: "#TailwindCSS", tweets: "112k" },
  { topic: "#ViteJS", tweets: "60k" },
  { topic: "#Zustand", tweets: "54k" },
  { topic: "#Prisma", tweets: "77k" },
  { topic: "#Supabase", tweets: "84k" },
  { topic: "#ExpoRouter", tweets: "68k" },
  { topic: "#Firebase", tweets: "102k" },
  { topic: "#ClerkAuth", tweets: "51k" },
];

export const TrendingItem = ({
  topic,
  tweets,
  onPress,
  accessible = true,
  accessibilityLabel,
  accessibilityRole = "button",
}: TrendingProps) => (
  <TouchableOpacity
    className="py-3 border-b border-gray-100"
    onPress={onPress}
    accessible={accessible}
    accessibilityLabel={
      accessibilityLabel ?? `Trending topic ${topic} with ${tweets} tweets`
    }
    accessibilityRole={accessibilityRole}
  >
    <Text className="text-gray-500 text-sm">Trending Topic</Text>
    <Text className="text-gray-900 text-lg font-semibold">{topic}</Text>
    <Text className="text-gray-500 text-sm">{tweets} Tweets</Text>
  </TouchableOpacity>
);
