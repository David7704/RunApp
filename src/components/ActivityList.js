import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Box } from "native-base";
import Activity from './Activity';
import * as FileSystem from 'expo-file-system';

const ActivityList = () =>{
  
  const pathToRunData = FileSystem.documentDirectory + 'RunData7.json';
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    (async () => {
      const fileExists = await FileSystem.getInfoAsync(pathToRunData);
      if (fileExists.exists) {
        const fileData = await FileSystem.readAsStringAsync(pathToRunData);
        const data = JSON.parse(fileData);
        setActivities(data);
      }
    })();
  }); //runs every time the component is rendered  

  return (
    <Box style={styles.container}>
        <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={activities}
            renderItem={({ item }) => {
                return (
                    <Activity item={item} />
                );
            }}
            keyExtractor={item => item.id}
        />
    </Box>
  );  
};

const styles = StyleSheet.create({
    container:{
        height: '70%',
        width: '100%',
    }
});

export default ActivityList;