import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ChatType } from "@/data/chats";

interface ChatItemProps {
  chat: ChatType;
  onPress: (chat: ChatType) => void;
  onDelete: (id: number) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, onPress, onDelete }) => (
  <TouchableOpacity
    onPress={() => onPress(chat)}
    activeOpacity={0.85}
    onLongPress={() => onDelete(chat.id)}
    className="flex-row items-center p-4 border-b border-gray-50 active:bg-gray-50"
  >
    <Image
      className="size-12 rounded-full mr-3"
      source={{ uri: chat.user.avatar }}
    />
    <View className="flex-1">
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center gap-1">
          <Text className="font-semibold text-gray-900">{chat.user.name}</Text>
          {chat.user.verified && (
            <Feather
              name="check-circle"
              size={16}
              color="#1DA1F2"
              className="ml-1"
            />
          )}
          <Text className="text-gray-500 text-sm ml-1">
            @{chat.user.username}
          </Text>
        </View>
        <Text className="text-gray-500 text-sm">{chat.time}</Text>
      </View>
      <Text className="text-gray-500 text-sm">{chat.lastMessage}</Text>
    </View>
  </TouchableOpacity>
);

export default ChatItem;
