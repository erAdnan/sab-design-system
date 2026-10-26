/**
 * Storybook app entry. This repository ships the component library and the
 * Storybook device app (com.sabdesignsystem.sb).
 * @format
 */

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import StorybookUIRoot from "./.storybook";

function registerFirebaseBackgroundMessageHandler() {
  try {
    const messaging = require("@react-native-firebase/messaging").default;
    messaging().setBackgroundMessageHandler(async () => {});
  } catch (error) {
    console.warn("Firebase messaging background handler skipped", error);
  }
}

registerFirebaseBackgroundMessageHandler();

AppRegistry.registerComponent(appName, () => StorybookUIRoot);
