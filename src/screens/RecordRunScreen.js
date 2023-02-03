import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';
import getCurrentLocation from '../hooks/getCurrentLocation';


const RecordRunScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('Use effect not run');

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

  
  const mapView = React.createRef();
  const CenterMapOnUser = () => {
    if (!mapView.current) return;
    const { coords: { latitude, longitude } } = location;
    mapView.current.animateToRegion({
      longitude: longitude,
      latitude: latitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };
 
  return (
    <View>
        {location ?
          <MapView
            ref={mapView}
            style={styles.map}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={false}
            
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          />
        : <Text style={styles.errorText}>{errorMsg}</Text>
       }
        <TouchableOpacity onPress={CenterMapOnUser}><Text>Center on User</Text></TouchableOpacity>      
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