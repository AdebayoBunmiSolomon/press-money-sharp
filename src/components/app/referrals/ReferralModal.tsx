import { CustomText } from "@src/components/shared";
import { moderateScale } from "@src/resources/responsiveness";
import React from "react";
import {
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { colors } from "@src/resources/color/color";
import { referralHistory } from "@src/constants/referral";
import { formatAmountWithCommas } from "@src/helper/utils";
import { apiGetUserReferralResponse } from "@src/api/types/app";
import { SafeAreaView } from "react-native-safe-area-context";

interface IReferralModalProps {
  visible: boolean;
  onClose: () => void;
  data: apiGetUserReferralResponse;
}

export const ReferralModal: React.FC<IReferralModalProps> = ({
  visible,
  onClose,
  data,
}) => {
  return (
    <View>
      <Modal visible={visible} transparent animationType='slide'>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <View style={styles.tittleContainer}>
              <CustomText type='medium' size={15} lightBlack>
                Referral History
              </CustomText>
              <TouchableOpacity onPress={() => onClose()}>
                <EvilIcons
                  name='close-o'
                  size={moderateScale(25)}
                  color={colors.black}
                />
              </TouchableOpacity>
            </View>
            {/* referral history list */}
            <ScrollView
              horizontal={false}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{
                gap: moderateScale(5),
              }}>
              {referralHistory &&
                referralHistory.map((item, index) => (
                  <View key={index} style={styles.listContainer}>
                    <View style={styles.itemListContainer}>
                      <CustomText type='regular' size={15} lightBlack>
                        Total Earned
                      </CustomText>
                      <CustomText type='regular' size={15} lightBlack>
                        {formatAmountWithCommas(item?.totalEarned)}
                      </CustomText>
                    </View>
                    <View style={styles.itemListContainer}>
                      <CustomText type='regular' size={15} lightBlack>
                        Invites
                      </CustomText>
                      <CustomText type='regular' size={15} lightBlack>
                        {formatAmountWithCommas(item?.invites)}
                      </CustomText>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop:
      Platform.OS === "ios" ? moderateScale(20) : StatusBar.currentHeight,
  },
  content: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    height: "50%",
  },
  tittleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: moderateScale(10),
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(30),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  itemListContainer: {
    gap: moderateScale(5),
    alignItems: "center",
  },
});
