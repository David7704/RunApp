import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native';

import StackScreens from './StackScreens';
import React from 'react';

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
          <SafeAreaView style={{flex: 1}} forceInset={{ top: 'never' }}>
            <StatusBar style='auto' />
            <StackScreens />         
          </SafeAreaView>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
