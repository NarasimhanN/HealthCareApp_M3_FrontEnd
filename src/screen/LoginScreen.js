import React from "react";
import {
  Text,
  Input,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";

const LoginScreen = () => {
  return (
    <View>
      <ImageBackground
        style={style.backgroundImage}
        source={require("../../images/lotus.jpg")}
      >
        <Text style={style.headerStyle}>Patient Login </Text>
        <View style={style.elementStyle}>
          <Text style={style.textStyle}>Enter Username</Text>
          <TextInput style={style.inputStyle} />
        </View>
        <View style={style.elementStyle}>
          <Text style={style.textStyle}> Enter Password</Text>
          <TextInput style={style.inputStyle} />
        </View>

        <TouchableOpacity style={style.loginButStyle}>
          <Text style={style.textStyle}> LOGIN</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  headerStyle: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 50,
    color: "white",
  },
  elementStyle: {
    flexDirection: "row",
    marginVertical: 30,
    marginHorizontal: 30,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  inputStyle: {
    borderWidth: 3,
    marginHorizontal: 10,
    paddingHorizontal: 50,
    fontSize: 20,
  },
  loginButStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
    marginHorizontal: 40,
    marginTop: 60,
    borderCurve: 0.5,
    opacity: 0.8,
  },
  backgroundImage: {
    alignSelf: "stretch",
    width: null,
    height: 750,
    alignContent: "center",
  },
});
export default LoginScreen;
