import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import jsonServer from "../../api/jsonServer";

// import BackgroundImg from "../components/BackGroundImage";

const onSubmit = async (email, password, setErrorMessage, callback) => {
  //const [pat_det, setPatientDet] = useState("");
  try {
    const response = await jsonServer.post(`/patient/login`, {
      username: email,
      password: password,
    });
    // setPatientDet(response.data);
    const pat_det = response.data;
    console.log("\n\n------------- Pring Pat_det");
    console.log(pat_det);
    callback(pat_det);
    console.log("\n\n\n-----------------POST : Getting Patient Detials");
    console.log(response.data);
  } catch (e) {
    setErrorMessage("Oppssss!!! Something went wrong..Try Again");
    console.log("\n\n\n----------------Ayoo..Issue Getting the Details");
    console.log(e.message);
  }
};
const StartScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <>
      <View style={style.containerStyle}>
        <Spacer>
          <Image
            style={style.imageStyle}
            source={require("../../images/happyBrain.png")}
          />
          <Text h4 style={{ textAlign: "center" }}>
            Welcome to your Welness Destination!!
          </Text>
          <Spacer />
          <Spacer>
            <Input
              label="Email"
              value={email}
              onChangeText={(newEmail) => setEmail(newEmail)}
              autoCapitalize="none"
            />

            <Input
              label="Password"
              value={password}
              onChangeText={(newPass) => setPassword(newPass)}
              autoCapitalize="none"
              secureTextEntry={true}
            />

            {errorMessage ? (
              <Text style={style.errorMessageStyle}>{errorMessage}</Text>
            ) : null}

            <Button
              title="Log in"
              loading={false}
              loadingProps={{ size: "small", color: "white" }}
              buttonStyle={{
                backgroundColor: "rgba(111, 202, 186, 1)",
                borderRadius: 5,
              }}
              titleStyle={{ fontWeight: "bold", fontSize: 23 }}
              containerStyle={{
                marginHorizontal: 50,
                height: 50,
                width: 200,

                alignSelf: "center",
              }}
              onPress={() => {
                console.log(email, password);
                onSubmit(email, password, setErrorMessage, (patient_det) =>
                  navigation.navigate("PatientHome", { pat_det: patient_det })
                );
              }}
            />
          </Spacer>

          <TouchableOpacity onPress={() => navigation.navigate("PersonalDet")}>
            <Text style={style.linkStyle}>No Account? Signup here</Text>
          </TouchableOpacity>
        </Spacer>
      </View>
    </>
  );
};
StartScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const style = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
  },
  buttonStyle: {},
  linkStyle: { textAlign: "center", marginTop: 30, color: "blue" },
  imageStyle: {
    alignSelf: "center",
    marginBottom: 40,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: "rgba(111, 202, 186, 1)",
  },
  errorMessageStyle: {
    color: "red",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 14,
  },

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
