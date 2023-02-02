import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';
import getCurrentLocation from '../hooks/getCurrentLocation';


const RecordRunScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  
  //Permissions and setting location (Run only once)
  useEffect(() => {
    (async () => {
      const { location: locationResult, errorMsg: errorMsgResult } = await getCurrentLocation();
      setLocation(locationResult);
      setErrorMsg(errorMsgResult);
    })();
  }, []);
  
  console.log(location);
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
              latitude: 37.8025259,
              longitude: -122.4351431,
              latitudeDelta: 0.005,
              longitudeDelta: 0.0026627218934911242,
            }}
            region={{
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