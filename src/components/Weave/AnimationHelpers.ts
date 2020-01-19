import Animated from "react-native-reanimated";

const { Value, Clock, SpringUtils, block, startClock, set, spring } = Animated;
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
    set(config.toValue, value),
    spring(clock, state, config),
    state.position
  ]);
}
