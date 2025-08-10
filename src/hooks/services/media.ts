import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

// Simple types for the hook
export type ImagePickerResult = {
  uri: string;
  type: string;
  name: string;
  size?: number;
};

export type ImagePickerOptions = {
  quality?: number;
  allowsEditing?: boolean;
  aspect?: [number, number];
};

export type UseImagePickerReturn = {
  isLoading: boolean;
  pickFromGallery: (
    options?: ImagePickerOptions
  ) => Promise<ImagePickerResult | null>;
  pickFromCamera: (
    options?: ImagePickerOptions
  ) => Promise<ImagePickerResult | null>;
};

// Default options
const defaultOptions: ImagePickerOptions = {
  quality: 0.8,
  allowsEditing: true,
  aspect: [4, 3],
};

export const useMedia = (): UseImagePickerReturn => {
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to process image result
  const processImageResult = (
    result: ImagePicker.ImagePickerResult
  ): ImagePickerResult | null => {
    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }

    const asset = result.assets[0];
    return {
      uri: asset.uri,
      type: asset.type || "image/jpeg",
      name: asset.fileName || `image_${Date.now()}.jpg`,
      size: asset.fileSize,
    };
  };

  // Pick image from gallery
  const pickFromGallery = async (
    options: ImagePickerOptions = {}
  ): Promise<ImagePickerResult | null> => {
    try {
      setIsLoading(true);

      // Request permission
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photo library to select images."
        );
        return null;
      }

      const mergedOptions = { ...defaultOptions, ...options };

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: mergedOptions.allowsEditing,
        aspect: mergedOptions.aspect,
        quality: mergedOptions.quality,
      });

      return processImageResult(result);
    } catch (error) {
      Alert.alert("Error", "Failed to pick image from gallery");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Pick image from camera
  const pickFromCamera = async (
    options: ImagePickerOptions = {}
  ): Promise<ImagePickerResult | null> => {
    try {
      setIsLoading(true);

      // Request permission
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please allow access to your camera to take photos."
        );
        return null;
      }

      const mergedOptions = { ...defaultOptions, ...options };

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: mergedOptions.allowsEditing,
        aspect: mergedOptions.aspect,
        quality: mergedOptions.quality,
      });

      return processImageResult(result);
    } catch (error) {
      Alert.alert("Error", "Failed to take photo");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    pickFromGallery,
    pickFromCamera,
  };
};
