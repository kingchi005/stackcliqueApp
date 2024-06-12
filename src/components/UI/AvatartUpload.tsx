
import { useEffect, useState } from 'react';
import { Button as RNButton, Image, View, StyleSheet, Text, Platform, ToastAndroid, Alert, ActivityIndicator as RNAI } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { useUserStore } from '../../store/userStore';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { Button } from 'react-native-paper';
import { handleImageUpload, updateProfilePhoto } from '@/src/services/userService';

export default function AvatartUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const user = useUserStore((st) => st);
  const updateUser = useUserStore(st => st.update)


  async function request() {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  const pickImage = async () => {

    // No permissions request is necessary for launching the image library

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1, base64: true
    });

    // console.log(JSON.stringify(result, null, 2));

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleImageLoaded(`data:image/jpeg;base64,${result.assets[0].base64}`)
    }
  };

  async function handleImageLoaded(image: string) {
    setLoading(true)

    const res = await handleImageUpload(image)

    if (!res.ok) {
      setLoading(false)
      Alert.alert("Image upload failed", res.error.message, [{ text: "ok" }], { cancelable: true })
      return
    }

    const updateRes = await updateProfilePhoto(res.data.secure_url)

    if (!updateRes.ok) {
      setLoading(false)
      Alert.alert("Photo updated  failed", updateRes.error.message, [{ text: "ok" }], { cancelable: true })
      return
    }
    // console.log(updateRes);

    updateUser(updateRes.data)
    setLoading(false)
    ToastAndroid.show("Profile photo updated successfully", ToastAndroid.SHORT)
  }


  return <View
    style={{
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 30,
      marginTop: 40,
    }}
  >
    {(image || user.profile_photo) ? (
      <View style={{ position: "relative" }}>
        <Avatar.Image size={150} source={{ uri: image || user.profile_photo }} />
        {loading && <ActivityIndicator size={150} style={{ position: "absolute", top: 0, left: 0, }} />}
      </View>
    ) : (
      <Ionicons
        color={theme.colors.background}
        style={{
          color: theme.colors.grey,
          marginTop: 20,
        }}
        size={150}
        name="person-circle"
      />
    )}

    <Button disabled={loading} onPress={pickImage} textColor={theme.colors.primaryColor}>
      <Text> Change Profile Photo</Text>
    </Button>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
