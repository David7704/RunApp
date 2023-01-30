import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Box} from 'native-base';
import { StyleSheet } from 'react-native';

import StackScreens from './StackScreens';
import React from 'react';

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
          <Box style={styles.container} safeArea>
            <StatusBar style='auto' />
            <StackScreens />
          </Box>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});