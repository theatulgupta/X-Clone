import { useComments } from "@/hooks/useComments";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Post } from "@/types";
import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import CommentItem from "./CommentItem";
import CommentModalHeader from "./CommentModalHeader";
import CommentModalFooter from "./CommentModalFooter";

interface CommentsModalProps {
  selectedPost: Post;
  onClose: () => void;
}

const CommentsModal = React.memo(
  ({ selectedPost, onClose }: CommentsModalProps) => {
    const { commentText, setCommentText, createComment, isCreatingComment } =
      useComments();
    const { currentUser } = useCurrentUser();

    const handleClose = () => {
      onClose();
      setCommentText("");
    };

    return (
      <Modal
        visible={!!selectedPost}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        {/* MODAL HEADER */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
          <TouchableOpacity onPress={handleClose}>
            <Text className="text-blue-500 text-lg">Close</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold">Comments</Text>
          <View className="w-12" />
        </View>

        {selectedPost && (
          <FlatList
            className="flex-1"
            ListHeaderComponent={<CommentModalHeader post={selectedPost} />}
            data={selectedPost.comments}
            keyExtractor={(comment) => comment._id}
            renderItem={({ item: comment }) => (
              <CommentItem comment={comment} />
            )}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews
            getItemLayout={(_data, index) => ({
              length: 80,
              offset: 80 * index,
              index,
            })}
            ListFooterComponent={
              <CommentModalFooter
                currentUser={currentUser}
                commentText={commentText}
                setCommentText={setCommentText}
                isCreatingComment={isCreatingComment}
                onReply={() => createComment(selectedPost._id)}
              />
            }
          />
        )}
      </Modal>
    );
  }
);

CommentsModal.displayName = "CommentsModal";

export default CommentsModal;
