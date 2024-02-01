import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  LearnScreen,
  EarnScreen,
  ConnectScreen,
  NotificationScreen,
  SearchScreen,
  CourseDetailsScreen,
  LearningScreen,
} from "../../screens";
import Header from "../Learn/Header";
import { CustomHeader } from "../../components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

function HomeTabs() {
  return (
    <TopTab.Navigator tabBar={(props) => <Header {...props} />}>
      <TopTab.Screen name="Learn" component={LearnScreen} />
      <TopTab.Screen name="Earn" component={EarnScreen} />
      <TopTab.Screen name="Connect" component={ConnectScreen} />
      <TopTab.Screen name="Notification" component={NotificationScreen} />
    </TopTab.Navigator>
  );
}

export const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Landing" component={HomeTabs} options={{ headerShown: false }} />
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{
        headerTitle: (props) => <CustomHeader {...props} />,
        headerLeft: () => null,
        headerBackVisible: false,
      }}
    />
    <Stack.Screen
      name="Course-Details"
      component={CourseDetailsScreen}
      options={{
        headerTitle: (props) => <CustomHeader {...props} />,
        title: "Course Details",
        headerLeft: () => null,
        headerBackVisible: false,
      }}
    />
    <Stack.Screen
      name="Learning-screen"
      component={LearningScreen}
      options={{
        headerTitle: (props) => <CustomHeader {...props} />,
        title: "Introduction to vs code",
        headerLeft: () => null,
        headerBackVisible: false,
      }}
    />
  </Stack.Navigator>
);
