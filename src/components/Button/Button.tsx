import React from "react";
import { View, Dimensions } from "react-native";
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/Feather';
import { Text } from "react-native-svg";
import Animated, { sub, interpolate } from "react-native-reanimated";
import { initialSideWidth } from "../Weave/WeaveHelpers";
import { opacity } from "react-native-redash";

const { width } = Dimensions.get("window");
const size = 50;
interface ButtonProps {
  progress: Animated.Node<number>,
  y: Animated.Node<number>,
}

export default ({ progress, y }: ButtonProps) => {
  const translateY = sub(y, size / 2);
  const translateX = interpolate(progress, {
    inputRange: [0, 0.4],
    outputRange: [width - initialSideWidth - size + 8, 0]
  })
  const opacity = interpolate(progress, {
    inputRange: [0, 0.1],
    outputRange: [1, 0]
  })
  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
        transform: [{ translateY }, { translateX }],
        opacity
      }}
    >
      <Icon name="chevron-left" color="black" size={40} />
    </Animated.View>
  );
};
