import React, { useEffect, useState, useReducer } from "react";
import { View, InputText, StyleSheet } from "react-native";
import { Button, Text, Input, ListItem, Avatar } from "react-native-elements";
import { FlatList } from "react-navigation";
import jsonServer from "../../api/jsonServer";
import Spacer from "../components/Spacer";
import DropDownComponent from "../components/2_DropDownComponent";
import { Entypo } from "@expo/vector-icons";
import { removeToken, removeUsnPassToken } from "../components/1_Token";
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

const PatientHome = (props) => {
  console.log("****PATIENT HOME******************************");
  const [workout_data, setWorkoutData] = useState("");
  const [patient_det, setPatientDet] = useState("");

  const unsubscribe = props.navigation.addListener("didFocus", () => {
    console.log("focussed");
    getPatientWorkOut();
  });

  const getPatientWorkOut = async () => {
    // const response = await jsonServer.get("/questionare");
    try {
      const patientID = 29;
      const response = await jsonServer.get(`/patient/workout/${patientID}`);
      console.log("\n\n\n-----------------GET : Getting Patient Workout Data");
      console.log(response.data);
      setWorkoutData(response.data);
    } catch (e) {
      console.log("\n\n\n----------------Ayoo..Issue Getting the Workouts");
      console.log(e.message);
    }
    try {
      setPatientDet(navigation.getParam("pat_det"));
    } catch (e) {
      console.log("--------------- Error getting Patient Detials ");
    }
  };
  useEffect(() => {
    getPatientWorkOut();
  }, []);

  console.log("----------- Patient Details : ---------");
  console.log(patient_det);
  const [workoutStatus, setWorkoutStatus] = useState(0);
  let total = 0;
  for (let i = 0; i < workout_data.length; i++) {
    if (workout_data[i].completed) total += 1;
  }

  const [state, setState] = React.useState([]);

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
        {/* Hello {patient_det["username"]} */}
        Hello Simha!!!
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
          return state.includes(item.workout_instance_id) ? (
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
                      state.filter((i) => i !== item.workout_instance_id)
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
                  setState([...state, item.workout_instance_id]);
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
