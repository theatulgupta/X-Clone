import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { EditProfileProps } from "@/hooks/useProfile";

const formFields = [
  {
    key: "firstName",
    label: "First Name",
    placeholder: "Your first name",
    multiline: false,
  },
  {
    key: "lastName",
    label: "Last Name",
    placeholder: "Your last name",
    multiline: false,
  },
  {
    key: "bio",
    label: "Bio",
    placeholder: "Tell us about yourself",
    multiline: true,
  },
  {
    key: "location",
    label: "Location",
    placeholder: "Where are you located?",
    multiline: false,
  },
] as const;

interface EditProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  formData: EditProfileProps;
  updateFormField: (field: keyof EditProfileProps, value: string) => void;
  saveProfile: () => void;
  isUpdating: boolean;
}

const EditProfileModal = ({
  isVisible,
  onClose,
  formData,
  updateFormField,
  saveProfile,
  isUpdating,
}: EditProfileModalProps) => {
  const handleSave = React.useCallback(() => {
    saveProfile();
  }, [saveProfile]);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={onClose}>
          <Text className="text-blue-500 text-lg">Cancel</Text>
        </TouchableOpacity>

        <Text className="text-lg font-semibold">Edit Profile</Text>

        <TouchableOpacity
          onPress={handleSave}
          disabled={isUpdating}
          className={`${isUpdating ? "opacity-50" : ""}`}
        >
          {isUpdating ? (
            <ActivityIndicator size={"small"} color={"#1DA1F2"} />
          ) : (
            <Text className="text-blue-500 text-lg font-semibold">Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="flex-col gap-3 space-y-4">
          {formFields.map(({ key, label, placeholder, multiline }) => (
            <View key={key}>
              <Text className="text-gray-500 text-sm mb-1">{label}</Text>
              <TextInput
                value={formData[key]}
                onChangeText={(text) =>
                  updateFormField(key as keyof EditProfileProps, text)
                }
                className="border border-gray-200 rounded-lg p-3 text-base"
                placeholder={placeholder}
                multiline={multiline}
                numberOfLines={multiline ? 3 : 1}
                textAlignVertical={multiline ? "top" : "center"}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default EditProfileModal;
