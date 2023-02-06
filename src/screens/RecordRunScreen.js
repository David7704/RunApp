import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Box } from "native-base";
import MapView from 'react-native-maps';
import getCurrentLocation from '../hooks/getCurrentLocation';
import getDistance from 'geolib/es/getDistance';


const RecordRunScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('Use effect not run');
  const [time, setTime] = useState(0);
  
  const [points, setPoints] = useState([]);
  
  const [distance, setDistance] = useState(0); //meters
  const [lastPoint, setLastPoint] = useState(null); //null correct?
  
  
  const addPoint = ( item ) => {
    // from location state -> retrieve: latitude, longitude, timestamp
    const { coords: { latitude, longitude }, timestamp } = item;
    setLastPoint({ latitude, longitude });
    console.log("LAST POINT SET!!!!");
    setPoints( prevPoints => [...prevPoints, { latitude, longitude, timestamp }]);
    //console.log({ latitude, longitude });
    //console.log(lastPoint);
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
      //Calculate distance between this point and lastPoint
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);
  
  //Every time location is updated
  useEffect(() => {
      if (location){
        setDistance(distance + calculateDistance (location));
        addPoint(location); //updates lastPoint
        console.log(lastPoint);        
      }
  }, [location]);
  
  const printPoints = () => {
    points.forEach(item => {
      console.log(item);
    });
    console.log(points.length);
  };
  
  const calculateDistance = ( currentLocation ) => {
   // lastPoint is an actual point of 3 parts
   // currentLocation is a location object (convert)
    if (!lastPoint){
      return 0;
    }
    let { coords: { latitude, longitude } } = currentLocation;
    console.log("CALCULATING DISTANCE!!!!");
    console.log(lastPoint);
    
    return getDistance(
      {latitude: lastPoint.latitude,longitude: lastPoint.longitude},
      {latitude: latitude,longitude: longitude}
    )
  };
  
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
          <Text style={styles.informationText}>{distance}</Text>                           
        </Box>   
      </Box>
           
      <Box style={styles.buttonContainer}>
        <Button
          onPress={() => {printPoints()}}
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