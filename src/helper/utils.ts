import { QueryClient } from "@tanstack/react-query";
import * as Network from "expo-network";

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
  if (__DEV__) {
    console.log("🚀 Response Log:");
    console.log("Status:", status);
    console.log("Success:", success);
    console.log("Code:", code);
    console.log("Message:", message);
  }
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
