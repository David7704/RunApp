import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Dimensions } from 'react-native';


const RecordRunScreen = () => {
  
  const [location, setLocation] = useState(null);
  
  //Controls zoom level of map
  const { height, width } = Dimensions.get( 'window' );
  const LATITUDE_DELTA = 0.005;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
 
  
  //Ensure that location permissions are enabled
  //When the component is loaded for the first time, request location permission from user.
  //If not granted, exit. If granted, get user's current location and store this object in state
  useEffect(() => {
     (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted'){
          console.log("ERROR");
          return;
          }
        try{
          let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
          setLocation(location);
          console.log(location);
        }catch(e){
          console.log("ERROR");
          return;
        }
      })();
    }, []);  
   
  return (
    <View>
        {location ?
          <MapView
            style={styles.map}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={false}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          />
        : null}
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