import React from "react";
import { StyleSheet, View } from "react-native";
import Content, { ContentProps } from "../Content/Content";
import Weave from "../Weave/Weave";
import { initialWaveCenter, waveHorRadius, waveVertRadius, sideWidth } from "../Weave/WeaveHelpers";
import Button from "../Button/Button";
import Animated, { Value } from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { onGestureEvent } from "react-native-redash";
import { followPointer } from "../Weave/AnimationHelpers";

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
  const isBack = new Value(0);
  const y = new Value(initialWaveCenter);
  const state = new Value(State.UNDETERMINED);
  const gestureHanlder = onGestureEvent({ y });
  const progress: any = 0;
  const centerY: any = followPointer(y);
  const horRadius = waveHorRadius(progress);
  const vertRadius = waveVertRadius(progress);
  const sWidth = sideWidth(progress);
  return (
    <View style={styles.container}>
      <Content {...back} />
      <PanGestureHandler {...gestureHanlder}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Weave sideWidth={sWidth} {...{ centerY, horRadius, vertRadius }}>
            <Content {...front} />
          </Weave>
          <Button />
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

