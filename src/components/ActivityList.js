import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Box } from "native-base";
import RunData from '../../RunData.json'; //FAKE TEST DATA
import Activity from './Activity';

const ActivityList = () =>{
  return (
    <Box style={styles.container}>
        <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={RunData.activities}
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
        height: '80%',
        width: '100%',
    }
});

export default ActivityList;