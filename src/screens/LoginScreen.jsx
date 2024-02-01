import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { CustomInput } from "../components";
import { UIStore } from "../store/store"

const LoginScreen = () => {
  // Initialize the useForm hook from react-hook-form
  const { control, handleSubmit, formState: { errors }, getValues } = useForm();

  // Get the navigation object from React Navigation
  const navigation = useNavigation();

  // Function to check if both Email and Password inputs are valid
  const isFormValid = () => {
    const values = getValues();
    return (
      !errors.Email &&
      !errors.Password &&
      values.Email?.trim() !== "" &&
      values.Password?.trim() !== ""
    );
  };

  // Function to handle form submission
  const onSubmit = () => {
    UIStore.update((state) => {
      state.isAuthenticated = true;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: 50 }}>
        <Image
          source={require("../../assets/Wordmark.png")}
          style={{ width: "85%", height: 50, alignSelf: "center" }}
        />
      </View>
      <View style={{ paddingTop: 50 }}>
        <Text style={styles.text}>Login</Text>
        <Text style={{ color: "gray", fontSize: 16, fontWeight: "500", padding: 10 }}>
          Welcome.
        </Text>
      </View>
      {/* Use KeyboardAvoidingView to adjust layout when the keyboard appears */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView style={{ padding: 10 }}>
          {/* Email Input */}
          <CustomInput
            name={'Email'}
            placeholder={'Enter your email'}
            control={control}
            keyboardType={"email-address"}
            rules={{
              required: '* Email address is required!',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '* Invalid email address!',
              },
            }}
            Icon={() => <MaterialIcons name="email" size={25} color="#7E0772"/>}
          />
          {/* Password Input */}
          <CustomInput
            name={'Password'}
            placeholder={'Enter your password'}
            control={control}
            rules={{
              required: '* Kindly enter your password!', 
              minLength: {value: 8, message: '* Password should be minimum 8 characters long!'}
            }}
            Icon={() => <FontAwesome name="key" size={24} color="#7E0772"/>}
            secureTextEntry={true}
          />
          {/* Forgotten Password text */}
          <TouchableOpacity activeOpacity={0.8} style={{ alignSelf: 'flex-end', marginTop: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#7E0772' }}>Forgotten Password?</Text>
          </TouchableOpacity>
          {/* Login button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSubmit(onSubmit)}
            style={{ marginTop: 80, backgroundColor: isFormValid() ? '#7E0772' : '#CCCCCC', paddingVertical: 15, borderRadius: 50, alignItems: 'center', padding: 10 }}
            disabled={!isFormValid()} // Disable the button if the form is not valid
          >
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#FFFFFF' }}>LogIn</Text>
          </TouchableOpacity>

          {/* LogIn link */}
          <View style={{ alignSelf: 'center', marginTop: 100, flexDirection: "row" }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: 'black' }}>Don't have an account? </Text>
            <TouchableOpacity activeOpacity={0.8} style={{ alignSelf: 'center' }} onPress={() => { navigation.navigate('SignUp') }}>
              <Text style={{ fontSize: 15, fontWeight: '500', color: '#7E0772' }}>Click here to SignUp</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
  },
  text: {
    fontSize: 30,
    fontWeight: "800",
    color: "black",
    padding: 10,
  },
});
