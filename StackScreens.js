import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ProfileScreen from './src/screens/ProfileScreen';


const Stack = createNativeStackNavigator();

const StackScreens = () => {
  return (
    <Stack.Navigator initialRouteName='Profile'>
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackScreens;