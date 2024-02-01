import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme/theme";
import { Avatar, Button } from "../../components";
import { AntDesign } from "@expo/vector-icons";

export default function AvailableCourseCard({
  showButton,
  moduleNumber,
  showRequiredLevel,
  showCheckIcon,
}) {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { width: 0.9 * width }]}>
      <ImageBackground
        source={require("../../../assets/images-from-figma/girl-img.jpg")}
        resizeMode="cover"
        style={styles.image}
      />

      <View style={styles.itemsContainer}>
        <View style={styles.avatarPosition}>
          <View>
            <Avatar
              uri={require("../../../assets/images-from-figma/vs-code-img.png")}
              size={81.544}
              borderColor={theme.colors.white}
              borderRadius={17.47408}
            />
          </View>
        </View>
        {showCheckIcon && (
          <View
            style={{
              marginTop: -40,
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 4,
            }}
          >
            <AntDesign name="checkcircle" color={theme.colors.green} size={30} />
          </View>
        )}
        <Text
          style={{
            textTransform: "uppercase",
            textAlign: "center",
            fontWeight: 700,
            fontSize: 20,
            marginBottom: 5,
          }}
        >
          WEB DEVELOPMENT FRONT END
        </Text>
        <Text
          style={{ textAlign: "center", lineHeight: 16, color: theme.colors.grey, lineHeight: 20 }}
        >
          Visual Studio Code is a code editor redefined and optimized for building and debugging
          modern web and cloud applications. Visual Studio Code is free and ...
        </Text>
        {showRequiredLevel && (
          <Text style={{ textAlign: "center", color: theme.colors.green, marginTop: 10 }}>
            Requirement: Level 3 and above
          </Text>
        )}

        {showButton && (
          <View style={{ marginVertical: 14.08 }}>
            <Button onPress={() => navigation.navigate("Course-Details")}>Learn More</Button>
          </View>
        )}
        {moduleNumber && (
          <Pressable style={{ flexDirection: "row", justifyContent: "center", marginTop: 8 }}>
            <Text style={{ color: theme.colors.green }}>Module 1</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignSelf: "center",

    minHeight: "auto",
    borderRadius: 15.29008,
    overflow: "hidden",
    marginTop: 28,
  },
  image: {
    flex: 1,
    borderRadius: 15.29008,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  itemsContainer: {
    position: "relative",
    backgroundColor: theme.colors.white,
    borderTopRightRadius: 30.57904,
    borderTopLeftRadius: 30.57904,
    marginTop: 80,
    paddingHorizontal: 30.08,
    paddingBottom: 8,
  },
  avatarPosition: {
    top: -30,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
});
