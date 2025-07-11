import React, { memo } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (msg: string) => void;
  sendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = memo(
  ({ newMessage, setNewMessage, sendMessage }) => (
    <View className="flex-row items-center px-4 py-3 border-t border-gray-100">
      <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2 mr-3">
        <TextInput
          className="flex-1 text-base pb-2"
          placeholder="Start typing a message..."
          placeholderTextColor="#657786"
          value={newMessage}
          onChangeText={setNewMessage}
          accessible={true}
          accessibilityLabel="Type a message"
          multiline
        />
      </View>
      <TouchableOpacity
        onPress={sendMessage}
        disabled={!newMessage.trim()}
        className={`size-10 rounded-full items-center justify-center ${
          newMessage.trim() ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <Feather name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  )
);

ChatInput.displayName = "ChatInput";

export default ChatInput;
