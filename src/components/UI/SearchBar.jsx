import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import { MaterialIcons } from "react-native-vector-icons";
import { theme } from "../theme/theme";

export default function SearchBar({ searchValues, onChange }) {
  return (
    <View style={styles.barContainer}>
      <View style={{}}>
        <MaterialIcons name="search" size={24} />
      </View>
      <View style={{ minWidthidth: "80%", flex: 3, marginLeft: 4, borderRadius: 16 }}>
        <TextInput
          style={styles.input}
          placeholder="Search for a course"
          onChangeText={(text) => onChange(text)}
          value={searchValues}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    position: "relative",
    flexDirection: "row",
    minWidthidth: "100%",
    marginTop: 23.04,
    backgroundColor: theme.colors.white,
    alignItems: "center",

    paddingTop: 15,
    paddingRight: 4,
    paddingBottom: 13,
    paddingBottom: 20,
  },
  input: {
    width: "100%",
  },
});
