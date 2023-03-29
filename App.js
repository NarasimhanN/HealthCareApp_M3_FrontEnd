import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import StartScreen from "./src/screen/1_StartScreen";
import RegistrationScreen from "./src/screen/1.3_RegistrationScreen";
import PersonalDetailsRegistration from "./src/screen/1.1_PersonalDetailsRegistration";
import PatientHome from "./src/screen/2_PatientHome";
// import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

const navigator = createStackNavigator(
  {
    Start: StartScreen,
    Register: RegistrationScreen,
    PersonalDet: PersonalDetailsRegistration,
    PatientHome: PatientHome,
  },
  { initialRouteName: "Start" }
);

// export default createAppContainer(navigator);

// const navigator = createSwitchNavigator({
//   InitialScreen: Start,
//   loginFlow: createStackNavigator({
//     Start: StartScreen,
//     Register: RegistrationScreen,
//     PersonalDet: PersonalDetailsRegistration,
//     PatientHome: PatientHome,
//   }),
//   mainFlow: createMaterialBottomTabNavigator({
//     Account: "",
//     Workout: "",
//     Chat: "",
//   }),
// });

export default createAppContainer(navigator);
