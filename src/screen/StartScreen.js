import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
// import BackgroundImg from "../components/BackGroundImage";

const StartScreen = ({ navigation }) => {
  return (
    <View>
      {/* <BackgroundImg imageSource={require("../../images/buddha1.png")} /> */}
      <ImageBackground
        style={style.backgroundImage}
        source={require("../../images/buddha1.jpg")}
      >
        <Text style={style.headerStyle}>Welcome to your Happy Future</Text>
        <TouchableOpacity
          style={style.loginButStyle}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={style.textStyle}> LOGIN</Text>
          {/* <Button
          style={style.loginButStyle}
          title="Login"
          onPress={() => navigation.navigate("Login")}
        /> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={style.registerButtonStyle}
          // onPress={() => navigation.navigate("PersonalDet")}
          onPress={() => navigation.navigate("PersonalDet")}
        >
          <Text style={style.textStyle}> New Patient?</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={style.registerButtonStyle}
          // onPress={() => navigation.navigate("PersonalDet")}
          onPress={() => navigation.navigate("PersonalDet")}
        >
          <Text style={style.textStyle}> PATIENT DET FILL</Text>
        </TouchableOpacity> */}
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  loginButStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "grey",
    marginHorizontal: 40,
    marginTop: 90,
    borderCurve: 0.5,
    opacity: 0.8,
  },
  registerButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "grey",

    marginHorizontal: 40,
    marginVertical: 20,
    borderCurve: 50,
    opacity: 0.8,
  },
  textStyle: {
    fontSize: 18,
    marginVertical: 20,
    alignSelf: "center",
    fontStyle: "bold",
    color: "white",
  },
  backgroundImage: {
    //   flex: 1,
    alignSelf: "stretch",
    width: null,
    height: 750,
    alignContent: "center",
  },
  viewStyle: {
    alignItems: "center",
    alignContent: "",
  },
  headerStyle: {
    marginTop: 150,
    fontSize: 23,
    alignSelf: "center",

    fontStyle: "bold",
    color: "white",
    fontWeight: "bold",
  },
});
export default StartScreen;
