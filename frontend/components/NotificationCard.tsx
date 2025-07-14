import { View, Text, Alert, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Notification } from "@/types";
import { AntDesign, FontAwesome, Entypo, Feather } from "@expo/vector-icons";
import { formatDate } from "@/utils/formatters";

interface NotificationCardProps {
  notification: Notification;
  onDelete: (notificationId: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onDelete,
}: NotificationCardProps) => {
  const getNotificationText = () => {
    const name = `${notification.from.firstName} ${notification.from.lastName}`;
    switch (notification.type) {
      case "like":
        return `${name} liked your post.`;
      case "comment":
        return `${name} commented on your post.`;
      case "follow":
        return `${name} started following you.`;
      default:
        return "";
    }
  };

  const getNotificationIcon = () => {
    switch (notification.type) {
      case "like":
        return <AntDesign name="heart" size={16} color="#E0245E" />;
      case "comment":
        return <FontAwesome name="comment" size={16} color="#1DA1F2" />;
      case "follow":
        return <Entypo name="add-user" size={16} color="#17BF63" />;
      default:
        return <FontAwesome name="bell" size={16} color="#657786" />;
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(notification._id),
        },
      ]
    );
  };

  return (
    <View className="border-b border-gray-100 bg-white">
      <View className="flex-row p-4">
        <View className="relative mr-3">
          <View>
            <Image
              source={{ uri: notification.from.profilePicture }}
              className="size-12 rounded-full"
            />
            <View className="absolute -right-2 -bottom-1 size-6 items-center justify-center">
              {getNotificationIcon()}
            </View>
          </View>
        </View>

        <View className="flex-1">
          <View className="flex-row items-start justify-between mb-1">
            <View className="flex-1">
              <Text className="text-gray-900 text-base leading-5 mb-1">
                <Text className="font-semibold ">
                  {notification.from.firstName} {notification.from.lastName}
                </Text>
                <Text className="text-gray-500">
                  {" "}
                  @{notification.from.username}
                </Text>
              </Text>
              <Text className="text-gray-700 text-sm mb-2">
                {getNotificationText()}
              </Text>
            </View>
            <TouchableOpacity className="ml-2 p-1" onPress={handleDelete}>
              <Feather name="trash" size={16} color="#E0245E" />
            </TouchableOpacity>
          </View>
          {notification.post && (
            <View className="bg-gray-50 rounded-lg p-3 mb-2">
              <Text className="text-gray-700 text-sm mb-1">
                {notification.post.content}
              </Text>
              {notification.post.image && (
                <Image
                  source={{ uri: notification.post.image }}
                  className="w-full h-48 rounded-lg mt-2"
                  resizeMode="cover"
                />
              )}
            </View>
          )}

          {notification.comment && (
            <View className="bg-blue-50 rounded-lg p-3 mb-2">
              <Text className="text-gray-600 text-xs mb-1">Comment</Text>
              <Text className="text-gray-700 text-sm" numberOfLines={2}>
                &ldquo;{notification.comment.content}&rdquo;
              </Text>
            </View>
          )}

          <Text className="text-gray-400 text-xs">
            {formatDate(notification.createdAt)} ago
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;
