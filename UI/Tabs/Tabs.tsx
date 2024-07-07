import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeScreen } from '../Screens/HomeScreen';
import { MeteoScreen } from '../Screens/MeteoScreen';
import { ProfilScreen } from '../Screens/ProfilScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export function Tabs() {
  return (

    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarStyle: { backgroundColor: '#81BEEB' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Meteo"
        component={MeteoScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
             <Icon name="sun-o" size={size} color={color} />          ),
          headerShown: false,
/*           tabBarBadge: 2, */
        }}
      />
            <Tab.Screen
        name="Profil"
        component={ProfilScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,
/*           tabBarBadge: 2, */
        }}
      />
    </Tab.Navigator>
  );
}