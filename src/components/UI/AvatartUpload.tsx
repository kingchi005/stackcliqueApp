import React, { useCallback, useRef, useState } from "react";
import {
	View,
	Text,
	ToastAndroid,
	Alert,
	Pressable,
	Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useUserStore } from "../../store/userStore";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme/theme";
import { Button } from "react-native-paper";
import {
	handleImageUpload,
	updateProfilePhoto,
} from "@/src/services/userService";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { IconProps } from "react-native-paper/lib/typescript/components/MaterialCommunityIcon";

export default function AvatartUpload() {
	const [image, setImage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const user = useUserStore((st) => st);
	const updateUser = useUserStore((st) => st.update);
	const navigation = useNavigation<any>();

	const bottomSheetRef = useRef<BottomSheetModal>(null);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
			base64: true,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			handleImageLoaded(`data:image/jpeg;base64,${result.assets[0].base64}`);
		}
	};
	const pickCameraImage = async () => {
		await ImagePicker.requestCameraPermissionsAsync();
		let result = await ImagePicker.launchCameraAsync({
			cameraType: ImagePicker.CameraType.front,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
			base64: true,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			handleImageLoaded(`data:image/jpeg;base64,${result.assets[0].base64}`);
		}
	};

	async function handleImageLoaded(image: string) {
		setLoading(true);

		const res = await handleImageUpload(image);

		if (!res.ok) {
			setLoading(false);
			Alert.alert("Image upload failed", res.error.message, [{ text: "ok" }], {
				cancelable: true,
			});
			return;
		}

		const updateRes = await updateProfilePhoto(res.data.secure_url);

		if (!updateRes.ok) {
			setLoading(false);
			Alert.alert(
				"Photo updated  failed",
				updateRes.error.message,
				[{ text: "ok" }],
				{ cancelable: true }
			);
			return;
		}
		// console.log(updateRes);

		updateUser(updateRes.data);
		setLoading(false);
		if (Platform.OS == "android")
			ToastAndroid.show(
				"Profile photo updated successfully",
				ToastAndroid.SHORT
			);
		else Alert.alert("Profile photo updated successfully");
	}

	const closeSheet = () => {
		bottomSheetRef?.current?.close();
	};
	const openSheet = () => {
		bottomSheetRef?.current?.present();
		// descInputRef.current.focus();
	};

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				{...props}
			/>
		),
		[]
	);
	const pickers = [
		{
			title: "galary",
			onPress: pickImage,
			icon: "image",
		},
		{
			title: "camera",
			onPress: pickCameraImage,
			icon: "camera",
		},
	];
	return (
		<BottomSheetModalProvider>
			<View
				style={{
					flexDirection: "column",
					alignItems: "center",
					marginBottom: 30,
					marginTop: 40,
				}}
			>
				{image || user.profile_photo ? (
					<View style={{ position: "relative" }}>
						<Pressable
							onPress={() =>
								navigation.navigate("avatar-modal", {
									imageUrl: image || user.profile_photo,
									item: image || user.profile_photo,
								})
							}
						>
							<Animated.Image
								source={{ uri: image || user.profile_photo }}
								// sharedTransitionTag="tag"
								style={{ width: 150, height: 150, borderRadius: 75 }}
							/>
							{/* <SharedElement id={`item.photo`}>
							<Avatar.Image
								size={150}
								source={{ uri: image || user.profile_photo }}
							/>
						</SharedElement> */}
						</Pressable>
						{loading && (
							<ActivityIndicator
								size={150}
								style={{ position: "absolute", top: 0, left: 0 }}
							/>
						)}
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
				<Button
					disabled={loading}
					onPress={openSheet}
					textColor={theme.colors.primaryColor}
				>
					<Text> Change Profile Photo</Text>
				</Button>
			</View>
			<BottomSheetModal
				// enablePanDownToClose
				ref={bottomSheetRef}
				backdropComponent={renderBackdrop}
				index={0}
				snapPoints={["20%"]}
				containerStyle={{ zIndex: 1000 }}
				backgroundStyle={{
					borderRadius: 0,
				}}
			>
				<Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}>
					Choose Upload method
				</Text>

				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-evenly",
						alignItems: "center",
					}}
				>
					{pickers.map(({ icon, onPress }, key) => (
						<Pressable
							key={key}
							onPress={() => {
								closeSheet();
								onPress();
							}}
						>
							<Ionicons
								name={icon as any}
								color={theme.colors.primaryColor}
								size={70}
							/>
						</Pressable>
					))}
				</View>
			</BottomSheetModal>
		</BottomSheetModalProvider>
	);
}

type TProps = {
	imageUrl: string;
};
