import React from "react";
import { View, Text, Input, InputText, StyleSheet } from "react-native";

const PatientHome = () => {
  return (
    <View>
      <Text style={style.textStyle}>Hello...This is PATIENT HOME PAGE</Text>
    </View>
  );
};

const style = StyleSheet.create({
  textStyle: {
    fontSize: 25,
  },
});

export default PatientHome;
