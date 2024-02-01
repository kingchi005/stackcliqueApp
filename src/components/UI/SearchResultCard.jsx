import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { theme } from "../theme/theme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function SearchResultCard({ courseTitle, stars, reviews, enrolledStudent, source }) {
  return (
    <View style={styles.container}>
      <View>
        <Avatar uri={source} borderColor={theme.colors.white} size={70} borderRadius={10} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 600, fontSize: 18 }}>{courseTitle}</Text>
        <View style={{ marginTop: "auto" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <FontAwesome name="star-o" color={"yellow"} size={20} />
              <Text style={{ color: theme.colors.grey, fontSize: 10 }}>{stars}</Text>
              <Text style={{ color: theme.colors.grey, fontSize: 10 }}>({reviews}k Reviews)</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
              <Ionicons name="person-outline" size={20} color={theme.colors.grey} />
              <Text style={{ color: theme.colors.grey, fontSize: 10 }}>
                {enrolledStudent}k Students Enrolled
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    marginTop: 16,
    gap: 4,
  },
});
