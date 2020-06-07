import React from "react";
import { StatusBar } from "react-native";
import { AppLoading } from "expo";
import { Roboto_400Regular, useFonts } from "@expo-google-fonts/roboto";

import Routes from "./src/routes";

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </>
  );
};

export default App;
