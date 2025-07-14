import {
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNotifications } from "@/hooks/useNotifications";
import { Feather } from "@expo/vector-icons";
import NoNotificationsView from "@/components/NoNotificationsView";
import NotificationCard from "@/components/NotificationCard";
import { Notification } from "@/types";

const NotificationsScreen = () => {
  const {
    notifications,
    isLoading,
    error,
    refetch,
    isRefetching,
    deleteNotification,
  } = useNotifications();

  const insets = useSafeAreaInsets();

  // Memoize keyExtractor for FlatList
  const keyExtractor = React.useCallback((item: Notification) => item._id, []);

  // Memoize onDelete callback for each notification
  const renderItem = React.useCallback(
    ({ item }: { item: Notification }) => {
      const handleDelete = () => deleteNotification(item._id);
      return <NotificationCard notification={item} onDelete={handleDelete} />;
    },
    [deleteNotification]
  );

  // Optional: FlatList getItemLayout for better performance (fixed height estimate)
  const getItemLayout = React.useCallback(
    (_: any, index: number) => ({
      length: 110, // estimated average height of a notification card
      offset: 110 * index,
      index,
    }),
    []
  );

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <Text className="text-gray-500 mb-4">Failed to load notifications</Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => refetch()}
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <Text className="text-xl font-bold text-gray-900">Notifications</Text>
        <TouchableOpacity>
          <Feather name="settings" size={24} color="#657786" />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center p-8">
          <ActivityIndicator size="large" color="#1DA1F2" />
          <Text className="text-gray-500 mt-4">Loading notifications...</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          contentContainerStyle={{
            paddingBottom: 100 + insets.bottom,
            flexGrow: notifications.length === 0 ? 1 : undefined,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={"#1DA1F2"}
            />
          }
          ListEmptyComponent={<NoNotificationsView />}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={7}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationsScreen;
