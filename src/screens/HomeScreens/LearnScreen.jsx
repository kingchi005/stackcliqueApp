import React from "react";
import { View, Text } from "react-native";
import EnrolledCourses from "../../components/Learn/EnrolledCourses";
import WelcomeMessage from "../../components/Learn/WelcomeMessage";
import AvailableCourseCard from "../../components/Learn/AvailableCourseCard";
import BottomTab from "../../components/Learn/BottomTab";
import { theme } from "../../components/theme/theme";

export default function LearnScreen() {
  return (
    <View style={{ paddingHorizontal: 4, flex: 1 }}>
      <WelcomeMessage />
      <EnrolledCourses />
      <AvailableCourseCard showButton showRequiredLevel />
      <BottomTab height={40}>
        <Text style={{ color: theme.colors.grey }}>How to level up on Stack Clique?</Text>
      </BottomTab>
    </View>
  );
}
