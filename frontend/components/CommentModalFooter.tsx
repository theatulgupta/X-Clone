import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

interface CommentModalFooterProps {
  currentUser: any;
  commentText: string;
  setCommentText: (text: string) => void;
  isCreatingComment: boolean;
  onReply: () => void;
}

const CommentModalFooter = ({
  currentUser,
  commentText,
  setCommentText,
  isCreatingComment,
  onReply,
}: CommentModalFooterProps) => (
  <View className="p-4 border-t border-gray-100">
    <View className="flex-row">
      <Image
        source={{ uri: currentUser?.profilePicture }}
        className="size-10 rounded-full mr-3"
      />
      <View className="flex-1">
        <TextInput
          className="border border-gray-200 rounded-lg p-3 text-base mb-3"
          placeholder="Write a comment..."
          value={commentText}
          onChangeText={setCommentText}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
        <TouchableOpacity
          className={`px-4 py-2 rounded-lg self-start ${
            commentText.trim() ? "bg-blue-500" : "bg-gray-300"
          }`}
          onPress={onReply}
          disabled={isCreatingComment || !commentText.trim()}
        >
          {isCreatingComment ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text
              className={`font-semibold ${
                commentText.trim() ? "text-white" : "text-gray-500"
              }`}
            >
              Reply
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default React.memo(CommentModalFooter);
