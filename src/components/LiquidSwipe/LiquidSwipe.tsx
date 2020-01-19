import React from "react";
import { StyleSheet, View } from "react-native";
import Content, { ContentProps } from "../Content/Content";

export const assets = [
  require("../../assets/firstPageImage.png"),
  require("../../assets/secondPageImage.png")
];

const front: ContentProps = {
  backgroundColor: "#4d1168",
  source: assets[1],
  title1: "For",
  title2: "Gamers",
  color: "#fd5587"
};

const back: ContentProps = {
  backgroundColor: "white",
  source: assets[0],
  title1: "Online",
  title2: "Gambling",
  color: "black"
};

export default () => (
  <View style={styles.container}>
    <Content {...back} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

