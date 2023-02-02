import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Dimensions } from 'react-native';

const RecordRunScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  
  useEffect(() => {
     (async () => {
        try{
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted'){
            setErrorMsg('Permission not granted');
            return;
            }           
        }catch(e){
          setErrorMsg('Permission not granted');
        }
        try{
          let location1 = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
          setLocation(location1);
        }catch(e){
          setErrorMsg('Unable to retrieve user location');
          return;
        }
      })();
    }, []);

  const { height, width } = Dimensions.get( 'window' );
  const LATITUDE_DELTA = 0.005; //Controls zoom level of map
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
 
 
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
        : <Text style={styles.errorText}>{errorMsg}</Text>}
    </View>
  );  
};

const styles = StyleSheet.create({
    map:{
      width: '100%',
      height: '75%'
    },
    errorText:{
      fontSize: 32,
      textAlign: 'center',
      marginTop: '15%'
    }
});

export default RecordRunScreen;