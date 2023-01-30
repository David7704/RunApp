import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Box } from "native-base";

const UserBanner = ({name, age}) => {
  return (
    //<> returns nothing basically, just a way to group items
    //<Box> Tag is basically just a View but in native base
    <Box style={styles.container}>
      <Avatar
       source={{
        uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}}
       style={styles.image}
      />       
      <View style={styles.textParent}>
        <Text style={styles.text}>{name}, {age}</Text>
      </View>
    </Box>
  );  
};

const styles = StyleSheet.create({
    container:{
      backgroundColor: '#CDCCCC',
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      padding:10,
      borderColor: 'black',
      borderTopWidth: 0.8,
      borderBottomWidth: 0.8
    },
    image:{
      width:88,
      height:88,
      textAlignVertical: "center",
      textAlign: "center",
      borderColor: '#170D0D',
      borderWidth:1
    },
    textParent:{
      flex:1,
      justifyContent: 'space-between',
      textAlignVertical: "center",
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 15
      //backgroundColor: 'blue',
    },
    text:{
      fontSize: 25,
      //backgroundColor: 'red',
    }
});

export default UserBanner;