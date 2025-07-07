import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const TRENDING_TOPICS = [
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

type TrendingProps = {
  topic: string;
  tweets: string;
};

const SearchScreen = () => {
  const renderItem = ({ item }: { item: TrendingProps }) => {
    const { topic, tweets } = item;
    return (
      <TouchableOpacity className="py-3 border-b border-gray-100">
        <Text className="text-gray-500 text-sm">Trending Topic</Text>
        <Text className="text-gray-900 text-lg font-semibold">{topic}</Text>
        <Text className="text-gray-500 text-sm">{tweets} Tweets</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center justify-between bg-gray-100 rounded-full px-4 py-2">
          <Feather name="search" size={20} color="#657786" />
          <TextInput
            placeholder="Search Twitter"
            placeholderTextColor="#657786"
            className="flex-1 ml-3 text-base"
          />
        </View>
      </View>

      {/* TRENDING TOPICS */}
      <FlatList
        data={TRENDING_TOPICS}
        renderItem={renderItem}
        keyExtractor={(item) => item.topic}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Trending for you
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
