import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserBanner from '../components/UserBanner';
import ActivityList from '../components/ActivityList';

const ProfileScreen = () => {
  return (
    <View>
        <UserBanner name="John Doe" age="23"/>
        <ActivityList />

    </View>
  );  
};

const styles = StyleSheet.create({
    // container:{
    //   backgroundColor: '#CDCCCC'
    // }
});

export default ProfileScreen;