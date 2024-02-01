
import React, { useState, useRef } from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, RefreshControl } from "react-native";
import BottomTab from "../../components/Learn/BottomTab";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../../components/theme/theme";
import VideoPlayer from "../../components/UI/VideoPlayer";

export default function LearningScreen() {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [firstTimeLoading, setFirstTimeLoading] = useState(true); // New state variable
  const videoRef = useRef(null);

  // Function to handle the refresh action
  const handleRefresh = () => {
    setRefreshing(true); // Start the pull to refresh animation

    // Simulate a 2-second loading delay for the video to refresh
    setTimeout(() => {
      setRefreshing(false); // End the pull to refresh animation
    }, 1000);
  };

  // Callback function to handle video loading state
  const handleVideoLoading = (isLoading) => {
    if (isLoading && firstTimeLoading) {
      // Show the initial loading indicator only on first time loading
      return;
    }

    if (!isLoading && firstTimeLoading) {
      // Video is loaded for the first time, set firstTimeLoading to false
      setFirstTimeLoading(false);
    }

    if (!isLoading) {
      // Video is loaded, automatically trigger the refresh
      handleRefresh();
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 10.08 }}>
      {/* Wrap the entire content inside ScrollView */}
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          firstTimeLoading ? null : ( // Conditionally render RefreshControl
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[theme.colors.primaryColor]} />
          )
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 5 }}></View>
        {/* Pass the ref to VideoPlayer */}
        <VideoPlayer refreshing={refreshing} onVideoLoad={handleVideoLoading} ref={videoRef} />
        <Text style={{ marginTop: 0, fontWeight: "700", fontSize: 16 }}>Introduction to VS Code practices</Text>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ paddingBottom: 0 }} showsVerticalScrollIndicator={false}>
            <Text
              style={{
                fontSize: 15,
                lineHeight: 30,
                letterSpacing: 0.5,
                color: "grey",
                marginBottom: 80, // Add marginBottom to allow space for the bottom tab
              }}
            >
              {/* Your long text here */}
              In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I
              often do when I want to make a Website Design or App Design In In this course we will study the initial
              stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website
              Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have
              several steps that I often do when I want to make a Website Design or App Design In this course we will
              study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to
              make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX
              Designer, I have several steps that I often do when I want to make a Website Design or App Design this
              course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do
              when I want to make a Website Design or App Design is course we will study the initial stages of becoming
              a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design
              In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I
              often do when I want to make a Website Design or App Design.
              {/* ... */}
            </Text>
          </ScrollView>
        </View>
      </ScrollView>
      <BottomTab>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
          <TouchableOpacity
            style={[
              styles.arrowButtons,
              { backgroundColor: buttonDisabled ? theme.colors.grey : theme.colors.primaryColor },
            ]}
            disabled={buttonDisabled}
          >
            <AntDesign name="left" size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowButtons}>
            <AntDesign name="right" size={24} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
      </BottomTab>
    </View>
  );
}

const styles = StyleSheet.create({
  arrowButtons: {
    backgroundColor: theme.colors.primaryColor,
    color: theme.colors.white,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderRadius: 23,
  },
});
