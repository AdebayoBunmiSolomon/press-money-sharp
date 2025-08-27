import React, { useState } from "react";
import {
  KeyboardType,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  StyleProp,
  ViewStyle,
  ColorValue,
  TextStyle,
  Pressable,
} from "react-native";
import { DVH, moderateScale } from "@src/resources/responsiveness";
import { CustomText, textType } from "../text/CustomText";
import { colors } from "@src/resources/color/color";
import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";
import { useCustomInput } from "../hooks";
import DateTimePicker from "@react-native-community/datetimepicker";

export type InputType = "dropdown" | "password" | "custom" | "date";

interface BaseProps {
  maxLength?: number;
  type: InputType;
  placeholder: string;
  title?: string;
  titleType?: textType;
  titleColor?: ColorValue;
  value?: any;
  onChangeText?: (_value: any) => void;
  error?: string;
  showErrorText?: boolean;
  style?: StyleProp<ViewStyle>;
  valueFontType?: textType;
  titleStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onSubmitEditing?: () => void;
  placeHolderTextColor?: ColorValue;
}

interface DropdownProps extends BaseProps {
  type: "dropdown";
  dropDownItems: string[];
  onSelectDropDownItem: (_value: string) => void;
  dropDownBtnStyle?: StyleProp<TextStyle>;
}

interface PasswordProps extends BaseProps {
  type: "password";
}

interface CustomProps extends BaseProps {
  type: "custom" | "date";
  keyboardType?: KeyboardType;
  disabled?: boolean;
  multiLine?: boolean;
  searchInput?: boolean;
  height?: number;
}

type CustomInputProps = DropdownProps | PasswordProps | CustomProps;

