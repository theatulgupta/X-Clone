import { Alert, Text, TouchableOpacity, View, FlatList } from "react-native";
import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ChatType, CHATS, MessageType } from "@/data/chats";
import { Feather } from "@expo/vector-icons";
import ChatItem from "../../components/ChatItem";
import SearchBar from "@/components/SearchBar";
import ChatModal from "@/components/ChatModal";

const MessagesScreen = () => {
  const insets = useSafeAreaInsets();

  const [searchText, setSearchText] = useState("");
  const [chatsList, setChatsList] = useState(CHATS);
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const deleteChat = useCallback((chatId: number) => {
    Alert.alert("Delete Chat", "Are you sure you want to delete this chat?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setChatsList((prevChats) =>
            prevChats.filter((chat) => chat.id !== chatId)
          );
        },
      },
    ]);
  }, []);

  const openChat = useCallback((chat: ChatType) => {
    setIsChatOpen(true);
    setSelectedChat(chat);
  }, []);

  const closeChat = useCallback(() => {
    setSelectedChat(null);
    setNewMessage("");
    setIsChatOpen(false);
  }, []);

  const sendMessage = useCallback(() => {
    if (newMessage.trim() && selectedChat) {
      try {
        const newTimestamp = new Date();
        const newMsg: MessageType = {
          id: Date.now() + Math.random(),
          text: newMessage.trim(),
          fromUser: true,
          timestamp: newTimestamp,
          time: "Just now",
        };

        let updatedChatsList: ChatType[] = [];

        setChatsList((prevChats) => {
          updatedChatsList = prevChats.map((chat) =>
            chat.id === selectedChat.id
              ? {
                  ...chat,
                  messages: [...chat.messages, newMsg],
                  lastMessage: newMessage.trim(),
                  timestamp: newTimestamp,
                  time: "Just now",
                }
              : chat
          );
          return updatedChatsList;
        });

        // Update selectedChat from the updated chatsList
        setSelectedChat(
          (prev) =>
            updatedChatsList.find((chat) => chat.id === prev?.id) || null
        );

        setNewMessage("");
        // Consider: Only show alert for first message or remove entirely
      } catch (error) {
        Alert.alert("Error", "Failed to send message. Please try again.");
        console.error("Error sending message:", error);
      }
    }
  }, [newMessage, selectedChat]);

  // Filter chats by search text
  const filteredChats = chatsList.filter(
    (chat) =>
      chat.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <Text className="text-xl font-bold text-gray-900">Messages</Text>
        <TouchableOpacity>
          <Feather name="edit" size={20} color="#1DA1F2" />
        </TouchableOpacity>
      </View>

      {/* SEARCHBAR */}
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        placeholder="Search for people and groups"
      />

      {/* CHATS LIST */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ChatItem chat={item} onPress={openChat} onDelete={deleteChat} />
        )}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      {/* QUICK ACTIONS */}
      <View className="bg-gray-50 py-2 border-t border-gray-100 ">
        <Text className="text-xs text-gray-500 text-center">
          Tap to open • Long press to delete
        </Text>
      </View>

      {/* CHAT MODAL */}
      <ChatModal
        visible={isChatOpen}
        onClose={closeChat}
        selectedChat={selectedChat}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;
