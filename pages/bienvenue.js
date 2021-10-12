import React, {useEffect,useState}from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Dimensions
    }
from 'react-native';




const width = Dimensions.get('window').width;
const height =  Dimensions.get('window').height;
export default function Bienvenue({ navigation }){
    const [data,setdata] = useState([]);
    const ajouter = () =>{
        navigation.navigate('Ajouter');
    }
    const chercher = () =>{
        navigation.navigate('Chercher');
    }
    const map = () =>{
        navigation.navigate('Map',{from:'bienvenue'});
    }


    return (
        <ImageBackground source={require('../assets/image1.jpg')} style={styles.image}>
            <View style={styles.container}>
                <Text style={styles.text1} numberOfLines={1} adjustsFontSizeToFit>
                    Bienvenue Sur l'application
                </Text>
                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.text2}>
                    Choisissez une Operation
                </Text> 
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={ajouter} style={styles.opacity}>
                            <Text style={styles.textOpac}>Ajouter une place</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}> 
                        <TouchableOpacity onPress={map} style={styles.opacity}>
                            <Text style={styles.textOpac}>La Carte Map</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}> 
                        <TouchableOpacity onPress={chercher} style={styles.opacity}>
                            <Text style={styles.textOpac}>Chercher une place</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create(
    {
        container:{
            padding:'5%',
            flex:1,
            alignContent:'center',
            justifyContent:'center'
        },
        button:{
            flex:1,
            alignContent:'center',
            justifyContent:'center',
            marginLeft:10,
            marginRight:10,
            paddingTop:70,
            paddingLeft:35,
            paddingRight:35

        },
        opacity:{
            backgroundColor:'#9E2D2D',
            borderRadius:20,
            height:37,
            width:'100%'
        },
        textOpac:{
            fontWeight: 'bold',
            color: 'white',
            marginTop: 8,
            textAlign:'center',
            fontSize:16,
            fontWeight: 'bold'
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
            padding:10,
            color:'gray',
            fontSize:17,
            paddingRight:60
        },
        text2:{
            padding:15,
            color:'gray',
            paddingLeft:40,
            paddingBottom:10
        }
    }
)