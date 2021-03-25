import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeUserScreen from '../screens/homeUser';
import { ConfigGeralScreen } from '../config/geral';
import { MaterialIcons} from '@expo/vector-icons'
import LoginStartScreen from '../screens/loginStart';

const Drawer = createDrawerNavigator();

export const DrawerMenu = () => (
    <Drawer.Navigator drawerPosition="right">
        <Drawer.Screen name = "homUser" component ={HomeUserScreen} 
            options ={{ drawerLabel:'Perfil', 
                drawerIcon: () => <MaterialIcons name="home" size ={20}/>}}
        />
        <Drawer.Screen name = "config" component ={ConfigGeralScreen} 
            options ={{ drawerLabel:'Configurações', 
                        drawerIcon: () => <MaterialIcons name="settings" size ={20}/>}}
        />
        <Drawer.Screen name = "loginStart" component ={LoginStartScreen} 
            options ={{ drawerLabel:'Sair', 
                        drawerIcon: () => <MaterialIcons name="logout" size ={20}/>}}
        />
    </Drawer.Navigator>
)

