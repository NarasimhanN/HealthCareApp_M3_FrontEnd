import React, { useEffect, useState, useReducer } from "react";
import { View, InputText, StyleSheet } from "react-native";
import { Button, Text, Input, ListItem, Avatar } from "react-native-elements";
import { FlatList } from "react-navigation";
import jsonServer from "../../api/jsonServer";
import Spacer from "./Spacer";

const DropDownComponent = ({
  workout_title,
  workout_description,
  workout_status,
  expandable,
  onPress,
}) => {
  return (
    <View>
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title>{workout_title}</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expandable}
        onPress={() => {
          onPress();
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
            <ListItem.Subtitle>{workout_description}</ListItem.Subtitle>
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
              {workout_status ? "Yes" : "Nope"}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
    </View>
  );
};

const style = StyleSheet.create({});
export default DropDownComponent;
