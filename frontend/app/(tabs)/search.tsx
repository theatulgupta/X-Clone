import { FlatList, Text, TextInput, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import {
  TRENDING_TOPICS,
  TrendingItem,
  TrendingProps,
} from "@/components/TrendingItem";

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
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center justify-between bg-gray-100 rounded-full px-4 py-2">
          <Feather name="search" size={20} color="#657786" />
          <TextInput
            placeholder="Search Twitter"
            placeholderTextColor="#657786"
            className="flex-1 ml-3 text-base"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => {
              // Handle search
            }}
            accessible={true}
            accessibilityLabel="Search Twitter"
            accessibilityHint="Enter keywords to search for tweets and topics"
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
