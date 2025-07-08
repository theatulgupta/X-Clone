import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { ChatType, MessageType } from "@/data/chats";
import MessageItem from "@/components/MessageItem";
import ChatInput from "@/components/ChatInput";

interface ChatModalProps {
  visible: boolean;
  onClose: () => void;
  selectedChat: ChatType | null;
  newMessage: string;
  setNewMessage: (msg: string) => void;
  sendMessage: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({
  visible,
  onClose,
  selectedChat,
  newMessage,
  setNewMessage,
  sendMessage,
}) => (
  <Modal
    visible={visible}
    onRequestClose={onClose}
    animationType="slide"
    presentationStyle="pageSheet"
  >
    {selectedChat && (
      <SafeAreaView className="flex-1">
        {/* CHAT HEADER */}
        <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
          <TouchableOpacity onPress={onClose}>
            <Feather name="arrow-left" size={24} color="#1DA1F2" />
          </TouchableOpacity>
          <Image
            source={{ uri: selectedChat.user.avatar }}
            className="size-10 rounded-full mr-3 ml-1"
          />
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text className="font-semibold text-gray-900 mr-1">
                {selectedChat.user.name}
              </Text>
              {selectedChat.user.verified && (
                <Feather name="check-circle" size={16} color="#1DA1F2" />
              )}
            </View>
            <Text className="text-gray-500 text-sm">
              @{selectedChat.user.username}
            </Text>
          </View>
        </View>

        {/* CHAT MESSAGES */}
        <FlatList
          data={[{ id: "intro", type: "intro" }, ...selectedChat.messages]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            if ("type" in item && item.type === "intro") {
              return (
                <View className="my-4">
                  <Text className="text-center text-gray-400 text-sm mb-4">
                    This is the beginning of your conversation with{" "}
                    {selectedChat.user.name}
                  </Text>
                </View>
              );
            }
            return (
              <MessageItem message={item as MessageType} chat={selectedChat} />
            );
          }}
          contentContainerStyle={{ flexGrow: 1, padding: 4 }}
        />

        {/* CHAT INPUT */}
        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
        />
      </SafeAreaView>
    )}
  </Modal>
);

export default ChatModal;
