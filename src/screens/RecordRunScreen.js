import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Box } from "native-base";
import MapView from 'react-native-maps';
import getCurrentLocation from '../hooks/getCurrentLocation';

const RecordRunScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('Use effect not run');
  const [time, setTime] = useState(new Date());
  const baseTime = new Date();
  
  //Runs once on component mount
  useEffect(() => {
    let secTimer = setInterval( () => {
      setTime(new Date(Date.now() - baseTime))
      //console.log(time);
    },1000)
    return () => clearInterval(secTimer);
  }, []); 
  
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

  //Only center it on user if they move like 100 meters or something
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

let hours = time.getHours() - 1;
let minutes = time.getMinutes();
let seconds = time.getSeconds();
  
 //<TouchableOpacity onPress={CenterMapOnUser}><Text>Center on User</Text></TouchableOpacity>     
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
      
      <Box style={styles.informationBox}>
        <Box style={styles.informationTitles}>
          <Text style={styles.informationText}>Time</Text>
          <Text style={styles.informationText}>Distance</Text>                  
        </Box>        
        <Box style={styles.runData}>
          <Text style={styles.informationText}>
            {hours < 10 ? "0" + hours : hours}:
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </Text>          
          <Text style={styles.informationText}>{time.getSeconds()}</Text>                  
        </Box>   
      </Box>
           
      <Box style={styles.buttonContainer}>
        <Button
          //onPress={() => navigation.navigate('Record')}
          style={styles.endRunButton}
          size='lg'
          variant='outline'
          colorScheme='red'
          px='20' _text={{fontSize: 'lg'}}
          borderRadius='2xl'
          borderWidth='2.5'
        >End Run
        </Button>          
      </Box>    
    </View>
  );  
};

const styles = StyleSheet.create({
    map:{
      width: '100%',
      height: '50%',
    },
    errorText:{
      fontSize: 32,
      textAlign: 'center',
      marginTop: '15%'
    },
    informationBox:{
      height: '30%',
      paddingLeft: '10%',
      paddingRight: '10%',
      paddingTop: '15%',
      backgroundColor: 'gray',
    },
    informationTitles:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    runData:{
      flexDirection: 'row',
      justifyContent: 'space-between',    
    },
    endRunButton:{
      textAlign: 'centre',     
    },
    buttonContainer:{
      height: '20%',
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      padding: 10,
      borderColor: 'black',
      borderTopWidth: 0.8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    informationText:{
        fontSize: 32,
    },
});

export default RecordRunScreen;