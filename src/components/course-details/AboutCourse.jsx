import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { theme } from "../theme/theme";
import { EvilIcons } from "@expo/vector-icons";
import { UIStore } from "../../store/store";

export default function AboutCourse() {
  const [isExpanded, setIsExpanded] = useState(false);
  const showModules = UIStore.useState((state) => state.showModules);
  const setShowModules = (value) => {
    UIStore.update((state) => {
      state.showModules = value;
    });
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 600 }}>About Course</Text>

      <View style={[styles.details]}>
        {!isExpanded ? (
          <Text numberOfLines={4} style={styles.text}>
            In this course we will study the initial stages of becoming a UI/UX Designer, I have
            several steps that I often do when I want to make a Website Design or App Design Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Dolorem voluptas asperiores similique
            nobis quis dicta aspernatur alias ipsa vel magni repudiandae cum unde modi, quam,
            sapiente incidunt praesentium voluptatibus accusamus?
          </Text>
        ) : (
          <Text style={styles.text}>
            In this course we will study the initial stages of becoming a UI/UX Designer, I have
            several steps that I often do when I want to make a Website Design or App Design Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Dolorem voluptas asperiores similique
            nobis quis dicta aspernatur alias ipsa vel magni repudiandae cum unde modi, quam,
            sapiente incidunt praesentium voluptatibus accusamus?
          </Text>
        )}
      </View>
      <Pressable onPress={() => setIsExpanded((prev) => !prev)}>
        {isExpanded ? (
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.readMore}>Read Less</Text>
            <EvilIcons name="chevron-up" color={theme.colors.green} size={20} />
          </View>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.readMore}>Read More</Text>
            <EvilIcons name="chevron-down" color={theme.colors.green} size={20} />
          </View>
        )}
      </Pressable>

      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 15 }}>
        <Pressable onPress={() => setShowModules(true)}>
          <Text
            style={[
              styles.modulesText,
              {
                borderBottomWidth: showModules ? 2 : 0,
                color: showModules ? theme.colors.primaryColor : theme.colors.grey,
              },
            ]}
          >
            Modules
          </Text>
        </Pressable>
        <Pressable onPress={() => setShowModules(false)}>
          <Text
            style={[
              styles.modulesText,
              {
                borderBottomWidth: !showModules ? 2 : 0,
                color: !showModules ? theme.colors.primaryColor : theme.colors.grey,
              },
            ]}
          >
            Reviews
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    position: "relative",
  },
  details: {
    marginTop: 10,
    position: "relative",
  },

  text: {
    fontSize: 17,
    color: theme.colors.grey,
    lineHeight: 23,
  },
  readMore: {
    color: theme.colors.green,
  },
  modulesText: {
    fontWeight: 700,
    fontSize: 17,
    borderBottomColor: theme.colors.primaryColor,
    paddingBottom: 4,
  },
});
