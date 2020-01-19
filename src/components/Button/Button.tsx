import React from "react";
import { View } from "react-native";
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/Feather';
import { Text } from "react-native-svg";

const size = 50;
interface ButtonProps { }

export default () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Icon name="chevron-left" color="black" size={40} />
    </View>
  );
};
