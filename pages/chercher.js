import React,{useEffect,useState} from 'react';
import {StyleSheet,
    View,
    Text, 
     ImageBackground,
     TextInput,
     Image,
     TouchableWithoutFeedback,
     Keyboard,
     TouchableOpacity,
     Dimensions,
     FlatList
    }  from 'react-native';
import db from '../config';
import * as firebase from 'firebase';


const { width } = Dimensions.get('window');
height = width * 45/60;
export default function Chercher({navigation}){
    const [images,setimages] = useState([]);
    const [categorie,setcategorie] = useState('');
    const [ville,setville] = useState('');



    const getData = async(Ville,Catego)=>{
        let data = [];
        if(Ville && Catego){
            var snapshot = await db.collection("users").where("ville","==",Ville).where("categorie","==",Catego).get()
        }else if(Ville && !Catego){
                var snapshot = await db.collection("users").where("ville",'==',Ville).get();
        }else if(Catego && !Ville){
            var snapshot = await db.collection("users").where("categorie",'==',Catego).get();
        }else{
            var snapshot = await db.collection("users").get();
        }
        snapshot.forEach(doc=>{
            firebase.storage().ref('users/'+doc.id).getDownloadURL().then((url)=>{
                data.push({uri:url,key:doc.id,ville:doc.data().ville,categorie:doc.data().categorie});
                setimages(data);
            })
        })    
    }

    const navigateTo = async(docu) =>{
        var dataSend = {lat:0,long:0}
        db.collection("users").doc(docu)
        .get()
        .then((doc)=>{
            dataSend.lat = doc.data().latitude;
            dataSend.long = doc.data().longtitude;
            navigation.navigate('Map',{data:dataSend,from:'chercher'});
        })
    }

    useEffect(() => {
        let ismounted = true;
        if(ismounted)
        {
            getData(ville,categorie);
        }
        return ()=>{ismounted = false}
    },[]);

    
    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
            <ImageBackground source={require('../assets/image1.jpg')} style={styles.ground}>
                <View style={styles.container}>
                    <View style={styles.text_container}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(ville) => setville(ville)}
                            onSubmitEditing={()=>{getData(ville,categorie)}}
                            placeholder='Ville'/>
                        <TextInput style={styles.input}
                            onChangeText={(categ) => setcategorie(categ)}
                            onSubmitEditing={()=>{getData(ville,categorie)}}
                            placeholder='Catégorie'/>
                    </View>
                    <FlatList
                            pagingEnabled
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{width,height}}
                            data={images}
                            renderItem={({item})=>(
                                <TouchableOpacity onPress={()=>{navigateTo(item);}}>
                                        <View style={styles.cardView}>
                                            <Image style={styles.image} source={{ uri: item.uri }} />
                                            <View style={styles.textView}>
                                            <Text style={styles.itemTitle}> {item.ville}</Text>
                                            <Text style={styles.itemDescription}>{item.categorie}</Text>
                                            </View>
                                        </View>     
                                </TouchableOpacity>   
                            )}
                        />
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create(
    {
        container:{
            paddingBottom:250,
            paddingTop:300,
        },
        text_container:{
            padding:15,
            textAlign:'center',
        },
        ground:{
            flex:1,
            resizeMode:'contain',
            justifyContent:'center',
        },
        input:{
            borderWidth:1,
            borderColor:'#777',
            backgroundColor: "#CCC",
            padding:8,
            borderRadius:20,
            margin:10,
        },
        cardView: {
            flex: 1,
            width: width - 20,
            backgroundColor: 'transparent',
            margin: 10,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0.5, height: 0.5 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
        },
        textView: {
            position: 'absolute',
            bottom: 10,
            margin: 10,
            left: 5,
        },
        image: {
            width: width - 20,
            height,
            borderRadius: 10
        },
        itemTitle: {
            color: 'black',
            fontSize: 30,
            shadowColor: '#000',
            shadowOffset: { width: 0.8, height: 0.8 },
            shadowOpacity: 1,
            shadowRadius: 3,
            marginBottom: 5,
            fontWeight: "bold",
            elevation: 5
        },
        itemDescription: {
            color: 'black',
            fontSize: 20,
            left:20,
            shadowColor: '#000',
            shadowOffset: { width: 0.8, height: 0.8 },
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 5
        },
        mod:{
            alignItems: 'flex-end'
        },
        opacity:{
            margin: '3%',
            alignSelf: 'center',
            backgroundColor:'#9E2D2D',
            borderRadius:20,
            height:37,
            width:'50%'
        },
        textOpac:{
            textAlign:'center',
            color: 'white',
            marginTop: 8,
            fontSize:16,
            fontWeight: 'bold'
        }
    }
)