import React from "react";
import { Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface IToggleSwitchProps {
  /** boolean value */
  value: boolean;
  onValueChange: (_newValue: boolean) => void;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  trackColors?: { on: string; off: string };
}

export const ToggleSwitch: React.FC<IToggleSwitchProps> = ({
  value,
  onValueChange,
  style,
  duration = 400,
  trackColors = { on: "#82cab2", off: "#fa7f7c" },
}) => {
  const height = useSharedValue(0);
  const width = useSharedValue(0);
  const animatedValue = useSharedValue(value ? 1 : 0);

  // Update animated value when prop changes
  React.useEffect(() => {
    animatedValue.value = withTiming(value ? 1 : 0, { duration });
  }, [value]);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      animatedValue.value,
      [0, 1],
      [trackColors.off, trackColors.on]
    );

    return {
      backgroundColor: color,
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(
      animatedValue.value,
      [0, 1],
      [0, width.value - height.value]
    );

    return {
      transform: [{ translateX: moveValue }],
      borderRadius: height.value / 2,
    };
  });

  const handlePress = () => {
    onValueChange(!value);
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        style={[switchStyles.track, style, trackAnimatedStyle]}>
        <Animated.View style={[switchStyles.thumb, thumbAnimatedStyle]} />
      </Animated.View>
    </Pressable>
  );
};

const switchStyles = StyleSheet.create({
  track: {
    alignItems: "flex-start",
    width: 50,
    height: 25,
    padding: 5,
  },
  thumb: {
    height: "100%",
    aspectRatio: 1,
    backgroundColor: "white",
  },
});
