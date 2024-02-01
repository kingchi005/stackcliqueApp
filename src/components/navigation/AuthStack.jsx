import { LoginScreen, SignUpScreen, TermsAndCondition } from "../../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { theme } from "../theme/theme";
const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LogIn" component={LoginScreen} options={{ headerShown: false}}/>
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false}}/>
      <Stack.Screen name="Terms & Conditions" component={TermsAndCondition} options={{
        title: "StackClique - Terms & Conditions",
        headerTitleStyle: {color:theme.colors.primaryColor,},
        headerBackVisible: true,
      }}/>
    </Stack.Navigator>
  );
};