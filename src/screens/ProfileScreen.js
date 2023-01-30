import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserBanner from '../components/UserBanner';


const ProfileScreen = () => {
  return (
    <View>
        <UserBanner name="John Stone" age="23"/>

        <Text> Profile Screen </Text>
    </View>
  );  
};

const styles = StyleSheet.create({
    // container:{
    //   backgroundColor: '#CDCCCC'
    // }
});

export default ProfileScreen;