export const CustomInput: React.FC<CustomInputProps> = (props) => {
  const {
    type,
    title,
    titleType,
    titleColor,
    placeholder,
    value,
    onChangeText,
    error,
    showErrorText,
    maxLength,
    style,
    valueFontType,
    titleStyle,
    inputStyle,
    onSubmitEditing,
    placeHolderTextColor,
  } = props;

  const [seePassword, setSeePassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { getValueFontType } = useCustomInput();

  const { getInputColor } = useCustomInput();
  const { borderColor, iconColor } = getInputColor(error || "");
  const valueFont = getValueFontType(valueFontType || "regular");

  const renderError = () =>
    showErrorText && error ? (
      <CustomText size={12} type='regular' style={styles.errorText}>
        {error}
      </CustomText>
    ) : null;

  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );

  const showDatepicker = () => setShowPicker(true);

  const onChange = (event: any, date?: Date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
      onChangeText?.(date.toISOString());
    }
  };

  const renderDropdown = () => {
    const { dropDownItems, onSelectDropDownItem, dropDownBtnStyle } =
      props as DropdownProps;
    const flattenedStyle = StyleSheet.flatten(style);
    const flattenedDropDownBtnStyle = StyleSheet.flatten(dropDownBtnStyle);
    const flattenedDropDownBtnPadTopStyles = Number(
      flattenedDropDownBtnStyle?.paddingTop
    );
    const flattenedHeight = Number(flattenedStyle?.height);
    const iconSize = flattenedHeight
      ? flattenedHeight * 0.5
      : moderateScale(27);

    return (
      <>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={[
            styles.inputWrapper,
            {
              borderColor,
              flexDirection: "row",
              alignItems: "center",
              height: DVH(7),
            },
            style,
          ]}>
          <TextInput
            pointerEvents='none'
            placeholder={placeholder}
            value={value}
            editable={false}
            style={[
              styles.baseInput,
              {
                fontFamily: valueFont,
                flex: 1,
              },
              inputStyle,
            ]}
            placeholderTextColor={placeHolderTextColor || colors.black}
            onChangeText={onChangeText}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[
              styles.iconButton,
              {
                paddingTop: flattenedDropDownBtnPadTopStyles
                  ? flattenedDropDownBtnPadTopStyles
                  : flattenedHeight
                  ? (flattenedHeight - iconSize) / 2
                  : moderateScale(27),
              },
            ]}>
            <MaterialIcons
              name={modalVisible ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={flattenedHeight ? flattenedHeight * 0.5 : moderateScale(27)}
              color={iconColor}
            />
          </TouchableOpacity>
        </Pressable>
        {renderError()}
        <Modal
          visible={modalVisible}
          transparent
          animationType='fade'
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <CustomText size={16} type='semi-bold' style={styles.modalHeader}>
                Select an Option
              </CustomText>
              <FlatList
                data={dropDownItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      onSelectDropDownItem(item);
                      setModalVisible(false);
                    }}>
                    <CustomText size={14} type='regular'>
                      {item}
                    </CustomText>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}>
                <CustomText
                  size={14}
                  type='bold'
                  style={{
                    color: colors.danger,
                  }}>
                  Close
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    );
  };

  const renderPasswordInput = () => (
    <>
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor,
            flexDirection: "row",
            alignItems: "center",
            height: DVH(7),
          },
          style,
        ]}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.baseInput,
            {
              fontFamily: valueFont,
              flex: 1,
              color: colors.black,
            },
            inputStyle,
          ]}
          secureTextEntry={seePassword}
          placeholderTextColor={placeHolderTextColor || colors.black}
        />
        <TouchableOpacity
          onPress={() => setSeePassword(!seePassword)}
          style={styles.iconButton}>
          <FontAwesome
            name={seePassword ? "eye-slash" : "eye"}
            size={moderateScale(20)}
            color={iconColor}
          />
        </TouchableOpacity>
      </View>
      {renderError()}
    </>
  );

  const renderCustomInput = () => {
    const { keyboardType, disabled, multiLine, searchInput, height } =
      props as CustomProps;
    const flattened = StyleSheet.flatten(style);
    const flattenedHeight = Number(flattened?.height);

    return (
      <>
        <View
          style={[
            styles.inputWrapper,
            {
              borderColor,
              height: multiLine ? DVH(height ? height : 20) : DVH(7),
              flexDirection: searchInput ? "row" : undefined,
              alignItems: searchInput ? "center" : undefined,
              gap: searchInput ? moderateScale(5) : undefined,
            },
            style,
          ]}>
          {searchInput && (
            <Feather
              name='search'
              color={borderColor}
              size={
                flattenedHeight
                  ? Math.min(flattenedHeight * 0.6, moderateScale(26))
                  : moderateScale(25)
              }
            />
          )}
          <TextInput
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={[
              styles.baseInput,
              {
                fontFamily: valueFont,
                flex: searchInput ? 1 : undefined,
                textAlignVertical: multiLine ? "top" : "center",
                width: searchInput ? undefined : "100%",
              },
              inputStyle,
            ]}
            keyboardType={keyboardType}
            placeholderTextColor={placeHolderTextColor || colors.black}
            maxLength={maxLength}
            editable={disabled ? false : true}
            multiline={multiLine}
          />
        </View>
        {renderError()}
      </>
    );
  };

  const renderDateInput = () => {
    return (
      <>
        <Pressable
          onPress={showDatepicker}
          style={[
            styles.inputWrapper,
            {
              borderColor,
              flexDirection: "row",
              alignItems: "center", // aligns calendar icon
              height: DVH(7),
            },
            style,
          ]}>
          <View
            style={{
              flex: 1,
              justifyContent: "center", // 👈 vertical centering
            }}>
            <CustomText
              type={valueFontType || "regular"}
              style={[
                // styles.baseInput,
                {
                  color: value ? colors.black : placeHolderTextColor,
                  fontFamily: valueFont,
                },
                inputStyle,
              ]}
              size={13}>
              {selectedDate
                ? selectedDate.toLocaleDateString()
                : placeholder || "Select date"}
            </CustomText>
          </View>
          <Feather name='calendar' size={20} color={iconColor} />
        </Pressable>

        {showPicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode='date'
            display='compact'
            onChange={onChange}
          />
        )}
        {renderError()}
      </>
    );
  };

  const renderInput = () => {
    switch (type) {
      case "dropdown":
        return renderDropdown();
      case "password":
        return renderPasswordInput();
      case "custom":
        return renderCustomInput();
      case "date":
        return renderDateInput(); // Add this
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {title && (
        <CustomText
          size={14}
          type={titleType ? titleType : "medium"}
          style={[
            styles.title,
            {
              color: titleColor || styles.title.color,
            },
            titleStyle,
          ]}>
          {title}
        </CustomText>
      )}
      {renderInput()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: moderateScale(5),
    width: "100%",
  },
  title: {
    color: "#484848",
  },
  inputWrapper: {
    backgroundColor: "#F3F4F7",
    borderRadius: moderateScale(10),
    width: "100%",
    paddingHorizontal: moderateScale(12),
    overflow: "hidden",
  },
  baseInput: {
    padding: 0,
    margin: 0,
    includeFontPadding: false,
    height: "100%",
  },
  iconButton: {
    padding: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    marginBottom: moderateScale(5),
    color: colors.danger,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    height: "40%",
    backgroundColor: "white",
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
  },
  modalHeader: {
    marginBottom: moderateScale(10),
    textAlign: "center",
  },
  option: {
    paddingVertical: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  closeButton: {
    marginTop: moderateScale(10),
    alignSelf: "center",
    padding: moderateScale(5),
  },
});
