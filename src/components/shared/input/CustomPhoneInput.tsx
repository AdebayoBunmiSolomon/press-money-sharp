import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ColorValue,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  TextStyle,
} from "react-native";
import { CustomText, textType } from "../text/CustomText";
import { DVH, moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import { countriesDialCode } from "@src/constants/countries";
import { useCustomInput } from "../hooks";

interface CountryType {
  name: string;
  dialCode: string;
  flag: string;
}

interface CustomPhoneInputProps {
  dial_code?: string;
  number?: string;
  flag?: string;
  disabled?: boolean;
  multiLine?: boolean;
  maxLength?: number;
  placeholder: string;
  title?: string;
  titleType?: textType;
  titleColor?: ColorValue;
  value?: string;
  onChangeText: (value: string) => void;
  error?: string;
  showErrorText?: boolean;
  style?: StyleProp<ViewStyle>;
  valueFontType?: textType;
  titleStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onSubmitEditing?: () => void;
}

export const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  dial_code,
  flag,
  disabled = false,
  multiLine = false,
  maxLength,
  placeholder,
  title = "Phone number",
  titleType = "medium",
  titleColor,
  value = "",
  onChangeText,
  error,
  showErrorText = false,
  style,
  valueFontType = "regular",
  titleStyle,
  inputStyle,
  onSubmitEditing,
}) => {
  const { getValueFontType } = useCustomInput();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryType>({
    name: countriesDialCode[0].name,
    flag: countriesDialCode[0].flag,
    dialCode: countriesDialCode[0].dialCode,
  });

  const valueFont = getValueFontType(valueFontType);
  const borderColor = error ? colors.danger : "#d3cacaf5";
  // const activeDialCode = dial_code || selectedCountry.dialCode;
  const activeFlag = flag || selectedCountry.flag;

  const handleCountrySelect = (country: CountryType) => {
    setSelectedCountry(country);
    setModalVisible(false);
  };

  const renderCountryItem = ({ item }: { item: CountryType }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleCountrySelect(item)}>
      <CustomText type='regular' size={14}>
        {item.flag} {item.name}
      </CustomText>
      <CustomText type='regular' size={14}>
        {item.dialCode}
      </CustomText>
    </TouchableOpacity>
  );

  const renderModal = () => (
    <Modal
      visible={modalVisible}
      transparent
      animationType='fade'
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <CustomText size={16} type='semi-bold' style={styles.modalHeader}>
            Select Country
          </CustomText>
          <FlatList
            data={countriesDialCode}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderCountryItem}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}>
            <CustomText size={14} type='bold' style={{ color: colors.danger }}>
              Close
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <CustomText
        size={14}
        type={titleType}
        style={[styles.title, { color: titleColor }, titleStyle]}>
        {title}
      </CustomText>

      <View style={[styles.inputWrapper, { borderColor }, style]}>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => setModalVisible(true)}
          style={styles.flagBtn}>
          <CustomText type='semi-bold' size={20} style={styles.flagText}>
            {activeFlag}
          </CustomText>
        </TouchableOpacity>

        {/* <CustomText type='regular' size={14} style={styles.dialCodeText}>
          {activeDialCode}
        </CustomText> */}

        <TextInput
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.input,
            {
              textAlignVertical: multiLine ? "top" : "center",
              fontFamily: valueFont,
            },
            inputStyle,
          ]}
          keyboardType='phone-pad'
          placeholderTextColor={colors.black}
          maxLength={maxLength}
          editable={!disabled}
          multiline={multiLine}
        />
      </View>

      {showErrorText && error && (
        <CustomText size={12} type='regular' style={styles.errorText}>
          {error}
        </CustomText>
      )}

      {renderModal()}
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
    height: DVH(7),
    backgroundColor: "#F3F4F7",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
  },
  input: {
    flex: 1,
    height: "100%",
    padding: 0,
    margin: 0,
    includeFontPadding: false,
  },
  flagBtn: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginRight: moderateScale(15),
  },
  flagText: {
    borderRadius: moderateScale(100),
    overflow: "hidden",
  },
  dialCodeText: {
    paddingHorizontal: moderateScale(5),
  },
  errorText: {
    color: colors.danger,
    marginTop: moderateScale(5),
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
    justifyContent: "space-between",
  },
  closeButton: {
    marginTop: moderateScale(10),
    alignSelf: "center",
    padding: moderateScale(5),
  },
});
