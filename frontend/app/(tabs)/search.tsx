import React, { useCallback, useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrendingItem, {
  TRENDING_TOPICS,
  TrendingProps,
} from "@/components/TrendingItem";
import SearchBar from "@/components/SearchBar";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const renderItem = useCallback(
    ({ item }: { item: TrendingProps }) => (
      <TrendingItem
        topic={item.topic}
        tweets={item.tweets}
        onPress={() => {
          // Handle topic selection, e.g., navigate to topic details
        }}
        accessible={true}
        accessibilityLabel={`Trending topic ${item.topic} with ${item.tweets} tweets`}
        accessibilityRole="button"
      />
    ),
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* HEADER */}
      <SearchBar
        searchText={searchQuery}
        setSearchText={setSearchQuery}
        placeholder="Search twitter"
      />

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
