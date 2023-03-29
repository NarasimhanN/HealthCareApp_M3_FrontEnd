import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import StartScreen from "./src/screen/StartScreen";
import RegistrationScreen from "./src/screen/RegistrationScreen";
import LoginScreen from "./src/screen/LoginScreen";
import PersonalDetailsRegistration from "./src/screen/PersonalDetailsRegistration";
import PatientHome from "./src/screen/PatientHome";

const navigator = createStackNavigator(
  {
    Start: StartScreen,
    Register: RegistrationScreen,
    Login: LoginScreen,
    PersonalDet: PersonalDetailsRegistration,
    PatientHome: PatientHome,
  },
  {
    initialRouteName: "Start",

    defaultNavigationOptions: {
      title: "Mental Health Welness",
    },
  }
);

export default createAppContainer(navigator);

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
