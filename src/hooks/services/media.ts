// import { useState } from "react";
// import * as ImagePicker from "expo-image-picker";
// import { Alert } from "react-native";

// // Simple types for the hook
// export type ImagePickerResult = {
//   uri: string;
//   type: string;
//   name: string;
//   size?: number;
// };

// export type ImagePickerOptions = {
//   quality?: number;
//   allowsEditing?: boolean;
//   aspect?: [number, number];
// };

// export type UseImagePickerReturn = {
//   isLoading: boolean;
//   pickFromGallery: (
//     options?: ImagePickerOptions
//   ) => Promise<ImagePickerResult | null>;
//   pickFromCamera: (
//     options?: ImagePickerOptions
//   ) => Promise<ImagePickerResult | null>;
// };

// // Default options
// const defaultOptions: ImagePickerOptions = {
//   quality: 0.8,
//   allowsEditing: true,
//   aspect: [4, 3],
// };

// export const useMedia = (): UseImagePickerReturn => {
//   const [isLoading, setIsLoading] = useState(false);

//   // Helper function to process image result
//   const processImageResult = (
//     result: ImagePicker.ImagePickerResult
//   ): ImagePickerResult | null => {
//     if (result.canceled || !result.assets || result.assets.length === 0) {
//       return null;
//     }

//     const asset = result.assets[0];
//     return {
//       uri: asset.uri,
//       type: asset.type || "image/jpeg",
//       name: asset.fileName || `image_${Date.now()}.jpg`,
//       size: asset.fileSize,
//     };
//   };

//   // Pick image from gallery
//   const pickFromGallery = async (
//     options: ImagePickerOptions = {}
//   ): Promise<ImagePickerResult | null> => {
//     try {
//       setIsLoading(true);

//       // Request permission
//       const permission =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (permission.status !== "granted") {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your photo library to select images."
//         );
//         return null;
//       }

//       const mergedOptions = { ...defaultOptions, ...options };

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ["images"],
//         allowsEditing: mergedOptions.allowsEditing,
//         aspect: mergedOptions.aspect,
//         quality: mergedOptions.quality,
//       });

//       return processImageResult(result);
//     } catch (error) {
//       Alert.alert("Error", "Failed to pick image from gallery");
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Pick image from camera
//   const pickFromCamera = async (
//     options: ImagePickerOptions = {}
//   ): Promise<ImagePickerResult | null> => {
//     try {
//       setIsLoading(true);

//       // Request permission
//       const permission = await ImagePicker.requestCameraPermissionsAsync();
//       if (permission.status !== "granted") {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your camera to take photos."
//         );
//         return null;
//       }

//       const mergedOptions = { ...defaultOptions, ...options };

//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ["images"],
//         allowsEditing: mergedOptions.allowsEditing,
//         aspect: mergedOptions.aspect,
//         quality: mergedOptions.quality,
//       });

//       return processImageResult(result);
//     } catch (error) {
//       Alert.alert("Error", "Failed to take photo");
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     isLoading,
//     pickFromGallery,
//     pickFromCamera,
//   };
// };

import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

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

// Default options for ~50KB output
const defaultOptions: ImagePickerOptions = {
  quality: 0.2, // Lower quality for smaller file size
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
    const name = asset.fileName
      ? asset.fileName.toLowerCase().endsWith(".jpg") ||
        asset.fileName.toLowerCase().endsWith(".jpeg")
        ? asset.fileName
        : `${asset.fileName}.jpg`
      : `image_${Date.now()}.jpg`;

    const imageResult = {
      uri: asset.uri,
      type: "image/jpeg", // Force JPEG to match Android
      name,
      size: asset.fileSize,
    };

    console.log("Processed image:", imageResult); // Log to verify size
    return imageResult;
  };

  // Pick image from gallery
  const pickFromGallery = async (
    options: ImagePickerOptions = {}
  ): Promise<ImagePickerResult | null> => {
    try {
      setIsLoading(true);

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
        mediaTypes: ["images"],
        allowsEditing: mergedOptions.allowsEditing,
        aspect: mergedOptions.aspect,
        quality: mergedOptions.quality,
        exif: false, // Exclude EXIF to reduce size
        base64: false, // Avoid base64 to keep memory low
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
        mediaTypes: ["images"],
        allowsEditing: mergedOptions.allowsEditing,
        aspect: mergedOptions.aspect,
        quality: mergedOptions.quality,
        exif: false, // Exclude EXIF
        base64: false,
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
