import React, { useEffect, useState, useContext } from "react";
import { View, InputText, StyleSheet } from "react-native";
import { Button, Text, Input, ListItem, Avatar } from "react-native-elements";
import { FlatList } from "react-navigation";
import jsonServer from "../../api/jsonServer";
import Spacer from "../components/Spacer";
import DropDownComponent from "../components/2_DropDownComponent";
import { Entypo } from "@expo/vector-icons";
import { removeToken, removeUsnPassToken } from "../components/1_Token";
import { Context as PatientContext } from "../context/patientContext";
// import { Context as BlogContext } from "../context/blogContext";

// import { useIsFocused } from "@react-navigation/native"; //for react 5

// const reducer = (state, action) => {
//   return {...state,{"id":action.payload.id}}
// };
// const getToken = async () => {
//   try {
//     await AsyncStorage.getItem("token").then((token) =>
//       console.log("Toeknnnnn ()()()(  ===========", token)
//     );
//   } catch (e) {
//     console.log("\n\n(((((((((((((((((((((((((((()))))))))) NO TOKEN");
//   }
// };
// const patientReducerStorage = (patient_det, PatientContext) => {
//   const { state, addPatient } = useContext(PatientContext);
//   try {
//     console.log("----------- Patient Details : ---------");
//     console.log("\n\n\n\n\n==== Patient Detials from Reducer BEFORE ", state);

//     console.log("==== Trying to Add Patient to Reducer ( In Pat Home)");
//     addPatient(patient_det);

//     console.log(
//       "+_+_+_+_+_+_+_+_____________++++++++++++_______________+++\n Patient Data from Reducer : \n",
//       state.patient_data
//     );
//   } catch (err) {
//     console.log(
//       "\n\n\t\t ------------ Ayoo : Reducer Issue to add ",
//       err.message
//     );
//   }
// };

const PatientHome = (props) => {
  console.log("****PATIENT HOME******************************");
  const { state, addPatient, addWorkout } = useContext(PatientContext);
  const [workout_data, setWorkoutData] = useState("");
  const [patient_det, setPatientDet] = useState("");
  let workout_data_api = "";
  let patient_det_api = "";
  // const { state, addBlogPosts, editBlogPosts } = useContext(PatientContext);

  const unsubscribe = props.navigation.addListener("didFocus", () => {
    console.log("focussed");
    //getPatientWorkOut();
    updateWorkoutDataFromReducer();
  });

  const getPatientWorkOut = async () => {
    //Getting patient data from login screen
    try {
      //setPatientDet(props.navigation.getParam("pat_det"));
      patient_det_api = props.navigation.getParam("pat_det");

      console.log(
        "\n\n PATIENT DATA from Start Screen -> Patient Home : ",
        patient_det_api
      );
    } catch (e) {
      console.log("--------------- Error getting Patient Detials ");
    }
    // Addind Patient data to Patient Reducer

    try {
      console.log("----------- Patient Details : ---------");
      console.log("\n\n\n\n\n==== Patient Detials from Reducer BEFORE ", state);

      console.log("==== Trying to Add Patient to Reducer ( In Pat Home)");
      addPatient(patient_det_api);

      console.log(
        "+_+_+_+_+_+_+_+_____________++++++++++++_______________+++\n Patient Data from Reducer : \n",
        state.patient_data
      );
    } catch (err) {
      console.log(
        "\n\n\t\t ------------ Ayoo : Reducer Issue to add Patient",
        err.message
      );
    }

    try {
      // const patientID = patient_det["patient_id"];
      const patientID = 52;

      const response = await jsonServer.get(`/patient/workout/${patientID}`);
      console.log("\n\n\n-----------------GET : Getting Patient Workout Data");
      console.log(response.data);
      workout_data_api = response.data;
    } catch (e) {
      console.log("\n\n\n----------------Ayoo..Issue Getting the Workouts");
      console.log(e.message);
    }

    //Adding Workout Data  to reducer:
    try {
      console.log("----------- Workout Details : ---------");
      console.log("\n\n\n\n\n==== Workout Data from  Reducer BEFORE ", state);

      console.log("==== Trying to Add Workout to Reducer ( In Pat Home)");
      addWorkout(workout_data_api);

      console.log(
        "+_+_+_+_+_+_+_+_____________++++++++++++_______________+++\n workout_data Data from Reducer : \n",
        state.workout_data
      );
    } catch (err) {
      console.log(
        "\n\n\t\t ------------ Ayoo : Reducer Issue to add Workout ",
        err.message
      );
    }
  };
  useEffect(() => {
    getPatientWorkOut();
    setPatientDet(state.patient_data);
    setWorkoutData(state.workout_data);
  }, []);

  const updateWorkoutDataFromReducer = () => {
    setWorkoutData(state.workout_data);
  };
  let total = 0;
  for (let i = 0; i < workout_data.length; i++) {
    if (workout_data[i].completed) total += 1;
  }

  const [expandState, setState] = React.useState([]);

  return (
    <View style={style.containerStyle}>
      <Spacer />
      <Text
        h3
        style={{
          textAlign: "center",
          fontFamily: "sans-serif",
          fontSize: 19,
        }}
      >
        Hello {patient_det["firstName"]}
        {/* Hello Simha!!! */}
      </Text>
      <Spacer />
      <Text h4 style={{ textAlign: "center" }}>
        Completed {total} / {workout_data.length} workouts
      </Text>
      <Spacer />

      <FlatList
        data={workout_data}
        keyExtractor={(workout) => workout.workout_instance_id}
        renderItem={({ item }) => {
          return expandState.includes(item.workout_instance_id) ? (
            <Spacer>
              <DropDownComponent
                workout_title={item.workout.title}
                workout_description={item.workout.description}
                workout_status={item.completed}
                goToQuestions={() =>
                  props.navigation.navigate("Questions", {
                    workoutObj: item,
                  })
                }
                questions=""
                expandable={true}
                onPress={() => {
                  {
                    setState(
                      expandState.filter((i) => i !== item.workout_instance_id)
                    );
                  }
                }}
              />
            </Spacer>
          ) : (
            <DropDownComponent
              workout_title={item.workout.title}
              workout_description={item.description}
              workout_status={item.completed}
              expandable={false}
              onPress={() => {
                {
                  setState([...expandState, item.workout_instance_id]);
                }
              }}
            />
          );
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    marginTop: 50,
    flex: 1,
  },
});
PatientHome.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
export default PatientHome;
