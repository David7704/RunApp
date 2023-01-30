import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Activity = ({ item }) =>{
  return (
    <>
        <Text style={styles.container}>{[item.distance + '           ' , item.elapsedTime + '         ', item.date]}</Text>
    </>
  );  
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#bef4ff',
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 18,
        padding: 15,
        borderRadius: 4,
        borderColor: '#344042',
        borderWidth: 1.5,
    }
});

export default Activity;