import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Video, ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

const VideoPlayer = React.forwardRef(({ refreshing, onVideoLoad }, ref) => {
  const video = React.useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    // Reload the video whenever the 'refreshing' prop changes
    if (refreshing) {
      reloadVideo();
    }
  }, [refreshing]);

  const handleOnReadyForDisplay = () => {
    setIsLoading(false);
    onVideoLoad(false); // Call the callback to indicate video is loaded
  };

  const reloadVideo = () => {
    video.current.replayAsync(); // Restart the video playback
  };

  useEffect(() => {
    const handlePlaybackStatusUpdate = async (status) => {
      if (status.isLoaded && status.isPlaying) {
        if (isFullscreen) {
          // Video is playing and in full-screen mode, lock screen orientation to landscape
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        } else {
          // Video is playing but not in full-screen, release the lock and set orientation to portrait
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
      }
    };

    if (video.current) {
      video.current.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
    }

    return () => {
      if (video.current) {
        video.current.setOnPlaybackStatusUpdate(null);
        ScreenOrientation.unlockAsync();
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
    };
  }, [video, isFullscreen]);

  const handleFullscreenUpdate = async (status) => {
    setIsFullscreen(status.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT);
    if (status.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://videos.pond5.com/worried-retired-senior-couple-sitting-footage-239107920_main_xxl.mp4",
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onReadyForDisplay={handleOnReadyForDisplay}
        onFullscreenUpdate={handleFullscreenUpdate}
        // Set screenOrientationLock to null when in fullscreen mode
        screenOrientationLock={isFullscreen ? null : Video.REQUIRED}
      />
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#7E0772" />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#ecf0f1",
    height: 200,
  },
  video: {
    width: "100%",
    height: 200,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
});

export default VideoPlayer;
