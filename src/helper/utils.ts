import { QueryClient } from "@tanstack/react-query";
import * as Network from "expo-network";
import moment from "moment";
import { Alert, Linking, Platform } from "react-native";
import { ModalMessageProvider, showFlashMsg } from "./ui-utils";
import { apiGetUserNotificationsResponse } from "@src/api/types/app";
import _ from "lodash";
import * as SecureStore from "expo-secure-store";
import VersionCheck from "react-native-version-check";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
/**
 * @returns boolean status of the internetConnection
 */
export const getNetworkStatus = async () => {
  const status = await Network.getNetworkStateAsync();
  return {
    isNetworkConnectedAndReachable: status.isInternetReachable,
  };
};

/**
 * logs the response from the API only in development mode
 * @param status
 * @param success
 * @param code
 * @param message
 */

export const APILogger = (
  status: number,
  success: boolean,
  code: string,
  message: string
) => {
  /* eslint-disable no-console */
  if (__DEV__) {
    console.log("🚀 Response Log:");
    console.log("Status:", status);
    console.log("Success:", success);
    console.log("Code:", code);
    console.log("Message:", message);
  }
  /* eslint-enable no-console */
};

/**
 * Extracts the first capitalized word segment from a PascalCase or CamelCase string.
 *
 * This function detects the second capital letter and returns the part of the string
 * before it. Useful for splitting strings like "WordClass" → "Word".
 *
 * @param word - The input PascalCase or CamelCase string.
 * @returns The first word segment (up to the second capital letter).
 *
 * @example
 * getFirstCapitalSegment("UserModel"); // "User"
 * getFirstCapitalSegment("GetUserData"); // "Get"
 * getFirstCapitalSegment("Service"); // "Service" (only one capital word)
 */
export const getFirstCapitalSegment = (word: string): string => {
  const match = word.match(/[A-Z][a-z]*/g);
  if (!match) return word; // fallback if no capital letters found
  return match[0]; // return the first word
};

export const formatApiErrorMessage = (error: any): string => {
  const generalMessage = error?.message ?? "An error occurred.";
  const fieldErrors = error?.fields;

  const formattedFieldMessages = fieldErrors
    ? Object.values(fieldErrors).flat().join(" ")
    : "";

  return [generalMessage, formattedFieldMessages].filter(Boolean).join(" ");
};

/**
 * Removes all "+" signs from the given string.
 *
 * @param input - The string to clean.
 * @returns A new string with all "+" signs removed.
 *
 * @example
 * removePlusSign("+2348012345678") // "2348012345678"
 * removePlusSign("Hello+World") // "HelloWorld"
 */
export const removePlusSign = (input: string): string => {
  return input.replace(/\+/g, "");
};

/**
 * Removes the country code (1–3 digits, with or without "+") from a phone number string.
 * Works for most international formats (e.g., +234, 234, +1, +44, etc.).
 *
 * @param phone - The phone number string (e.g., "+2349076544958" or "2349076544958")
 * @returns The phone number without the country code (e.g., "9076544958")
 */
export const removeCountryCode = (phone: string): string => {
  phone = phone.toString().replace(/\s+/g, ""); // remove spaces

  // Remove leading "+" if present
  if (phone.startsWith("+")) {
    phone = phone.slice(1);
  }

  // For most countries, country codes are 1–3 digits
  // So remove up to first 3 digits, leaving the rest
  return phone.replace(/^\d{1,3}/, "");
};

/**
 * Combines country dial code with user input (phone number)
 * Removes +, trims leading 0 from phone, and returns a full international format
 * @param dialCode e.g. "+234"
 * @param number e.g. "08012345678"
 * @returns e.g. "+2348012345678"
 */
export const formatPhoneWithCountryCode = (
  dialCode: string,
  number: string
): string => {
  const cleanedDialCode = dialCode.replace(/\+/g, "");
  const cleanedNumber = number.replace(/^0+/, ""); // remove leading zero(s)
  return `+${cleanedDialCode}${cleanedNumber}`;
};
/**
 *
 * @param amount e.g. 1000
 * @returns 1,000
 */
export const formatAmountWithCommas = (amount: number) => {
  const amtStr = amount.toString();
  const formattedAmt = amtStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedAmt;
};

export const extractTextFromHtml = (htmlText: string): string => {
  // Remove all HTML tags
  const withoutTags = htmlText.replace(/<\/?[^>]+(>|$)/g, "");

  // Decode basic HTML entities (optional step)
  const text = withoutTags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  // Trim and normalize spaces
  return text.replace(/\s+/g, " ").trim();
};

/**
 * truncates text by default to length of 10 characters or by length of choice.
 * @param text
 * @param length
 * @returns
 */

export const truncateText = (text: string, length = 10): string => {
  if (!text) return "...";

  const limit = Math.max(0, length);
  return text.length > limit ? `${text.substring(0, limit).trim()}...` : text;
};

export const getDateStringVal = (dateVal: string, showDateTime?: boolean) => {
  if (!dateVal || isNaN(new Date(dateVal).getTime())) {
    return "Invalid date";
  }

  const date = new Date(dateVal); // do not append anything!

  const year = date.getFullYear();
  const monthName = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();

  const getOrdinal = (n: number): string => {
    if (n > 3 && n < 21) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  // Function to format time in 12-hour format
  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12

    // Add leading zero to minutes if needed
    const minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();

    return `${hours}:${minutesStr} ${ampm}`;
  };

  if (showDateTime) {
    const timeString = formatTime(date);
    return `${timeString}`;
  } else {
    return `${getOrdinal(day)} ${monthName}, ${year}`;
  }
};

