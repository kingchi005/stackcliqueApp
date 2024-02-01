import { StyleSheet, View } from "react-native";
import React from "react";
import CourseStats from "./CourseStats";
import { theme } from "../theme/theme";
import AboutCourse from "./AboutCourse";
export default function CourseOverview() {
  return (
    <View style={styles.container}>
      <CourseStats />
      <AboutCourse />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
});
