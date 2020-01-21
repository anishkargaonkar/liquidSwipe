import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Content, { ContentProps } from "../Content/Content";
import Weave from "../Weave/Weave";
import { initialWaveCenter, waveHorRadius, waveVertRadius, sideWidth, initialSideWidth, waveHorRadiusBack } from "../Weave/WeaveHelpers";
import Button from "../Button/Button";
import Animated, { Value, interpolate, divide, multiply, cond } from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { onGestureEvent, snapPoint } from "react-native-redash";
import { followPointer, snapProgress } from "../Weave/AnimationHelpers";

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

const { width } = Dimensions.get("window")
const maxWidth = width - initialSideWidth;

export default () => {
  const isBack = new Value(0);
  const y = new Value(initialWaveCenter);
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHanlder = onGestureEvent({ y, state, translationX, velocityX });

  const gestureProgress = cond(isBack,
    interpolate(translationX, {
      inputRange: [0, maxWidth],
      outputRange: [1, 0]
    }),
    interpolate(translationX, {
      inputRange: [-maxWidth, 0],
      outputRange: [0.4, 0]
    })
  );
  const progress = snapProgress(
    gestureProgress,
    state,
    isBack,
    snapPoint(
      gestureProgress,
      divide(multiply(-1, velocityX), multiply(-maxWidth, cond(isBack, 1, 0.4))),
      [0, 1]
    )
  )

  const centerY: any = followPointer(y);
  const horRadius = cond(
    isBack,
    waveHorRadiusBack(progress),
    waveHorRadius(progress)
  );
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
          <Button y={centerY} {...{ progress }} />
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

