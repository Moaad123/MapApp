import React,{useEffect,useState} from 'react';
import {StyleSheet,
    View,
    Dimensions,
}  from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';


export default function Map({navigation}){
    const [location, setlocation] = useState(null); 
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude,setlatitude] = useState(0);
    const [longitude,setlongitude] = useState(0);
    const [markop,setmarkop] = useState(0);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setlocation(location);
        if(navigation.getParam('from')=='chercher'){
              setlatitude(parseFloat(navigation.getParam('data').lat,10));
              setlongitude(parseFloat(navigation.getParam('data').long,10));
              setmarkop(1);
        }else{
            setlatitude(location.coords.latitude);
            setlongitude(location.coords.longitude);
            setmarkop(0);
        }
      })();
    }, []);
    
    return (
            <View style={styles.container}>
                <MapView 
                     region={{
                       latitude: latitude,
                       longitude: longitude,
                       latitudeDelta: 0.015,
                       longitudeDelta: 0.0121
                     }}
                     showsMyLocationButton={true}
                     showsUserLocation={true}
                     followsUserLocation={true}
                     style={styles.map}
                >
                   <MapView.Marker
                        coordinate={{
                            latitude:latitude,
                            longitude:longitude
                        }}
                        opacity={markop}
                                />
                </MapView>
            </View>
    )
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        },
        text_container:{
            padding:15,
            textAlign:'center',
        },
        image:{
            flex:1,
            resizeMode:'cover',
            justifyContent:'center',
        },
        text1:{
            padding:15,
            color:'gray',
        },
        text2:{
            padding:15,
            color:'gray'
        },
        input:{
            borderWidth:1,
            borderColor:'#777',
            backgroundColor: "#CCC",
            padding:8,
            margin:10
        },
        map:{
            position:'absolute',
            width:Dimensions.get('window').width,
            height:Dimensions.get('screen').height
        }
    }
)