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
/**
 *
 * @param amount e.g. 1000
 * @returns 1,000
 */
export const formatAmountWithCommas = (amount: number) => {
  let amtStr = amount.toString();
  let formattedAmt = amtStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

export const truncateText = (text: string, length?: number) => {
  if (text.length > Number(length)) {
    return text.substring(0, length).trim() + "...";
  } else {
    return text.substring(0, 10).trim() + "...";
  }
};
