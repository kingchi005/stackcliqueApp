import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { theme } from "../theme/theme";
export default function Avatar({ uri, borderRadius, size }) {
	return (
		<View>
			<Image
				style={[
					styles.image,
					{
						borderColor: "#7e077216",
						borderWidth: 1,
						borderRadius: borderRadius || 50,
						height: size || 38,
						width: size || 38,
					},
				]}
				source={require("../../../assets/avatar-img.jpg")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		borderWidth: 2,
	},
});
