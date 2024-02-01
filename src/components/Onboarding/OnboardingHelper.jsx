import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to check if the onboarding is completed
export const isOnboardingCompleted = async () => {
  try {
    const value = await AsyncStorage.getItem('@onboarding_completed');
    return value !== null ? JSON.parse(value) : false;
  } catch (error) {
    // Handle AsyncStorage read error (optional)
    console.error('Error reading onboarding state:', error);
    return false;
  }
};

// Function to set onboarding as completed
export const setOnboardingCompleted = async () => {
  try {
    await AsyncStorage.setItem('@onboarding_completed', JSON.stringify(true));
  } catch (error) {
    // Handle AsyncStorage write error (optional)
    console.error('Error saving onboarding state:', error);
  }
};
