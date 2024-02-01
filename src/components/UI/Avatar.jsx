import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { theme } from "../theme/theme";
export default function Avatar({ uri, borderColor, borderRadius, size }) {
  return (
    <View>
      <Image
        style={[
          styles.image,
          {
            borderColor: borderColor || theme.colors.primaryColor,
            borderRadius: borderRadius || 50,
            height: size || 38,
            width: size || 38,
          },
        ]}
        source={uri || require("../../../assets/avatar-img.jpg")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    borderWidth: 2,
  },
});
