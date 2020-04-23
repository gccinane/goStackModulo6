import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Main from './pages/Main';
import User from './pages/User';
const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',

        headerStyle: { backgroundColor: '#7159c1' },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
}
