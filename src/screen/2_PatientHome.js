import React, { useEffect, useState, useReducer } from "react";
import { View, InputText, StyleSheet } from "react-native";
import { Button, Text, Input, ListItem, Avatar } from "react-native-elements";
import { FlatList } from "react-navigation";
import jsonServer from "../../api/jsonServer";
import Spacer from "../components/Spacer";

const initHashMap = (hashMap, workout_data) => {
  const size = workout_data.length;
  for (let i = 0; i < size; i++) {
    hashMap.set(workout_data[i].workout_instance_id, false);
  }

  console.log("New Hashmap ", hashMap);
};
// const reducer = (state, action) => {
//   return {...state,{"id":action.payload.id}}
// };
const PatientHome = ({ navigation }) => {
  console.log("****PATIENT HOME******************************");
  let hashmap = new Map();
  console.log(hashmap);
  const [workout_data, setWorkoutData] = useState("");
  const [patient_det, setPatientDet] = useState("");

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

  initHashMap(hashmap, workout_data);

  console.log("----------- Patient Details : ---------");
  console.log(patient_det);

  const [state, setState] = React.useState([]);

  return (
    <View style={style.containerStyle}>
      <Spacer />
      <Text h2 style={{ textAlign: "center" }}>
        Hello {patient_det["username"]}
      </Text>
      <Spacer />

      <FlatList
        data={workout_data}
        keyExtractor={(workout) => workout.workout_instance_id}
        renderItem={({ item }) => {
          return state.includes(item.workout_instance_id) ? (
            <View>
              <Spacer>
                <ListItem.Accordion
                  content={
                    <ListItem.Content>
                      <ListItem.Title>{item.workout.title}</ListItem.Title>
                    </ListItem.Content>
                  }
                  isExpanded={true}
                  onPress={() => {
                    setState(
                      state.filter((i) => i !== item.workout_instance_id)
                    );
                  }}
                >
                  <ListItem>
                    <Avatar
                      size={64}
                      rounded
                      icon={{ name: "pencil", type: "font-awesome" }}
                      containerStyle={{ backgroundColor: "#87CEEB" }}
                    />
                    <ListItem.Content>
                      <ListItem.Title>Description</ListItem.Title>
                      <ListItem.Subtitle>
                        {item.workout.description}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                  <ListItem>
                    <Avatar
                      size={64}
                      rounded
                      icon={{ name: "question", type: "font-awesome" }}
                      containerStyle={{ backgroundColor: "#5F9EA0" }}
                    />
                    <ListItem.Content>
                      <ListItem.Title>Completed?</ListItem.Title>
                      <ListItem.Subtitle>
                        {item.completed ? "Yes" : "Nope"}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                </ListItem.Accordion>
              </Spacer>
            </View>
          ) : (
            <View>
              <ListItem.Accordion
                content={
                  <ListItem.Content>
                    <ListItem.Title>{item.workout.title}</ListItem.Title>
                  </ListItem.Content>
                }
                isExpanded={false}
                onPress={() => {
                  setState([...state, item.workout_instance_id]);
                }}
              >
                <ListItem>
                  <Avatar
                    size={64}
                    rounded
                    icon={{ name: "pencil", type: "font-awesome" }}
                    containerStyle={{ backgroundColor: "blue" }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>Description</ListItem.Title>
                    <ListItem.Subtitle>
                      {item.workout.description}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
                <ListItem>
                  <Avatar
                    size={64}
                    rounded
                    icon={{ name: "pencil", type: "font-awesome" }}
                    containerStyle={{ backgroundColor: "#6733b9" }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>Completed?</ListItem.Title>
                    <ListItem.Subtitle>
                      {item.completed ? "Yes" : "Nope"}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </ListItem.Accordion>
            </View>
          );
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    marginTop: 50,
  },
});
PatientHome.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
export default PatientHome;
