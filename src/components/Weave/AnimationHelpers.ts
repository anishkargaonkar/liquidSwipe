import Animated, { not, clockRunning, stopClock, and, eq, add, diffClamp } from "react-native-reanimated";
import { State } from "react-native-gesture-handler";

const { Value, Clock, SpringUtils, block, startClock, set, spring, cond } = Animated;
export const followPointer = (value: Animated.Node<number>) => {
  const clock = new Clock();
  const config = SpringUtils.makeDefaultConfig();
  const state = {
    position: new Value(0),
    velocity: new Value(0),
    time: new Value(0),
    finished: new Value(0)
  };

  return block([
    startClock(clock),
    set(config.toValue as any, value),
    spring(clock, state, config),
    state.position
  ]);
};

export const snapProgress = (
  value: Animated.Node<number>,
  state: Animated.Node<number>,
  isBack: Animated.Value<number>,
  snapPoint: Animated.Node<number>
) => {
  const offset = new Value(0);
  const clock = new Clock();
  const config = SpringUtils.makeDefaultConfig();
  const s = {
    position: new Value(0),
    velocity: new Value(0),
    time: new Value(0),
    finished: new Value(0)
  };
  return block([
    cond(eq(state, State.ACTIVE), [
      cond(clockRunning(clock), [
        set(offset, s.position),
        stopClock(clock)
      ], set(
        s.position,
        diffClamp(add(offset, value), 0, 1)
      ))
    ], [
      cond(not(clockRunning(clock)), [
        set(s.time, 0),
        set(s.finished, 0),
        set(config.toValue as any, snapPoint),
        startClock(clock)
      ]),
      spring(clock, s, config),
      cond(and(eq(s.finished, 1), clockRunning(clock)), [
        set(isBack, snapPoint),
        stopClock(clock),
        set(offset, 0)
      ])
    ]),
    s.position
  ])
};
