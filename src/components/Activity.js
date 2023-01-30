import { Box } from 'native-base';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Activity = ({ item }) =>{
  return (
    <Box style={styles.container}>
        <View style={styles.textParent}>
            <Text style={styles.distance}>{item.distance}</Text>
            <Text style={styles.time}>{item.elapsedTime}m</Text>
            <Text style={styles.date}>{item.date}</Text>           
        </View>
    </Box>
  );  
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#bef4ff',
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        padding: 15,
        borderRadius: 4,
        borderColor: '#344042',
        borderWidth: 1.5,
    },
    textParent:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    distance:{
        fontSize: 18,
        textAlign: 'left',
    },
    time:{
        fontSize: 18,
        textAlign: 'center',
    },
    date:{
        fontSize: 18,
        textAlign: 'right',
    }
});

export default Activity;