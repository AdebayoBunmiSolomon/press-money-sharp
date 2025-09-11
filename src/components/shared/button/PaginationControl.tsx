import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { CustomText } from "@src/components/shared";
import { moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";

export interface IPaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  currentItems: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onGoToPage?: (page: number) => void;
  showItemCount?: boolean;
  showPageNumbers?: boolean;
  maxPageNumbers?: number;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: any;
  textStyle?: any;
  disabledButtonStyle?: any;
  disabledTextStyle?: any;
  primaryColor?: string;
  previousText?: string;
  nextText?: string;
}

export const PaginationControls: React.FC<IPaginationControlsProps> = ({
  currentPage,
  totalPages,
  totalItems,
  currentItems,
  onNextPage,
  onPrevPage,
  onGoToPage,
  showItemCount = true,
  showPageNumbers = false,
  maxPageNumbers = 5,
  style,
  buttonStyle,
  textStyle,
  disabledButtonStyle,
  disabledTextStyle,
  primaryColor = colors.danger || "#007AFF",
  previousText = "Previous",
  nextText = "Next",
}) => {
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  // Generate page numbers for navigation
  const generatePageNumbers = () => {
    if (!showPageNumbers || !onGoToPage) return [];

    const pages = [];
    const half = Math.floor(maxPageNumbers / 2);
    let start = Math.max(0, currentPage - half);
    const end = Math.min(totalPages - 1, start + maxPageNumbers - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < maxPageNumbers) {
      start = Math.max(0, end - maxPageNumbers + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  if (totalPages <= 1) return null;

  return (
    <View style={[styles.container, style]}>
      {/* Previous Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: primaryColor },
          !canGoPrev && styles.disabledButton,
          !canGoPrev && disabledButtonStyle,
          buttonStyle,
        ]}
        onPress={onPrevPage}
        disabled={!canGoPrev}>
        <CustomText
          type='medium'
          size={14}
          style={[
            styles.buttonText,
            !canGoPrev && styles.disabledText,
            !canGoPrev && disabledTextStyle,
            textStyle,
          ]}>
          {previousText}
        </CustomText>
      </TouchableOpacity>

      {/* Page Numbers (Optional) */}
      {showPageNumbers && onGoToPage && (
        <View style={styles.pageNumbersContainer}>
          {pageNumbers.map((pageNum) => (
            <TouchableOpacity
              key={pageNum}
              style={[
                styles.pageNumberButton,
                {
                  backgroundColor:
                    pageNum === currentPage ? primaryColor : "transparent",
                  borderColor: primaryColor,
                },
              ]}
              onPress={() => onGoToPage(pageNum)}>
              <CustomText
                type='medium'
                size={12}
                style={{
                  color: pageNum === currentPage ? "#FFFFFF" : primaryColor,
                }}>
                {pageNum + 1}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Page Info */}
      <View style={styles.pageInfo}>
        <CustomText type='medium' size={12} lightGray>
          Page {currentPage + 1} of {totalPages}
        </CustomText>
        {showItemCount && (
          <CustomText type='regular' size={10} lightGray>
            ({currentItems} of {totalItems} items)
          </CustomText>
        )}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: primaryColor },
          !canGoNext && styles.disabledButton,
          !canGoNext && disabledButtonStyle,
          buttonStyle,
        ]}
        onPress={onNextPage}
        disabled={!canGoNext}>
        <CustomText
          type='medium'
          size={14}
          style={[
            styles.buttonText,
            !canGoNext && styles.disabledText,
            !canGoNext && disabledTextStyle,
            textStyle,
          ]}>
          {nextText}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(8),
    backgroundColor: "#F9F9F9",
    borderRadius: moderateScale(8),
    marginVertical: moderateScale(5),
  },
  button: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(6),
    minWidth: moderateScale(80),
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  buttonText: {
    color: "#FFFFFF",
  },
  disabledText: {
    color: "#888888",
  },
  pageInfo: {
    alignItems: "center",
    flex: 1,
  },
  pageNumbersContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  pageNumberButton: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
