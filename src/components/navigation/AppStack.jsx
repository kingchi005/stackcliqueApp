import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { TailwindProvider } from 'tailwindcss-react-native'
import { StatusBar } from 'expo-status-bar'
import { MainDrawer } from './MainDrawer'
import { UIStore } from '../../store/store'
import RootStack from './RootStack'


export default function Wrapper() {

  const isAuthenticated = UIStore.useState((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack/> : <RootStack/> }
    </NavigationContainer>
  )
}

function AppStack() {
  return (
    <TailwindProvider>
      <StatusBar backgroundColor='black' style='light-content'/>
      <MainDrawer/>
    </TailwindProvider>
  )
}