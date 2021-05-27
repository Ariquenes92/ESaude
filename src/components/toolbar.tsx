import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { Header } from 'react-native-elements';
import { MaterialIcons} from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import 'firebase/firestore';

export interface ToolbarProps {
    titulo:string;
    menu?:boolean;
    back?:boolean;
    perfil?:boolean;
}

export function Toolbar (props: ToolbarProps) {
    let leftComponent = <View/>
    let rightComponent = <View/>

    const nav= useNavigation();

    const db = firebase.firestore().collection('users');
    
    const pegarFoto = async () => {
        let img
    
        const doc = await db.doc(firebase.auth().currentUser.uid).get();
        const resposta = doc.data();
        
        if (Platform.OS == "web"){
            img = resposta?.imagemWeb;
            return img
        }
        else{
            img = resposta?.imagem;
            return ("data:image/jpeg;base64,"+img)
        }
    }

    const [ imagem, setImagem ] = React.useState<string|null>(null);

    const [ nomeUser, setNomeUser ] = React.useState('')
    
    const pegarNome = async () => {
        let nome
    
        const doc = await db.doc(firebase.auth().currentUser.uid).get();
        const resposta = doc.data();       
        nome = resposta?.nome;
    
        return nome
    }


    nav.addListener('focus', () => {
        pegarNome().then(nome => setNomeUser(nome))
        pegarFoto().then(img => setImagem(img))
    })

    const photo = async () =>{
        const selectPhoto = await ImagePicker.launchImageLibraryAsync({
            allowsEdditing: true,
            base64: true,
            exif: true,
            aspect: [3,3],
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
        })


        if (!selectPhoto.cancelled){
            if (Platform.OS == "web"){
                setImagem(selectPhoto.uri)
                db.doc(firebase.auth().currentUser.uid).update({imagemWeb: selectPhoto.uri});
            }
            else{
                setImagem("data:image/jpeg;base64,"+selectPhoto.base64)
                db.doc(firebase.auth().currentUser.uid).update({imagem: selectPhoto.base64});
            }
        }
    }

    if (props.back)
        leftComponent = (
            <TouchableOpacity onPress ={() =>  nav.goBack()}>
                <MaterialIcons name="keyboard-backspace" color ="white" size={20}/>
            </TouchableOpacity>
            )
     
    if (props.menu)
        rightComponent = (
            <TouchableOpacity onPress ={() => nav.dispatch(DrawerActions.toggleDrawer())}>
                <MaterialIcons name="menu" color ="white" size={20}/>
            </TouchableOpacity>
            )

    return (
        <View>
            <Header
                leftComponent={leftComponent}
                centerComponent={{text: props.titulo, style:{fontSize:15, color: 'white'}}}
                rightComponent={rightComponent}
                containerStyle={{backgroundColor:'#006F9A'}}
                style ={{flex:1}}
            />
            {props.perfil && 
            <View style ={styles.perfil}>
                <View style={styles.subPerfil}>
                    <TouchableOpacity style={{}}
                        onPress = {() => photo()}>
                        {!imagem && <Image
                            source ={require('./user.png')}
                            style={styles.imagem}
                        />}
                        {imagem && <Image
                            source = {{uri:imagem}}
                            style={styles.imagem}
                        />}
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{justifyContent:'center'}}>
                            <Text style={{color:'black', fontSize:15,}}>{nomeUser}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    perfil:{
        flex:1,
        padding: 20,
        backgroundColor:'white',
    },
    subPerfil:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagem:{
        width:30,
        height:30,
        borderRadius:15,
    }
})
