import React, { useReducer } from "react";
import {
  View,
  Input,
  InputText,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import jsonServer from "../../api/jsonServer";

const postPatientDetails = async (patientDetails, callback) => {
  // await jsonServer.post("/patient", patientDetails);

  try {
    const resp = await jsonServer.post("/patient/", patientDetails);
    console.log("\n\n\n\nPOSTING : Patient Details to DB");
    console.log(patientDetails);
    console.log("------------------RESPONSE FROM SERVER - Patient ID :");
    const patient_obj_returned = resp.data;
    const patient_id_returned = patient_obj_returned["patient_id"];
    console.log(patient_obj_returned["patient_id"]);

    //To to Register Page
    callback(patient_id_returned);
  } catch (e) {
    console.log(
      "\n\n\n----------------Ayoo..Something went wrong in POST - Saving Patient Detaials ",
      e
    );
  }
};

const PersonalDetailsRegistration = ({ navigation }) => {
  let patientDetails = {
    // fn: "",
    // ln: "",
    // dob: "",
    // Gender: "",
    // mob: "",
    // usn: "",
    // pass: "",
    // remarks: "",
    // doc_id: "",
  };
  //Need to get Doctor names from DB
  let patientAttributes = [
    "firstName",
    "lastName",
    "gender",
    "contact_number",
    "username",
    "password",
    "remarks",
    // "Doctor ID",
  ];
  return (
    <View>
      <View style={style.viewStyle}>
        <Text style={style.headerStyle}>
          {" "}
          Please Enter your Personal Details
        </Text>
        <FlatList
          data={patientAttributes}
          keyExtractor={({ item }) => item}
          renderItem={({ item }) => {
            return (
              <View style={style.entryStyle}>
                <Text style={style.textBoxStyle}>Enter {item} : </Text>
                <TextInput
                  style={style.inputBoxStyle}
                  onChangeText={(newVal) => (patientDetails[item] = newVal)}
                />
              </View>
            );
          }}
        />
      </View>

      <Button
        style={style.buttonStyle}
        title="Save Details"
        onPress={() =>
          postPatientDetails(patientDetails, (patientID) => {
            navigation.navigate("Register", { pat_id: patientID });
          })
        }
      />
    </View>
  );
};

const style = StyleSheet.create({
  entryStyle: {
    flexDirection: "row",
    marginLeft: 12,
    marginVertical: 15,
  },
  inputBoxStyle: {
    borderWidth: 3,
    borderColor: "grey",
    marginRight: 30,
    paddingTop: 5,
    flex: 1,
    paddingHorizontal: 10,
  },
  textBoxStyle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  viewStyle: {
    backgroundColor: "#dbfffe",
    // marginBottom: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonStyle: {
    paddingTop: 40,
  },
  containerStyle: {
    paddingBottom: 20,
  },
  headerStyle: {
    marginVertical: 15,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default PersonalDetailsRegistration;
