import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home/index'
import Search from '../screens/Search/index'
import Appointments from '../screens/Appointments/index'
import Favorites from '../screens/Favorites/index'
import Profile from '../screens/Profile/index'
import CustomTabBar from '../components/CustomTabBar'

const Tab = createBottomTabNavigator()

export default () => (
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Appointments" component={Appointments} />
    <Tab.Screen name="Favorites" component={Favorites} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
)
