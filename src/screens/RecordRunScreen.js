import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';


const RecordRunScreen = () => {
  
  
  //Not written by me just for reference
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }



  return (
    <View>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          // initialRegion={{
          //   //latitude: position.coords.latitude,
          //   //longitude: position.coords.longitude,
          //   //latitudeDelta: 0.0922,
          //   //longitudeDelta: 0.033,
          // }}
        />
        
        
        
        
        
        
        
        
        
          
    </View>
  );  
};

const styles = StyleSheet.create({
    map:{
      width: '100%',
      height: '75%'
    }
});

export default RecordRunScreen;