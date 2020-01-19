import React from "react";
import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LiquidSwipe from "./src/components/LiquidSwipe/LiquidSwipe";
import StyleGuide from "./src/theme/StyleGuide";

const mainStack = createStackNavigator({
  LiquidSwipe: {
    screen: LiquidSwipe,
    navigationOptions: {
      header: () => null,
      gestureEnabled: false,
      title: "Liquid Swipe"
    }
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: StyleGuide.palette.primary,
      borderBottomWidth: 0
    },
    headerTintColor: "white"
  }
});
const AppNavigator = createAppContainer(mainStack);

export default () => (
  <>
    <StatusBar barStyle="light-content" />
    <AppNavigator />
  </>
);