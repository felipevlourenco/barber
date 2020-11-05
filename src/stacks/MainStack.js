import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Preload from '../screens/Preload/index'
import Signin from '../screens/Signin/index'
import Signup from '../screens/Signup/index'
import MainTab from './MainTab'

const Stack = createStackNavigator()

export default () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Preload" component={Preload} />
    <Stack.Screen name="Signin" component={Signin} />
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="MainTab" component={MainTab} />
  </Stack.Navigator>
)
