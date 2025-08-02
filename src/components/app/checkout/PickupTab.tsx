import { RadioButton } from "@src/common";
import { CustomInput, CustomText } from "@src/components/shared";
import { usePickupTabStore } from "@src/form/store";
import { DVW, moderateScale } from "@src/resources/responsiveness";
import { ScrollContainer } from "@src/screens/ScrollContainer";
import React from "react";
import { StyleSheet, View } from "react-native";

export const PickupTab: React.FC<{}> = () => {
  const {
    paymentMode,
    setPaymentMode,
    pickupAddress,
    setPickupAddress,
    deliveryAddress,
    setDeliveryAddress,
    PMS,
    setPMS,
  } = usePickupTabStore();
  return (
    <ScrollContainer style={styles.container}>
      <View>
        <CustomText type='medium' size={14} black>
          Payment Mode
        </CustomText>
        <RadioButton
          data={["Online", "Others"]}
          selectedItem={paymentMode}
          setSelectedItem={(item) => setPaymentMode(item)}
        />
      </View>
      <View>
        <CustomInput
          title='Pickup Address'
          value={pickupAddress}
          onChangeText={(enteredValue) => setPickupAddress(enteredValue)}
          type='custom'
          placeholder='Your pickup address'
          placeHolderTextColor={"#BDBDBD"}
          keyboardType='default'
          showErrorText
          style={styles.input}
        />
      </View>

      <View>
        <CustomInput
          title='Delivery Address'
          value={deliveryAddress}
          onChangeText={(enteredValue) => setDeliveryAddress(enteredValue)}
          type='custom'
          placeholder='Your delivery address'
          placeHolderTextColor={"#BDBDBD"}
          keyboardType='default'
          showErrorText
          style={styles.input}
        />
      </View>

      <View>
        <CustomInput
          title='PMS'
          value={PMS}
          onChangeText={(enteredValue) => setPMS(enteredValue)}
          type='custom'
          placeholder='Your delivery address'
          placeHolderTextColor={"#BDBDBD"}
          keyboardType='default'
          showErrorText
          style={styles.input}
        />
      </View>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(5),
    gap: moderateScale(15),
  },
  input: {
    backgroundColor: "#bdbdbd2f",
    borderWidth: DVW(0.3),
    borderColor: "#BDBDBD",
  },
});
