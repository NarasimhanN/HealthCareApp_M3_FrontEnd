import React from "react";
import { View } from "react-native";
import { setToken, validateUsnPassToken } from "../components/1_Token";

const InitScreen = (props) => {
  console.log("---In INIT SCREEN");
  if (validateUsnPassToken()) {
    console.log("TOKEN EXUSTS IN LOCAL STORAGE");
    props.navigation.navigate("Start");
  } else {
    console.log("TOKEN NOT THERE");
    props.navigation.navigate("Start");
  }
  return <View></View>;
};

export default InitScreen;
