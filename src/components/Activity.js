import { Box } from 'native-base';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Activity = ({ item }) =>{
  const convertMetersToKilometers = (meters) => (meters / 1000).toFixed(2); 
  const distanceInKilometers = convertMetersToKilometers(item.distance);  
  const time = convertMillisecondsToHoursAndMinutes(item.elapsedTime);
  
  return (
    <Box style={styles.container}>
        <View style={styles.textParent}>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.distance}>{distanceInKilometers}km</Text>
            <Text style={styles.date}>{item.date}</Text>           
        </View>
    </Box>
  );  
};

const convertMillisecondsToHoursAndMinutes = (milliseconds) => {
  let totalMinutes = Math.floor(milliseconds / 60000);
  let hours = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `0h ${minutes}m`;
  } else {
    return `0h 1m`;
  }
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
      flex: 1,
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