/**
 * ✅ NEW: Helper to group messages by date
 *  */
export const groupMessagesByDate = (messages: any) => {
  const grouped: any = {};

  messages.forEach((msg: any) => {
    const dateKey = moment(msg.created_at).format("YYYY-MM-DD");
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(msg);
  });

  return Object.keys(grouped).map((date) => ({
    date,
    data: grouped[date],
  }));
};

/**
 * Helps to fix broken url returned from the server
 * @param url takes the value of the wrong URL
 * @returns the right URL as in https:// instead of /storage://....
 */
export const fixImageUrl = (url: string) => {
  if (!url) return "";

  // Remove /storage/ prefix if present
  if (url.startsWith("/storage/")) {
    return url.replace("/storage/", "");
  }

  // Find the last occurrence of https:// or http://
  const lastHttpsIndex = url.lastIndexOf("https://");
  const lastHttpIndex = url.lastIndexOf("http://");

  // Use whichever is found later in the string
  const lastIndex = Math.max(lastHttpsIndex, lastHttpIndex);

  if (lastIndex > 0) {
    return url.substring(lastIndex);
  }

  // Already clean
  return url;
};

/**
 * @param value the whats-app phone number from settings
 */
export const openWhatsApp = (value: string) => {
  let phoneNumber = value.trim();
  const message = "Hello, I'm a customer from AutoMotor";

  // Ensure phone is in international format
  if (!phoneNumber.startsWith("+")) {
    phoneNumber = `+${phoneNumber.replace(/[^0-9]/g, "")}`;
  }

  // Use correct URL per platform
  const url =
    Platform.OS === "android"
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
          message
        )}`
      : `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  Linking.openURL(url).catch(() => {
    showFlashMsg({
      title: "Error",
      description: "WhatsApp is not installed on your phone.",
      msgType: "ERROR",
    });
  });
};

export const formatDateOnly = (dateString: string): string => {
  if (!dateString) return "";
  // ensure it's a valid date
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  // return in YYYY-MM-DD format
  return date.toISOString().split("T")[0];
};

/**
 * Format a date string into "DD/MM/YYYY" or "DD-MM-YYYY"
 *
 * @param dateString - The input date string (ISO or any valid date format)
 * @param separator - The separator to use between parts ("/" or "-"), default is "/"
 * @returns Formatted date string or empty string if invalid
 */
export const formatDayMonthYear = (
  dateString: string,
  separator: "/" | "-" = "/"
): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const year = String(date.getFullYear());

  return `${day}${separator}${month}${separator}${year}`;
};

export const hasUnreadNotifications = (
  notifications: apiGetUserNotificationsResponse[]
): boolean => {
  return notifications.some((notif) => notif.read_at === null);
};

export const deserializeJSON = (value?: string) => {
  if (!value || value.trim() === "") return [];

  try {
    // Parse the JSON string inside value
    const parsed = JSON.parse(value);

    // Ensure it's an object
    if (typeof parsed !== "object" || parsed === null) {
      return [];
    }

    // Map into { title, description } format
    return Object.entries(parsed).map(([title, description]) => ({
      title,
      description,
    }));
  } catch (_error: unknown) {
    Alert.alert("Error", _error?.toString() || "Failed to parse JSON");
    // console.warn("Failed to parse terms & conditions JSON:", error);
    return [];
  }
};

export const AuthStorage = {
  saveUserCredential: async (email: string, password: string) => {
    try {
      await SecureStore.setItemAsync("email", email);
      await SecureStore.setItemAsync("password", password);
    } catch (err) {
      Alert.alert("Error saving user credential to store", err as any);
    }
  },

  getUserCredentials: async (): Promise<{
    email: string | null;
    password: string | null;
  }> => {
    try {
      const email = await SecureStore.getItemAsync("email");
      const password = await SecureStore.getItemAsync("password");
      return {
        email,
        password,
      };
    } catch (err) {
      Alert.alert("Error retrieving user credential from store", err as any);
      return {
        email: null,
        password: null,
      };
    }
  },

  deleteCredentials: async () => {
    try {
      await SecureStore.deleteItemAsync("email");
      await SecureStore.deleteItemAsync("password");
    } catch (err) {
      Alert.alert("Error deleting user credential from store", err as any);
    }
  },
};

/**
 * this helps to check for app update in play store and app store
 */
export async function checkForUpdate() {
  try {
    // Get current version installed on the device
    const currentVersion = VersionCheck.getCurrentVersion();

    // Get the latest version from the App Store / Play Store
    const latestVersion = await VersionCheck.getLatestVersion({
      provider: Platform.OS === "ios" ? "appStore" : "playStore",
      // forceUpdate: true,
    });

    // Check if update is needed
    const updateNeeded = await VersionCheck.needUpdate();

    if (updateNeeded.isNeeded) {
      ModalMessageProvider.showModalMsg({
        msgType: "SUCCESS",
        title:
          Platform.OS === "ios"
            ? "iOS Update Available"
            : "Android Update Available",
        description: `A new version (${latestVersion}) is available. You are using version ${currentVersion}. Please update to continue.`,
        animationType: "slide",
        onClick: () => {
          Linking.canOpenURL(updateNeeded.storeUrl).then((supported) => {
            if (supported) {
              Linking.openURL(updateNeeded.storeUrl);
            } else {
              // console.log("Cannot handle URL:", updateNeeded.storeUrl);
            }
          });
          // console.log(updateNeeded.storeUrl);
        },
        btnText: "Update Now",
      });
    }
  } catch (_error) {
    Alert.alert("Error", _error?.toString());
    // console.log("Error checking app update:", error);
  }
}
