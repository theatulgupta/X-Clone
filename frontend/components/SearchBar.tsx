import React from "react";
import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  setSearchText,
  placeholder,
}) => (
  <View className="px-4 py-2.5 border-b border-gray-100">
    <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
      <Feather name="search" size={20} color="#657786" />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#657786"
        className="flex-1 ml-3 text-base"
        value={searchText}
        onChangeText={setSearchText}
        accessible={true}
        accessibilityLabel="Search Twitter"
        accessibilityHint="Enter keywords to search for tweets and topics"
      />
    </View>
  </View>
);

export default SearchBar;
