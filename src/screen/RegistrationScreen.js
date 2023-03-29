import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import jsonServer from "../../api/jsonServer";

const RegistrationScreen = ({ navigation }) => {
  const patient_id = navigation.getParam("pat_id");
  const [questions, setQuestions] = useState([]);
  const [responses, setRespose] = useState([]);

  const updateResponse = (qid, ans) => {
    // return responses.map((response) => {
    //   return response.qid == qid ? { qid: qid, ans: ans } : response;

    // for (let que in questions) {
    //   setRespose([...responses, { qid: que.qid, ans: "" }]);
    // }
    // console.log("RESPONSES : ");
    // console.log(responses);

    // if (responses.filter((respone) => respone.qid == qid).length > 0)
    //   return responses.map((response) => {
    //     return response.qid == qid ? { qid: qid, ans: ans } : response;
    //   });
    // else {
    //   return [...responses, { qid: qid, ans: ans }];
    // }

    if (responses.filter((respone) => respone.question.qid == qid).length > 0)
      return responses.map((response) => {
        return response.question.qid == qid
          ? { question: { qid: qid }, answer: ans }
          : response;
      });
    else {
      return [...responses, { question: { qid: qid }, answer: ans }];
    }
  };

  const getQuestions = async () => {
    // const response = await jsonServer.get("/questionare");
    try {
      const response = await jsonServer.get("/patient/questions");
      setQuestions(response.data);
      console.log("\n\n\n-----------------GET : Getting Questionare Questions");
      //  console.log(response);
      console.log(response.data);
    } catch (e) {
      console.log("\n\n\n----------------Ayoo..Issue Getting the questions");
    }
  };
  const postResponse = async (patient_id, callback) => {
    try {
      console.log("\n\n\n-----------------POST : UPDATING DB with Responses");
      console.log("Patient ID :", patient_id);
      // const resp = await jsonServer.post("/questionare_answers", responses);
      const resp = await jsonServer.post(
        `patient/responses/${patient_id}`,
        responses
      );

      console.log("Responses : \n", responses);
      console.log("LOG OF RESPONSE : ", resp);
      console.log("Going to PATIENT HOME");
      callback();
      //Navigate to Patient Home page
    } catch (e) {
      console.log(
        "\n\n\n----------------Ayoo Some expection while Submitting the responses",
        e
      );
    }
  };
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <View>
      <Text style={style.headerStyle}>
        Please Answer the below quesitons on the Scale from 1-5
      </Text>
      <View style={style.containerStyle}>
        <FlatList
          data={questions}
          keyExtractor={(question) => question.qid}
          renderItem={({ item }) => {
            return (
              <View style={style.entryStyle}>
                <Text style={style.textBoxStyle}> {item.description} : </Text>
                <TextInput
                  val=""
                  keyboardType="numeric"
                  style={style.inputBoxStyle}
                  onChangeText={(newVal) =>
                    setRespose(updateResponse(item.qid, newVal))
                  }
                />
              </View>
            );
          }}
        />
      </View>
      <Button
        style={style.buttonStyle}
        title="Submit"
        onPress={() => {
          postResponse(patient_id, () => {
            navigation.navigate("PatientHome");
          });
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  entryStyle: {
    flexDirection: "row",
    marginLeft: 42,
    marginVertical: 15,
    alignContent: "center",
  },
  inputBoxStyle: {
    borderWidth: 3,
    borderColor: "grey",
    marginRight: 30,
    paddingTop: 5,
    paddingLeft: 8,
  },
  textBoxStyle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  headerStyle: {
    marginVertical: 14,
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  buttonStyle: {
    marginTop: 100,
    alignSelf: "flex-end",
  },
  containerStyle: {
    backgroundColor: "#d2d3fe",
    marginVertical: 40,
  },
});

export default RegistrationScreen;
