import { StyleSheet, TextInput, View, Text } from 'react-native';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomInput = ({ 
  control, 
  name, 
  secureTextEntry, 
  placeholder, 
  keyboardType, 
  rules = {},
  Icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Initialize showPassword state to false

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <View 
            style={[
              styles.container, 
              { 
                borderColor: error ? 'red' : (isFocused || value ? '#7E0772' : '#E2E2E2'),
              }
            ]}
          >
            {Icon && <Icon style={styles.icon} />}   
            <TextInput
              placeholder={placeholder}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry && !showPassword} // Toggle secureTextEntry based on showPassword state
              keyboardType={keyboardType}
              style={styles.input}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {secureTextEntry && ( // Only show eye icon for secureTextEntry fields
              <MaterialCommunityIcons
                name={showPassword ? 'eye' : 'eye-off'}
                size={24}
                color="#7E0772"
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              />
            )}
          </View>
          {error && <Text style={styles.errorText}>{error.message || 'Error'}</Text>}
        </>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  eyeIcon: {
    marginRight: 15,
  },
  errorText: {
    alignSelf: 'stretch',
    color: 'red',
  },
});
