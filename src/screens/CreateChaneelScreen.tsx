import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { theme } from '../components/theme/theme'
import { Checkbox, FAB, TextInput } from 'react-native-paper'

type TLevel = "beginner" | "intermediate" | "advance"
export default function CreateChaneelScreen() {
  const [category, setCategory] = useState<string>("")
  const [level, setLevel] = useState<TLevel | "">("")
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")

  const handleCategoryPress = (item: string) => setCategory(item)
  const handleLevelPress = (item: TLevel) => setLevel(item)

  const handleSubmit = () => {
    const data = {
      name: title, required_user_level: level, description, admin_id: ""
    }
  }
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 15 }}>

        <Text>Channels Subject</Text>

        <TextInput
          outlineStyle={{
            borderRadius: 10,
            borderColor: theme.colors.primaryColor,
            borderWidth: 1,
          }}
          // mode="outlined"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={style.title}>Channels Description</Text>

        <TextInput multiline
          outlineStyle={{
            borderRadius: 10,
            borderColor: theme.colors.primaryColor,
            borderWidth: 1,
          }}
          value={description}
          onChangeText={setDescription}
        // mode="outlined"
        />

        <Text style={style.title}>Category</Text>
        {["App", "Mapp", "Dapp", "Capp", "Lapp", "Tunde"].map((item, i) => <Pressable key={i} onPress={() => handleCategoryPress(item)} style={{
          flexDirection: "row", gap: 5, alignItems: "center"
        }}>
          <Checkbox status={category === item ? "checked" : "unchecked"} onPress={() => handleCategoryPress(item)} />
          <Text>{item}</Text>
        </Pressable>
        )}

        <Text style={style.title}>Level</Text>
        {(["beginner", "intermediate", "advance"] as TLevel[]).map((item, i) => <Pressable key={i} onPress={() => handleLevelPress(item)} style={{
          flexDirection: "row", gap: 5, alignItems: "center"
        }}>
          <Checkbox status={level === item ? "checked" : "unchecked"} onPress={() => handleLevelPress(item)} />
          <Text>{item}</Text>
        </Pressable>
        )}

      </View>

      <FAB
        // onPress={() => navigation.}
        animated
        color="#ccc"
        size="medium"
        icon="arrow-right"
        mode="flat"
        style={[
          { backgroundColor: theme.colors.primaryColor },
          {
            margin: 16,
            bottom: 20,
            right: 0,
            position: "absolute",
            borderRadius: 50,
          },
        ]}
      />
    </ScrollView>
  )
}

const style = StyleSheet.create({
  title: { marginTop: 20 }
})
