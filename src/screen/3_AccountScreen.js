import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button } from "react-native-elements";
import { navigate } from "../navigateRef";
import Spacer from "../components/Spacer";
import { Context as PatientContext } from "../context/patientContext";
import DetailsEntry from "../components/3_DetailsEntry";
const changeDoctor = () => {
  console.log("\n\n\t >>>>> changeDoctor() | Request for a change");
  try {
  } catch (err) {
    console.log("\n\n\t AYOO : Issue changing Doctor");
  }
};
const requestNewDoctor = () => {
  console.log("\n\n\t >>>>> requestNewDoctor() ");
  try {
  } catch (err) {
    console.log("\n\n\t AYOO : Issue REquesting Doctor");
  }
};

const AccountScreen = (props) => {
  const { state } = useContext(PatientContext);
  const workout_data = state.workout_data;

  let total = 0;
  for (let i = 0; i < workout_data.length; i++) {
    if (workout_data[i].completed) total += 1;
  }
  state.patient_data.d_id = 1;
  return (
    <View style={{ marginTop: 40 }}>
      <Spacer>
        <Text h3 style={{ marginTop: 60 }}>
          Namaskar
        </Text>
        <Text h2 style={{ marginBottom: 20, color: "rgba(130, 202, 186, 1)" }}>
          {`${state.patient_data.firstName} ${state.patient_data.lastName} !!`}
        </Text>
        <DetailsEntry
          question={"Patient ID "}
          response={state.patient_data.patient_id}
        />

        <DetailsEntry
          question={"Status "}
          response={`${total}/${workout_data.length} workouts completed`}
        />
        <DetailsEntry
          question={"Sevarity "}
          response={state.patient_data.severity}
        />

        {state.patient_data.d_id == 0 ? (
          <View>
            <TouchableOpacity onPress={requestNewDoctor()}>
              <Text style={{ marginTop: 10, fontSize: 14, color: "blue" }}>
                Need a doctor's help ? click here
              </Text>
              <DetailsEntry />
            </TouchableOpacity>
          </View>
        ) : (
          // <Button
          //   title="Request a Doctor"
          //   onPress={() => {
          //     //   removeUsnPassToken();
          //     requestNewDoctor();
          //   }}
          //   icon={{
          //     name: "",
          //     type: "font-awesome",
          //     size: 15,
          //     color: "white",
          //   }}
          //   iconContainerStyle={{ marginRight: 10 }}
          //   titleStyle={{ fontWeight: "700" }}
          //   buttonStyle={{
          //     backgroundColor: "#5F9EA0",
          //     borderColor: "transparent",
          //     borderWidth: 0,
          //     borderRadius: 30,
          //   }}
          //   containerStyle={{
          //     width: 200,
          //     alignSelf: "center",
          //     marginVertical: 30,
          //   }}
          // />
          <>
            <DetailsEntry question={"Assigned Doctor"} response={"Meet NM"} />
            <TouchableOpacity onPress={changeDoctor()}>
              <Text style={{ marginTop: 10, fontSize: 14, color: "blue" }}>
                Change Doctor? click here
              </Text>
            </TouchableOpacity>

            {/* <Button
              title="Change Doctor"
              onPress={() => {
                //   removeUsnPassToken();
                changeDoctor();
              }}
              icon={{
                name: "",
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
            /> */}
          </>
        )}
      </Spacer>
      <View style={{ flexDirection: "row", marginTop: 215 }}>
        <Button
          title="WorkoutList"
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgba(130, 202, 186, 1)",
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 23 }}
          containerStyle={{
            marginHorizontal: 30,
            height: 50,
            width: 155,
            marginBottom: 10,
            alignSelf: "center",
          }}
          onPress={() => {
            props.navigation.navigate("PatientHome");
          }}
        />
        <Button
          title="Logout"
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgba(130, 202, 186, 1)",
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 23 }}
          containerStyle={{
            marginHorizontal: 10,
            height: 50,
            width: 150,
            marginBottom: 10,
            alignSelf: "center",
          }}
          onPress={() => {
            props.navigation.navigate("Start");
          }}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  viewEntryStyle: {
    flexDirection: "row",
    marginTop: 40,
  },
  entryHeaderStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  entryValueStyle: {
    fontSize: 20,
  },
});

AccountScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
export default AccountScreen;
