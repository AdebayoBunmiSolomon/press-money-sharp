import { useMemo } from "react";
import moment from "moment";
import { apiGetUserServiceMessagesResponse } from "@src/api/types/app";

// Types
export type FlatListItem = {
  type: "header" | "message";
  id: string;
  date?: string;
  message?: any;
};

export type MessageType = {
  uuid?: string;
  id?: number;
  created_at: string;
  sender_id: string;
  message: string;
  [key: string]: any; // For other message properties
};

// Hook for grouping messages with date headers
export const useGroupedMessages = (
  messages: apiGetUserServiceMessagesResponse[]
): FlatListItem[] => {
  return useMemo(() => {
    if (!messages || messages.length === 0) return [];

    // Sort messages chronologically
    const sortedMessages = [...messages].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    const result: FlatListItem[] = [];
    let currentDate = "";

    sortedMessages.forEach((message, index) => {
      const messageDate = moment(message.created_at).format("YYYY-MM-DD");

      // Add date header if date changes
      if (messageDate !== currentDate) {
        currentDate = messageDate;
        result.push({
          type: "header",
          id: `header-${messageDate}`,
          date: messageDate,
        });
      }

      // Add message
      result.push({
        type: "message",
        id: message.uuid || message.id?.toString() || `msg-${index}`,
        message,
      });
    });

    return result;
  }, [messages]);
};

// Optional: Enhanced hook with additional utilities
export const useGroupedMessagesAdvanced = (
  messages: apiGetUserServiceMessagesResponse[]
) => {
  const groupedData = useGroupedMessages(messages);

  const messageCount = useMemo(() => {
    return groupedData.filter((item) => item.type === "message").length;
  }, [groupedData]);

  const dateCount = useMemo(() => {
    return groupedData.filter((item) => item.type === "header").length;
  }, [groupedData]);

  const lastMessage = useMemo(() => {
    const messageItems = groupedData.filter((item) => item.type === "message");
    return messageItems.length > 0
      ? messageItems[messageItems.length - 1].message
      : null;
  }, [groupedData]);

  return {
    groupedData,
    messageCount,
    dateCount,
    lastMessage,
    isEmpty: groupedData.length === 0,
  };
};

// Utility hook for date formatting (can be used independently)
export const useDateFormatter = () => {
  const formatMessageDate = (dateString: string): string => {
    return moment(dateString).calendar(null, {
      sameDay: "[Today]",
      lastDay: "[Yesterday]",
      lastWeek: "dddd",
      sameElse: "MMMM D, YYYY",
    });
  };

  const formatRelativeTime = (dateString: string): string => {
    return moment(dateString).fromNow();
  };

  const isSameDay = (date1: string, date2: string): boolean => {
    return moment(date1).isSame(moment(date2), "day");
  };

  return {
    formatMessageDate,
    formatRelativeTime,
    isSameDay,
  };
};
