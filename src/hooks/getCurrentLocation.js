import * as Location from 'expo-location';

const getCurrentLocation = async () => {
  let location = null;
  let errorMsg = '';

  try{
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      errorMsg = 'Permission not granted';
      return { location, errorMsg };
    }
  }catch(e){
    errorMsg = 'Permission not granted';
  }
  
  try{
    location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  }catch(e){
    errorMsg = 'Unable to retrieve user location';
    return { location, errorMsg };
  }

  return { location, errorMsg };
};

export default getCurrentLocation;