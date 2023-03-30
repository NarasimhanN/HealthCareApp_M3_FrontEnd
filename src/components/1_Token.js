import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

const setToken = async () => {
  try {
    console.log("())()()()(()()()() SEtting TOken ");
    await AsyncStorage.setItem("token", "11111000000");
  } catch (e) {
    console.log(" )))))))))))))))))))))))))))))))CANT SET TOKEN");
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token").then((token) =>
      console.log("Toeknnnnn ()()()(  ===========", token)
    );
    return token;
  } catch (e) {
    console.log("\n\n(((((((((((((((((((((((((((()))))))))) NO TOKEN");
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token").then((token) =>
      console.log("((((((((((((((((( TOKEN REMOVED )))))))))))))))))")
    );
  } catch (e) {
    console.log(
      "\n\n(((((((((((((((((((((((((((()))))))))) FAILED TO REMOVE TOKEN :( "
    );
  }
};

const setUsnPassToken = async (usn, pass) => {
  try {
    console.log("())()()()(()()()() SEtting TOken ");
    await AsyncStorage.setItem("usn", usn);
    await AsyncStorage.setItem("pass", pass);
  } catch (e) {
    console.log(" )))))))))))))))))))))))))))))))CANT SET USN PASS TOKEN");
  }
};
const validateUsnPassToken = async () => {
  try {
    const userT = await AsyncStorage.getItem("usn").then((token) =>
      console.log("Toeknnnn Username ()()()(  ===========", token)
    );
    const passT = await AsyncStorage.getItem("pass").then((token) =>
      console.log("Toeknnnn Pass ()()()(  ===========", token)
    );
    if (userT && passT) return true;
    else return false;
  } catch (e) {
    console.log(
      "\n\n(((((((((((((((((((((((((((()))))))))) Error Retreving Token Values"
    );
    return false;
  }
};

const removeUsnPassToken = async () => {
  try {
    await AsyncStorage.removeItem("usn").then((token) =>
      console.log("((((((((((((((((( usn T  REMOVED )))))))))))))))))")
    );

    await AsyncStorage.removeItem("pass").then((token) =>
      console.log("((((((((((((((((( pass T  REMOVED )))))))))))))))))")
    );
  } catch (e) {
    console.log(
      "\n\n(((((((((((((((((((((((((((()))))))))) FAILED TO REMOVE USN PASS TOKEN :( "
    );
  }
};
const getUsnToken = async () => {
  try {
    const token = await AsyncStorage.getItem("usn").then((token) =>
      console.log("Usn Token  ()()()(  ===========", token)
    );
    return token;
  } catch (e) {
    console.log("\n\n(((((((((((((((((((((((((((()))))))))) NO usn");
  }
};
const getPassToken = async () => {
  try {
    const token = await AsyncStorage.getItem("pass").then((token) =>
      console.log("pass ()()()(  ===========", token)
    );
    return token;
  } catch (e) {
    console.log("\n\n(((((((((((((((((((((((((((()))))))))) NO pass");
  }
};

export {
  setToken,
  getToken,
  removeToken,
  setUsnPassToken,
  removeUsnPassToken,
  validateUsnPassToken,
  getUsnToken,
  getPassToken,
};
