import React, {} from 'react';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import { MaterialIcons} from '@expo/vector-icons'
import { BotMenuNavegator } from './botbar-menu';
import PageConfigure from '../screens/configuracao';
import PageInformationAdd from '../screens/informacaoAdicional';
import { View, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

const Drawer = createDrawerNavigator();

export const DrawerMenu = () => {
    return(
    <Drawer.Navigator drawerPosition="right" drawerContent = {(props) => (
        <View>
            <DrawerItemList {...props} />
            <TouchableOpacity  style = {{flexDirection: 'row'}} onPress={() => {
                firebase.auth().signOut();
                props.navigation.navigate('loginStart')
            }}>
                <MaterialIcons name="logout" size ={20} style={{marginHorizontal:20}}/>
                <Text style={{alignSelf:'center', fontSize: 15, fontWeight: 'bold'}}> Sair </Text>
            </TouchableOpacity>
        </View>
    )}>
        <Drawer.Screen 
            name = "homeUser" component ={BotMenuNavegator} 
            options ={{ drawerLabel:'Perfil', 
                drawerIcon: () => <MaterialIcons name="home" size ={20}/>}}
        />
        <Drawer.Screen 
            name = "config" component ={PageConfigure} 
            options ={{ drawerLabel:'Configurações', 
                        drawerIcon: () => <MaterialIcons name="settings" size ={20}/>}}
        />
        <Drawer.Screen 
            name = "infoAdd" component ={PageInformationAdd} 
            options ={{ drawerLabel:'Informações Adicionais', 
                        drawerIcon: () => <MaterialIcons name="format-list-bulleted" size ={20}/>}}
        />
    </Drawer.Navigator>
    )
}