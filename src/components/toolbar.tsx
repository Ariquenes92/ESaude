import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { Header } from 'react-native-elements';
import { MaterialIcons} from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

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

    const [ imagem, setImagem ] = React.useState<string|null>(null);

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
            }
            else{
                setImagem("data:image/jpeg;base64,"+selectPhoto.base64)
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
                <View style={{flexDirection:'row', marginRight: 20,}}>
                    <TouchableOpacity 
                        onPress = {() => photo()}>
                        {!imagem && <Image
                            source ={require('./user.png')}
                            style={{width:30, height:30}}
                        />}
                        {imagem && <Image
                            source = {{uri:imagem}}
                            style={{width:30, height:30}}
                        />}
                    </TouchableOpacity>
                    <Text style={{color:'black', fontSize:15, marginTop:5,}}> Nome </Text>
                </View>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    perfil:{
        flex:1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
    },
})
