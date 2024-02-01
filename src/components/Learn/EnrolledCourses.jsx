import { StyleSheet, ScrollView, View, Text, useWindowDimensions } from "react-native";
import React from "react";
import ProgressIndicator from "../UI/ProgressIndicator";
import { Avatar } from "../../components";
import { theme } from "../theme/theme";

function CoursesEnrolledCard() {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.courseCardContainer, { width: 0.9 * width }]}>
      <View style={{ gap: 2, flexDirection: "row" }}>
        <Text
          style={{
            color: theme.colors.primaryColor,
            fontWeight: 800,
            fontSize: 10,
            textTransform: "uppercase",
          }}
        >
          Enrolled
        </Text>
        <Text
          style={{
            color: theme.colors.green,
            fontWeight: 800,
            fontSize: 10,
            textTransform: "uppercase",
          }}
        >
          24TH JUNE, 2023
        </Text>
      </View>

      <View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Avatar borderRadius={50} size={30} />
          <Text style={{ fontSize: 20, color: theme.colors.grey, fontWeight: 700 }}>
            UI UX DESIGN
          </Text>
        </View>
        <Text style={{ color: theme.colors.grey }}>You have 7 more modules to wrap it up!</Text>
      </View>
      <ProgressIndicator />
    </View>
  );
}

export default function EnrolledCourses() {
  return (
    <ScrollView style={styles.scrollContainer} horizontal showsHorizontalScrollIndicator={false}>
      {Array.from({ length: 4 }).map((item, index) => {
        return <CoursesEnrolledCard key={index} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 8,
    maxHeight: 135,
  },
  courseCardContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.white,
    gap: 6,
  },
});
