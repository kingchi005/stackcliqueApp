import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { SearchBar, SearchResultContainer } from "../../components";
import { useState } from "react";

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
  const [searchValue, setSearchValue] = useState("");
  return (
    <View>
      <SearchBar value={searchValue} onChange={(value) => setSearchValue(value)} />

      {searchValue.length > 0 && (
        <FlatList
          data={dummyData}
          renderItem={({ item }) => <SearchResultContainer {...item} />}
          keyExtractor={(item) => item.id}
          style={styles.flatListContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    marginTop: 16,
  },
});
