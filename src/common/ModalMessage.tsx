import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { CustomButton, CustomText } from "@src/components/shared";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";

export interface IModalMessageProps {
  msgType: "SUCCESS" | "ERROR" | "FAILED";
  title: string;
  description: string;
}

export interface IGlobalModalMessageRef {
  show: (config: IModalMessageProps) => void;
}

export const ModalMessage = forwardRef<IGlobalModalMessageRef>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState<IModalMessageProps>({
    msgType: "SUCCESS",
    title: "",
    description: "",
  });

  useImperativeHandle(ref, () => ({
    show: (config) => {
      setModalData(config);
      setVisible(true);
    },
  }));

  return (
    <Modal visible={visible} transparent animationType='fade'>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={
              modalData.msgType === "ERROR"
                ? require("@src/assets/png/danger.png")
                : modalData?.msgType === "FAILED"
                ? require("@src/assets/png/warning.png")
                : modalData?.msgType === "SUCCESS"
                ? require("@src/assets/png/success.png")
                : null
            }
            style={styles.icon}
          />
          <CustomText
            size={14}
            type='regular'
            black
            style={{
              textAlign: "center",
            }}>
            {modalData.description}
          </CustomText>
          <CustomButton
            title='OK'
            onPress={() => setVisible(false)}
            buttonType='Solid'
            textType='medium'
            textWhite
            btnStyle={[
              styles.button,
              {
                backgroundColor:
                  modalData?.msgType === "SUCCESS"
                    ? "#0C8242"
                    : modalData?.msgType === "ERROR"
                    ? colors.red
                    : modalData?.msgType === "FAILED"
                    ? "#CDDC27"
                    : colors.danger,
              },
            ]}
          />
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
  },
  icon: {
    width: DVW(20),
    height: DVH(10),
    alignSelf: "center",
    marginBottom: moderateScale(15),
  },
  button: {
    backgroundColor: "#0C8242",
    borderRadius: moderateScale(50),
    marginTop: moderateScale(15),
  },
});
