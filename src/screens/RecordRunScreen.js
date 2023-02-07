import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Box } from "native-base";
import MapView from 'react-native-maps';
import getCurrentLocation from '../hooks/getCurrentLocation';
import getDistance from 'geolib/es/getDistance';
import RunData from '../../RunData.json';

import { appendDataToRunData } from '../hooks/updateRunData';


const RecordRunScreen = ( { navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('Map Loading...');
  const [time, setTime] = useState(0);
  
  const [points, setPoints] = useState([]);
  const [distance, setDistance] = useState(0); //meters
  const [lastPoint, setLastPoint] = useState(null);
  
  const addPoint = ( item, d ) => {
    // from location state -> retrieve: latitude, longitude, timestamp
    const { coords: { latitude, longitude }, timestamp } = item;
    setLastPoint({ latitude, longitude });
    if (d !== 0){
      setPoints( prevPoints => [...prevPoints, { latitude, longitude, timestamp }]);
    }
  };
  
  //Runs once on component mount
  const baseTime = Date.now();
  useEffect(() => {
    let secTimer = setInterval( () => {
      setTime(Date.now() - baseTime)
    },1000)
    return () => clearInterval(secTimer);
  }, []); 
  
  //Permissions and setting location (Run only once)
  useEffect(() => {
    // run getCurrentLocation once on component mount
    (async () => {
      const { location: locationResult, errorMsg: errorMsgResult } = await getCurrentLocation();
      setLocation(locationResult);
      setErrorMsg(errorMsgResult);
    })();
    
    // set up interval to run getCurrentLocation every 3 seconds
    const intervalId = setInterval(async () => {
      const { location: locationResult, errorMsg: errorMsgResult } = await getCurrentLocation();
      setLocation(locationResult);
      setErrorMsg(errorMsgResult);
    }, 2500);

    return () => {
      console.log('Cleanup function called');
      clearInterval(intervalId);
      setLocation(undefined);
      setPoints([]);
      setTime(0);
      setLastPoint(undefined);
      setDistance(0);
      setErrorMsg("");
    };
  }, []);
  
  //Every time location is updated
  useEffect(() => {
      if (location){
        let d = calculateDistance (location);
        if (d !== 0){
          setDistance(distance + d);
        }
        addPoint(location, d); //updates lastPoint too   
      }
  }, [location]);
  
  const printPoints = () => {
    points.forEach(item => {
      console.log(item);
    });
    console.log(points.length);
  };
  
  const calculateDistance = ( location ) => {
   // lastPoint is an actual point of 3 parts
   // currentLocation is a location object (convert)
    if (!lastPoint){
      return 0;
    }
    let { coords: { latitude, longitude } } = location; 
    d = getDistance(
      {latitude: lastPoint.latitude,longitude: lastPoint.longitude},
      {latitude: latitude,longitude: longitude},
      accuracy = 0.3
    );
    //console.log(latitude, longitude); 
    //console.log(d);
    //Account for variance in gps data
    if (d < 3){
      return 0;
    }
    return Math.round(d);
  };
  
  //End Run Button is clicked
  //Stop timer?
  //Get data -> current date, distance (convert to km?), elapsedTime (minutes)
  //Append to JSON file
  //Here just need to add real values and then that's it & change the filename of RunDataX.json
  async function endRun() {
  try {
    await appendDataToRunData({
     'id': '13',
     'date': '2023-02-09',
     'distance': '17',
     'elapsedTime': '77'
    });
  } catch (e) {
    console.error('An error occurred while appending data:', e);
  }
  navigation.navigate('Profile');
}
  
  const { height, width } = Dimensions.get( 'window' );
  const LATITUDE_DELTA = 0.005; //Controls zoom level of map
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

  const timeInSeconds = time / 1000;
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const hours = Math.floor(minutes / 60);
  const formattedTime = `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
  return (
    <View>
      {location ?
        <MapView
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
          <Text style={styles.informationText}>{formattedTime}</Text>
          <Text style={styles.informationText}>{distance}m</Text>                           
        </Box>   
      </Box>
           
      <Box style={styles.buttonContainer}>
        <Button
          onPress={() => {endRun()}}
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