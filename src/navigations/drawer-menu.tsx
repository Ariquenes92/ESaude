import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeUserScreen from '../screens/homeUser';
import { MaterialIcons} from '@expo/vector-icons'
import LoginStartScreen from '../screens/loginStart';
import { BotMenuNavegator } from './botbar-menu';

const Drawer = createDrawerNavigator();

export const DrawerMenu = () => (
    <Drawer.Navigator drawerPosition="right">
        <Drawer.Screen 
            name = "homeUser" component ={BotMenuNavegator} 
            options ={{ drawerLabel:'Perfil', 
                drawerIcon: () => <MaterialIcons name="home" size ={20}/>}}
        />
        <Drawer.Screen 
            name = "config" component ={BotMenuNavegator} 
            options ={{ drawerLabel:'Configurações', 
                        drawerIcon: () => <MaterialIcons name="settings" size ={20}/>}}
        />
        <Drawer.Screen 
            name = "loginStart" component ={LoginStartScreen} 
            options ={{ drawerLabel:'Sair', 
                        drawerIcon: () => <MaterialIcons name="logout" size ={20}/>}}
        />
    </Drawer.Navigator>
)