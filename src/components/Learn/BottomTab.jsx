import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { theme } from "../theme/theme";

export default function BottomTab({ children, height }) {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: height || 76,
          backgroundColor: theme.colors.white,
          width: "100%",
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
  },
});
