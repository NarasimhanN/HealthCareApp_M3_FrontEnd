import React from "react";
import { Text } from "react-native-elements";
import jsonServer from "../../api/jsonServer";

const getQuestions = async (workout_instance) => {
  try {
    console.log("\n\n\n-----------------GET : Getting Questions ");
    console.log("---------Workout Instance ", workout_instance);

    // const resp = await jsonServer.post("/questionare_answers", responses);
    const resp = await jsonServer.get(`/patient/workout/questions/1`);

    console.log("Responses : \n", resp.data);
  } catch (e) {
    console.log(
      "\n\n\n----------------Ayoo Some expection whileRetreiving Questions",
      e.message
    );
  }
};

const QuestionsScreen = ({ navigation }) => {
  //   let data = JSON.stringify({
  //     completed: false,
  //     prerequisite: null,
  //     responses: [],
  //     workout: {
  //       description: "Read a chapter of the Power of Positive thinking.",
  //       title: "Reading",
  //       workout_id: 1,
  //     },
  //     workout_instance_id: 1,
  //   });

  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: "https://dcca-103-156-19-229.in.ngrok.io/patient/workout/questions",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  const workout_instance = navigation.getParam("workout");
  getQuestions(workout_instance);
  return <Text>Im in Questions Screem</Text>;
};

export default QuestionsScreen;
