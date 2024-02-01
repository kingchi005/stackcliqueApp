import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import Trophy from "../../../assets/svg/trophy.svg";
export default function ProgressIndicator() {
  return (
    <View style={styles.indicatorContainer}>
      <Text style={{ color: theme.colors.white, fontWeight: 700 }}>18/25 modules example</Text>
      <View style={styles.indicator}>
        <View style={styles.inner}>
          <LinearGradient
            colors={["#1ABCFD", "#A259FF"]}
            style={styles.inner}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0.5 }}
            locations={[0, 1]}
          />
        </View>
      </View>
      <View style={{ position: "absolute", right: 2, top: 6, bottom: 6 }}>
        <Trophy height={30} width={30} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorContainer: {
    backgroundColor: theme.colors.background,
    paddingVertical: 10,
    borderRadius: 20,
    overflow: "hidden",
    paddingLeft: 20,
  },
  indicator: {
    position: "absolute",
    left: 0,
    top: 1,
    bottom: 1,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    width: "90%",
    padding: 2,
    overflow: "hidden",
    zIndex: -10,
  },
  inner: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});
// #A259FF, #1ABCFD
