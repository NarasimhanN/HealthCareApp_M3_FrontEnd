import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import StartScreen from "./src/screen/1_StartScreen";
import RegistrationScreen from "./src/screen/1.3_RegistrationScreen";
import PersonalDetailsRegistration from "./src/screen/1.1_PersonalDetailsRegistration";
import PatientHome from "./src/screen/2_PatientHome";
import QuestionsScreen from "./src/screen/2.1_QuestionsScreen";
// import { NavigationContainer } from "@react-navigation/native";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

// const Tab = createMaterialBottomTabNavigator();

// export default function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={StartScreen} />
//       <Tab.Screen name="Settings" component={PatientHome} />
//     </Tab.Navigator>
//   );
// }

const navigator = createStackNavigator(
  {
    Start: StartScreen,
    Register: RegistrationScreen,
    PersonalDet: PersonalDetailsRegistration,
    PatientHome: PatientHome,
    Questions: QuestionsScreen,
  },
  { initialRouteName: "Start" }
);

// // const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={Start} />
//       <Tab.Screen name="Settings" component={Register} />
//     </Tab.Navigator>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={Start} />
//         <Tab.Screen name="Settings" component={Register} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// // export default createAppContainer(navigator);

// // const navigator = createSwitchNavigator({
// //   InitialScreen: Start,
// //   loginFlow: createStackNavigator({
// //     Start: StartScreen,
// //     Register: RegistrationScreen,
// //     PersonalDet: PersonalDetailsRegistration,
// //     PatientHome: PatientHome,
// //   }),
// //   mainFlow: createMaterialBottomTabNavigator({
// //     Account: "",
// //     Workout: "",
// //     Chat: "",
// //   }),
// // });

export default createAppContainer(navigator);
