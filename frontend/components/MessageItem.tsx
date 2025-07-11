import React, { memo } from "react";
import { View, Text, Image } from "react-native";
import { ChatType, MessageType } from "@/data/chats";

interface MessageItemProps {
  chat: ChatType;
  message: MessageType;
}

const MessageItem = memo(function MessageItem({
  message,
  chat,
}: MessageItemProps) {
  return (
    <View className={`flex-row mb-3 ${message.fromUser ? "justify-end" : ""}`}>
      {!message.fromUser && (
        <Image
          source={{ uri: chat.user.avatar }}
          className="size-8 rounded-full mr-2 mt-1"
        />
      )}
      <View className={`flex-1 ${message.fromUser ? "items-end" : ""}`}>
        <View
          className={`rounded-2xl px-4 py-3 max-w-xs ${message.fromUser ? "bg-blue-500" : "bg-gray-100"}`}
        >
          <Text className={message.fromUser ? "text-white" : "text-gray-900"}>
            {message.text}
          </Text>
        </View>
        <Text className="text-xs text-gray-400 mt-1">{message.time}</Text>
      </View>
    </View>
  );
});

MessageItem.displayName = "MessageItem";

export default MessageItem;
