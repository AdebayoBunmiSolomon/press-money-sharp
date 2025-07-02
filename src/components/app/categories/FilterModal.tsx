import { CustomButton, CustomInput, CustomText } from "@src/components/shared";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { filterModalPrices } from "@src/constants/filtermodal";

interface IFilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export const FilterModal: React.FC<IFilterModalProps> = ({
  visible,
  onClose,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  return (
    <View>
      <Modal visible={visible} transparent animationType='slide'>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.filterHeader}>
              <View />
              <CustomText type='medium' size={15} black>
                Filters
              </CustomText>
              <TouchableOpacity onPress={() => onClose()}>
                <AntDesign
                  name='closecircleo'
                  color={colors.lightBlack}
                  size={moderateScale(17)}
                />
              </TouchableOpacity>
            </View>
            <CustomInput
              type='custom'
              searchInput
              value={searchValue}
              onChangeText={(text) => setSearchValue(text)}
              placeholder='Search'
              placeHolderTextColor={colors.lightGray}
              style={styles.input}
              inputStyle={{
                color: colors.lightBlack,
              }}
            />
            <CustomInput
              type='dropdown'
              value={selectedValue}
              onSelectDropDownItem={(text) => setSelectedValue(text)}
              dropDownItems={[
                "Toyota, Corolla",
                "Nissan Almera",
                "Nissan Primera",
                "Golf, Volkswagen",
              ]}
              placeholder='select dropdown items'
              placeHolderTextColor={colors.lightGray}
              style={styles.input}
              inputStyle={{
                color: colors.lightBlack,
              }}
            />
            {/* PRICE  */}
            <View>
              <CustomText type='medium' size={13} lightBlack>
                Price
              </CustomText>
              <View style={styles.inputContainer}>
                <CustomInput
                  type='dropdown'
                  value={selectedValue}
                  onSelectDropDownItem={(text) => setSelectedValue(text)}
                  dropDownItems={filterModalPrices}
                  placeholder='min price'
                  placeHolderTextColor={colors.lightGray}
                  style={[
                    styles.input,
                    {
                      width: "47%",
                    },
                  ]}
                  inputStyle={{
                    color: colors.lightBlack,
                  }}
                />
                <CustomInput
                  type='dropdown'
                  value={selectedValue}
                  onSelectDropDownItem={(text) => setSelectedValue(text)}
                  dropDownItems={filterModalPrices}
                  placeholder='max price'
                  placeHolderTextColor={colors.lightGray}
                  style={[
                    styles.input,
                    {
                      marginLeft: moderateScale(-141),
                      width: "47%",
                    },
                  ]}
                  inputStyle={{
                    color: colors.lightBlack,
                  }}
                />
              </View>
            </View>
            {/* YEAR  */}
            <View>
              <CustomText type='medium' size={13} lightBlack>
                Year
              </CustomText>
              <View style={styles.inputContainer}>
                <CustomInput
                  type='dropdown'
                  value={selectedValue}
                  onSelectDropDownItem={(text) => setSelectedValue(text)}
                  dropDownItems={filterModalPrices}
                  placeholder='min year'
                  placeHolderTextColor={colors.lightGray}
                  style={[
                    styles.input,
                    {
                      width: "47%",
                    },
                  ]}
                  inputStyle={{
                    color: colors.lightBlack,
                  }}
                />
                <CustomInput
                  type='dropdown'
                  value={selectedValue}
                  onSelectDropDownItem={(text) => setSelectedValue(text)}
                  dropDownItems={filterModalPrices}
                  placeholder='max year'
                  placeHolderTextColor={colors.lightGray}
                  style={[
                    styles.input,
                    {
                      marginLeft: moderateScale(-141),
                      width: "47%",
                    },
                  ]}
                  inputStyle={{
                    color: colors.lightBlack,
                  }}
                />
              </View>
            </View>
            {/* MILLAGE  */}
            <View>
              <CustomText type='medium' size={13} lightBlack>
                Millage
              </CustomText>
              <View style={styles.inputContainer}>
                <CustomInput
                  type='dropdown'
                  value={selectedValue}
                  onSelectDropDownItem={(text) => setSelectedValue(text)}
                  dropDownItems={filterModalPrices}
                  placeholder='min millage'
                  placeHolderTextColor={colors.lightGray}
                  style={[
                    styles.input,
                    {
                      width: "47%",
                    },
                  ]}
                  inputStyle={{
                    color: colors.lightBlack,
                  }}
                />
                <CustomInput
                  type='dropdown'
                  value={selectedValue}
                  onSelectDropDownItem={(text) => setSelectedValue(text)}
                  dropDownItems={filterModalPrices}
                  placeholder='max millage'
                  placeHolderTextColor={colors.lightGray}
                  style={[
                    styles.input,
                    {
                      marginLeft: moderateScale(-141),
                      width: "47%",
                    },
                  ]}
                  inputStyle={{
                    color: colors.lightBlack,
                  }}
                />
              </View>
            </View>
            <View style={styles.actionBtnContainer}>
              <CustomButton
                title='Clear Filter'
                red
                textBlack
                textSize={13}
                textType='regular'
                buttonType='Outline'
                onPress={() => onClose()}
                btnStyle={styles.actionBtn}
              />
              <CustomButton
                title='Search Cars '
                red
                textWhite
                textSize={13}
                textType='regular'
                buttonType='Solid'
                onPress={() => {}}
                btnStyle={[
                  styles.actionBtn,
                  {
                    width: "32%",
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start",
    paddingTop: moderateScale(20),
    alignItems: "center",
  },
  content: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    gap: moderateScale(10),
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: moderateScale(10),
  },
  actionBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionBtn: {
    width: "30%",
    paddingVertical: moderateScale(8),
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: DVW(0.2),
    borderColor: colors.lightGray,
    paddingVertical: moderateScale(2),
    height: DVH(5),
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: moderateScale(8),
  },
});
