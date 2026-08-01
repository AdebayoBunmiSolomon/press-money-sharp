import { authScreenNames } from "@src/navigation";
import { AuthScreenProps } from "@src/router/types";
import React, { useCallback, useState } from "react";
import { Screen } from "../Screen";
import { StyleSheet, View } from "react-native";
import { CustomButton, CustomText } from "@src/components/shared";
import { moderateScale, screenWidth } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import ReanimatedCarousel from "react-native-reanimated-carousel";
import { onboardingScreens } from "@src/constants/onboarding";
import Video from "react-native-video";

const VIDEO_SOURCE = require("@src/assets/video/onboarding.mp4");

export const Onboarding = ({
  navigation,
}: AuthScreenProps<authScreenNames.ONBOARDING>) => {
  const [currIndex, setCurrIndex] = useState<number>(0);

  const handleSnapToItem = useCallback((index: number) => {
    setCurrIndex(index);
  }, []);

  const handleGetStarted = useCallback(() => {
    navigation.navigate(authScreenNames.SIGN_UP);
  }, [navigation]);

  const handleLogin = useCallback(() => {
    navigation.navigate(authScreenNames.LOGIN);
  }, [navigation]);

  const renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: (typeof onboardingScreens)[number];
      index: number;
    }) => (
      <View style={styles.slide} key={index}>
        <CustomText type="semi-bold" size={27} white>
          {item.title}
        </CustomText>
        <CustomText type="regular" size={12} lightGray>
          {item?.desc}
        </CustomText>
      </View>
    ),
    [],
  );

  return (
    <Screen bgColor={colors.black}>
      <View style={styles.videoContainer}>
        <Video
          source={VIDEO_SOURCE}
          style={styles.video}
          resizeMode="stretch"
          repeat
          paused={false}
          muted
        />
      </View>
      <View style={styles.reanimatedContainer}>
        <ReanimatedCarousel
          data={onboardingScreens}
          renderItem={renderItem}
          onSnapToItem={handleSnapToItem}
          pagingEnabled
          width={screenWidth}
          loop
          scrollAnimationDuration={500}
          autoPlay
          autoPlayInterval={3000}
        />
        <View style={styles.bottomAction}>
          <View style={styles.bottomBtnContainer}>
            <CustomButton
              title="Get Started"
              onPress={handleGetStarted}
              buttonType="Outline"
              textWhite
              textSize={16}
              textType="medium"
              btnStyle={styles.outlineBtn}
            />
            <CustomButton
              title="Login"
              onPress={handleLogin}
              buttonType="Solid"
              red
              textWhite
              textSize={16}
              textType="medium"
              btnStyle={styles.solidBtn}
            />
          </View>
          <View style={styles.carouselContainer}>
            {onboardingScreens.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currIndex === index ? styles.dotActive : styles.dotInactive,
                ]}
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
  video: {
    width: "100%",
    height: "100%",
  },
  slide: {
    height: "80%",
    justifyContent: "flex-end",
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
  outlineBtn: {
    width: "46%",
    borderColor: colors.red,
  },
  solidBtn: {
    width: "46%",
  },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    borderRadius: moderateScale(100),
    marginHorizontal: moderateScale(5),
  },
  dotActive: {
    backgroundColor: colors.red,
    padding: moderateScale(7),
  },
  dotInactive: {
    backgroundColor: colors.white,
    padding: moderateScale(4),
  },
});
