import { authScreenNames } from "@src/navigation";
import { AuthScreenProps } from "@src/router/types";
import React, { useState } from "react";
import { Screen } from "../Screen";
import { StyleSheet, View } from "react-native";
import { CustomButton, CustomText } from "@src/components/shared";
import { moderateScale, screenWidth } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import ReanimatedCarousel from "react-native-reanimated-carousel";
import { onboardingScreens } from "@src/constants/onboarding";
import Video from "react-native-video";

export const Onboarding = ({
  navigation,
}: AuthScreenProps<authScreenNames.ONBOARDING>) => {
  const [currIndex, setCurrIndex] = useState<number>(0);
  return (
    <Screen bgColor={colors.black}>
      <View style={styles.videoContainer}>
        <Video
          source={require("@src/assets/video/onboarding.mp4")} // put your video in assets folder
          style={{ width: "100%", height: "100%" }}
          resizeMode='stretch'
          repeat
          paused={false}
          muted={true}
        />
      </View>
      <View style={styles.reanimatedContainer}>
        <ReanimatedCarousel
          data={onboardingScreens}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: "80%",
                justifyContent: "flex-end",
              }}
              key={index}>
              <CustomText type='semi-bold' size={30} white>
                {item.title}
              </CustomText>
              <CustomText type='regular' size={15} white>
                {item?.desc}
              </CustomText>
            </View>
          )}
          onSnapToItem={(index) => setCurrIndex(index)}
          pagingEnabled={true}
          width={screenWidth}
          loop={true}
          scrollAnimationDuration={500}
          autoPlay={true}
          autoPlayInterval={3000}
        />
        <View style={styles.bottomAction}>
          <View style={styles.bottomBtnContainer}>
            <CustomButton
              title='Get Started'
              onPress={() => navigation.navigate(authScreenNames.SIGN_UP)}
              buttonType='Outline'
              textWhite
              textSize={16}
              textType='medium'
              btnStyle={{
                width: "46%",
                borderColor: colors.red,
              }}
            />
            <CustomButton
              title='Login'
              onPress={() => navigation.navigate(authScreenNames.LOGIN)}
              buttonType='Solid'
              red
              textWhite
              textSize={16}
              textType='medium'
              btnStyle={{
                width: "46%",
              }}
            />
          </View>
          <View style={styles.carouselContainer}>
            {onboardingScreens &&
              onboardingScreens.map((__, index) => (
                <View
                  key={index}
                  style={{
                    borderRadius: moderateScale(100),
                    backgroundColor:
                      currIndex === index ? colors.red : colors.white,
                    marginHorizontal: moderateScale(5),
                    padding:
                      currIndex === index ? moderateScale(7) : moderateScale(4),
                  }}
                />
              ))}
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: screenWidth,
    height: "100%",
  },
  reanimatedContainer: {
    height: "100%",
    width: screenWidth,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.463)",
    paddingHorizontal: moderateScale(15),
  },
  bottomAction: {
    position: "absolute",
    bottom: moderateScale(40),
    width: "100%",
    gap: moderateScale(10),
    alignSelf: "center",
  },
  bottomBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: moderateScale(20),
  },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
