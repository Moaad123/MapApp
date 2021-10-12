import React,{useEffect,useState} from 'react';
import 
{
    StyleSheet,
    View,
    Text, 
    ImageBackground,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Platform,
    Modal,
    Dimensions,
    KeyboardAvoidingView,
    LogBox,
    ScrollView
}  
from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import {Formik} from 'formik';
import * as yup from 'yup';
import MapView from 'react-native-maps';
import db from '../config';
import * as firebase from 'firebase';




LogBox.ignoreLogs(['Setting a timer']); 
const validate = yup.object({
    nom : yup.string().required('merci de remplir le champ'),
    adresse : yup.string().required('merci de remplir le champ'),
    categorie : yup.string().required('merci de remplir le champ'),
    ville : yup.string().required('merci de remplir le champ'),
});
const {width,height} = Dimensions.get('window');


export default function Ajouter(){
    const [image, setImage] = useState(null);
    const [modal,setmodal] = useState(false);
    const [latitude,setlatitude] = useState(0);
    const [longitude,setlongitude] = useState(0);
    const [coordinate,setcoordinate] = useState({latitude:37.78825,longitude:-122.4324});

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          setlatitude(location.coords.latitude);
          setlongitude(location.coords.longitude);
        })();
      }, []);
    
    const storeData =async(data,img)=>{
        const response = await fetch(img);
        const blob = await response.blob();
        db.collection("users")
        .add(
            {
                nom:data.nom,
                adresse:data.adresse,
                categorie:data.categorie,
                ville:data.ville,
                latitude:data.latitude,
                longtitude:data.longitude
            }
        ).then((doc)=>{
            firebase.storage().ref().child("users/"+doc.id).put(blob);
        }
        );
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled){
            setImage(result.uri);
        }
    };

    const takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled){
            setImage(result.uri);
        }
    };
    const getLocation = (values,coordinate) => {
        setcoordinate(coordinate);
        values.latitude = coordinate.latitude;
        values.longitude = coordinate.longitude;
        Alert.alert(
            "note",
            "cliquer sur 'confirme' pour confirmer le choi",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "Confirme", onPress: () => {setmodal(false);}}
            ]
        );
    }
    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
            <ImageBackground source={require('../assets/image1.jpg')} style={styles.image}>
                <Formik 
                    initialValues={{nom:'',adresse:'',categorie:'',ville:'',longitude:'',latitude:''}}
                    validationSchema={validate}
                    onSubmit={(values,actions) => {
                        actions.resetForm();
                        storeData(values,image);
                        Alert.alert('Une nouveau place est ajouté avec succé');
                    }}
                >
                    {(props) => (
                            <View style={styles.container}>
                                <Modal visible={modal} animationType='slide'>
                                    <MapView 
                                        style={styles.map}
                                        loadingEnabled={true}
                                        region={{
                                        latitude: latitude,
                                        longitude: longitude,
                                        latitudeDelta: 0.015,
                                        longitudeDelta: 0.0121
                                        }}
                                        showsUserLocation={true}
                                        onPress={ (event) => getLocation(props.values,event.nativeEvent.coordinate)}
                                    >
                                        <MapView.Marker
                                            coordinate={coordinate}
                                        />
                                    </MapView>
                                </Modal>
                                <ScrollView contentContainerStyle={{flexGrow:1,justifyContent:'center'}}>
                                    <View style={styles.text_container}>
                                        <TextInput 
                                            style={styles.input}
                                            onChangeText={props.handleChange('nom')}
                                            value={props.values.nom}
                                            placeholder='Nom'/>
                                        <TextInput 
                                            style={styles.input}
                                            onChangeText={props.handleChange('adresse')}
                                            value={props.values.adresse}
                                            placeholder='Adresse'/>
                                        <TextInput style={styles.input} 
                                            onChangeText={props.handleChange('categorie')}
                                            value={props.values.categorie}
                                            placeholder='Catégorie'/>
                                        <TextInput 
                                            style={styles.input}
                                            onChangeText={props.handleChange('ville')}
                                            value={props.values.ville}
                                            placeholder='Ville'/>
                                        <View style={styles.buttons}>
                                        <View style={styles.button}>
                                            <TouchableOpacity 
                                                onPress={()=>{Alert.alert(
                                                                        "Ajouter une Image",
                                                                        "choisissez une image ou prenez une photo",
                                                                        [
                                                                            {
                                                                                text: "Cancel",
                                                                                onPress: () => console.log("Cancel Pressed"),
                                                                                style: "cancel"
                                                                            },
                                                                            { text: "Camera", onPress: () => {takeImage()}},
                                                                            { text: "Gallery", onPress: () => {pickImage()}}
                                                                        ]
                                                                    );}} 
                                                style={styles.opacity}>
                                                <Text style={styles.textOpac}>Ajouter Photos</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.button}>
                                            <TouchableOpacity onPress={()=>{setmodal(true)}} style={styles.opacity}>
                                                <Text style={styles.textOpac}>Localisation</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.button}>
                                            <TouchableOpacity onPress={props.handleSubmit} style={styles.opacity}>
                                                <Text style={styles.textOpac}>Enregistrer</Text>
                                            </TouchableOpacity>
                                        </View>  
                                        </View>  
                                    </View>
                                </ScrollView>
                            </View>
                    )}
                </Formik>
          
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            padding:'6%',
            paddingTop:'10%',
            alignContent:'center',
            justifyContent:'center'

        },
        opacity:{
            backgroundColor:'#9E2D2D',
            borderRadius:20,
            height:37,
            width:'100%'
        },
        textOpac:{
            textAlign:'center',
            color: 'white',
            marginTop: 8,
            fontSize:16,
            fontWeight: 'bold'
        },
        button:{
            justifyContent:'center',
            alignContent: 'center',
            alignItems:'center',
            padding:18,
            paddingRight: 15
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
            color:'gray',
        },
        input:{
            borderWidth:1,
            borderColor:'#777',
            backgroundColor: "#CCC",
            padding:8,
            borderRadius:20,
            margin:10,
        },
        map:{
            width,
            height
        },
        block:{
            backgroundColor:'#fff',
            height:120,
            width:width-20
        }
    }
)