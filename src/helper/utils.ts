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
