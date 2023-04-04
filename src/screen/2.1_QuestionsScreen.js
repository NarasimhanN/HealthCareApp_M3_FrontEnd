import React, { useEffect, useState, useContext } from "react";
import { Text, Input, Button } from "react-native-elements";
import { View, FlatList } from "react-native";
import jsonServer from "../../api/jsonServer";
import Spacer from "../components/Spacer";
import navigate from "../navigateRef";
import { Context as PatientContext } from "../context/patientContext";

const QuestionsScreen = ({ navigation }) => {
  //********************************************************** */
  // For Logging Reducer data . State not used in code ( only updatePreReqWorkout is used)
  const { state } = useContext(PatientContext);
  console.log("\n\n********************** QUESTION SCREEN- for a Activity");

  console.log(
    "\n\n+++++++++++++++++++++++++++++++++ REDICERR VAL : PK DATA ",
    state.patient_data
  );
  console.log(
    "\n\n+++++++++++++++++++++++++++++++++ REDICERR VAL : WK DATA ",
    state.workout_data
  );
  console.log(
    "\n\n+++++++++++++++++++++++++++++++++ REDICERR VAL : WK No 1 ",
    state.workout_data[3]
  );

  //********************************************************** */
  // const [questions, setQuestions] = useState("");

  const { updateWorkoutStatus, updatePreReqWorkout } =
    useContext(PatientContext);
  const [responses, setRespose] = useState([]);
  const workoutObj = navigation.getParam("workoutObj");

  console.log("Workout Obj : ", workoutObj);
  const workout_id = workoutObj.workout.workout_id;
  const workout_instance_id = workoutObj.workout_instance_id;
  const questions = workoutObj.workout.questions;

  const postResponse = async (question_response, callback) => {
    try {
      console.log(
        "\n\n\n-----------------POST ( Workout Questions Response) : UPDATING DB with Responses"
      );
      // const resp = await jsonServer.post("/questionare_answers", responses);
      const resp = await jsonServer.post(
        `/patient/workout/response`,
        question_response
      );

      console.log("Responses : \n", resp.data);
      console.log("Going to PATIENT HOME");
      callback();
    } catch (e) {
      console.log(
        "\n\n\n----------------Ayoo Some expection while Submitting the responses",
        e
      );
    }
  };
  //Make the Status as complete for the given workout ID
  const updateWorkoutReducerState = () => {
    workoutObj.completed = true;
    updateWorkoutStatus(workout_instance_id);
    updatePreReqWorkout(workout_instance_id);
  };
  const sendSoltions = () => {};

  // const getQuestions = async (workout_id) => {
  //   try {
  //     console.log("\n\n\n-----------------GET : Getting Questions. ");

  //     // const resp = await jsonServer.post("/questionare_answers", responses);
  //     const resp = await jsonServer.get(
  //       `/patient/workout/questions/${workout_id}`
  //     );
  //     setQuestions(resp.data);

  //     console.log("Responses (workoutInstanceQuestions): \n", resp.data);
  //   } catch (e) {
  //     console.log(
  //       "\n\n\n----------------Ayoo Some expection whileRetreiving Questions",
  //       e.message
  //     );
  //   }
  // };
  // useEffect(() => {
  //   // getQuestions(workout_id);
  // }, []);

  // To Build Response to update the answer
  const updateResponse = (qid, que, ans) => {
    if (
      responses.filter(
        (respone) => respone.workout_question.workout_question_id == qid
      ).length > 0
    )
      return responses.map((response) => {
        return response.workout_question.workout_question_id == qid
          ? {
              workout_question: {
                workout_question_id: qid,
                workout_question: que,
              },
              response: ans,
              workout_instance: {
                workout_instance_id: workout_instance_id,
                workout: workoutObj.workout,
              },
              completed: true,
              prerequisite: null,
            }
          : response;
      });
    else {
      return [
        ...responses,
        {
          workout_question: {
            workout_question_id: qid,
            workout_question: que,
          },
          response: ans,
          workout_instance: {
            workout_instance_id: workout_instance_id,
            workout: workoutObj.workout,
          },
          completed: true,
          prerequisite: null,
        },
      ];
    }
  };

  return (
    <View>
      <Text
        h4
        style={{
          textAlign: "center",
          color: "#5F9EA0",
          marginTop: 100,
          marginBottom: 80,
        }}
      >
        Answer the below questions
      </Text>
      <Spacer>
        <FlatList
          data={questions}
          keyExtractor={(question) => question.workout_question_id}
          renderItem={({ item }) => {
            return (
              <View>
                <Text> {item.question} : </Text>
                <Input
                  val=""
                  keyboardType="numeric"
                  onChangeText={(newVal) =>
                    setRespose(
                      updateResponse(
                        item.workout_question_id,
                        item.question,
                        newVal
                      )
                    )
                  }
                />
              </View>
            );
          }}
        />
      </Spacer>

      <Button
        title="Submit"
        onPress={() => {
          //Update status as complete for the given workout AND Update the Prereq value of dependent workout
          // updateWorkoutReducerState();
          postResponse(responses, () => {
            navigation.navigate("PatientHome");
            // navigate("PatientHome");
          });
        }}
        icon={{
          name: "save",
          type: "font-awesome",
          size: 15,
          color: "white",
        }}
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={{
          backgroundColor: "#5F9EA0",
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          alignSelf: "center",
          marginVertical: 30,
        }}
      />
    </View>
  );
};

QuestionsScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default QuestionsScreen;
