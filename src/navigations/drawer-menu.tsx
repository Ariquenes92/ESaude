import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { MaterialIcons} from '@expo/vector-icons'
import LoginStartScreen from '../screens/loginStart';
import { BotMenuNavegator } from './botbar-menu';
import PageConfigure from '../screens/configuracao';
import PageInformationAdd from '../screens/informacaoAdicional';

const Drawer = createDrawerNavigator();

export const DrawerMenu = () => (
    <Drawer.Navigator drawerPosition="right">
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
                        drawerIcon: () => <MaterialIcons name="settings" size ={20}/>}}
        />
        <Drawer.Screen 
            name = "loginStart" component ={LoginStartScreen} 
            options ={{ drawerLabel:'Sair', 
                        drawerIcon: () => <MaterialIcons name="logout" size ={20}/>}}
        />
    </Drawer.Navigator>
)