import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import React from "react";
import { SearchBar as __, SearchResultContainer } from "../../components";
import { useState } from "react";
import api from "../../services";
import { searchCourse } from "../../services/courseService";
import { Searchbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

const dummyData = [
	{
		id: 1,
		courseTitle: "Introduction to vs code practices",
		stars: 4.2,
		reviews: 3000,
		enrolledStudent: 15000,
		source: require("../../../assets/images-from-figma/vs-code-img.png"),
	},
	{
		id: 2,
		courseTitle: "Introduction to html",
		stars: 4.9,
		reviews: 3000,
		enrolledStudent: 3000,
		source: require("../../../assets/images-from-figma/html-img.jpg"),
	},
	{
		id: 3,
		courseTitle: "Introduction to css",
		stars: 3,
		reviews: 1000,
		enrolledStudent: 4000,
		source: require("../../../assets/images-from-figma/css-img.jpg"),
	},
];

export default function SearchScreen() {
	/**
	 * @type {TSearchedCourse[]}
	 */
	const initCourses = [];
	const [searchValue, setSearchValue] = useState("");
	/**@type {[searchResult:TSearchedCourse[];setSearchResult:()=>void]} */
	const [searchResult, setSearchResult] = useState([]);
	const handleSearch = async () => {
		const res = await searchCourse(searchValue);
		if (!res.ok) {
			if (res.error.message !== "No result found")
				return Alert.alert("Could not search", res.error.message);
			else return setSearchResult([]);
		}
		// console.log(courses);
		setSearchResult(res.data);
	};
	// console.log(searchResult);
	return (
		<View style={{}}>
			{/* <SearchBar
				value={searchValue}
				handleSearch={() => handleSearch()}
				onChange={(value) => setSearchValue(value)}
			/> */}

			<Searchbar
				onChangeText={setSearchValue}
				onSubmitEditing={handleSearch}
				style={{ marginTop: 10, marginHorizontal: 10, borderRadius: 10 }}
			/>

			{searchResult.length > 0 ? (
				<FlatList
					data={searchResult}
					renderItem={({ item }) => <SearchResultContainer {...item} />}
					keyExtractor={(item, i) => i}
					style={styles.flatListContainer}
				/>
			) : (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text>No result found</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	flatListContainer: {
		marginTop: 16,
		paddingHorizontal: 10,
	},
});
