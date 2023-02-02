import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from "native-base";
import UserBanner from '../components/UserBanner';
import ActivityList from '../components/ActivityList';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <UserBanner name='John Doe' age='23'/>
        <ActivityList />
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate('Record')}
            size='lg'
            variant='outline'
            //colorScheme='secondary'
            px='20' _text={{fontSize: 'lg'}}
            borderRadius='2xl'
            borderWidth='2.5'
          >Record Run
          </Button>          
        </View>
    </View>
  );  
};

const styles = StyleSheet.create({
    container:{
      height: '100%',
      flex: 1,
      justifyContent: 'flex-end' //Could be a problem - applied to whole profile page
    },
    buttonContainer:{
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      padding: 10,
      borderColor: 'black',
      borderTopWidth: 0.8,
      alignItems: 'center',
      justifyContent: 'center'
    }
});

export default ProfileScreen;