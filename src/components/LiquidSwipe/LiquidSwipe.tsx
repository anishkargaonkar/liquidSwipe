import React from "react";
import { StyleSheet, View } from "react-native";
import Content, { ContentProps } from "../Content/Content";
import Weave from "../Weave/Weave";
import { initialWaveCenter, waveHorRadius, waveVertRadius, sideWidth } from "../Weave/WeaveHelpers";
import Button from "../Button/Button";

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

export default () => {
  const progress: any = 0;
  const centerY: any = initialWaveCenter;
  const horRadius = waveHorRadius(progress);
  const vertRadius = waveVertRadius(progress);
  const sWidth = sideWidth(progress);
  return (
    <View style={styles.container}>
      <Content {...back} />
      <View style={StyleSheet.absoluteFill}>
        <Weave sideWidth={sWidth} {...{ centerY, horRadius, vertRadius }}>
          <Content {...front} />
        </Weave>
        <Button />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

