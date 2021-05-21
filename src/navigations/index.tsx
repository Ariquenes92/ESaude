import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import LoginStartScreen from '../screens/loginStart';
import HomeDoctorScreen from '../screens/homeDoctor';
import CadastroPacienteScreen from '../screens/cadastroPaciente';
import { DrawerMenu } from './drawer-menu';
import firebase from 'firebase';
import { View } from 'react-native';

const Stack = createStackNavigator();

const Inicial = () =>{
    const nav = useNavigation();

    firebase.auth().onAuthStateChanged(usuario =>
         {nav.navigate((usuario ? 'app' : 'loginStart'))
    })

    return <View/>
}

export const MainNavigation = () =>(
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="inicio" component={Inicial}/>
            <Stack.Screen name="loginStart" component={LoginStartScreen}/>
            <Stack.Screen name="login" component={LoginScreen}/>
            <Stack.Screen name="cadastroPaciente" component={CadastroPacienteScreen}/>
            <Stack.Screen name="app" component={DrawerMenu}/>
            <Stack.Screen name="homeDoctor" component={HomeDoctorScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
)