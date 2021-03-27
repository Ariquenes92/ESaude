import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import LoginStartScreen from '../screens/loginStart';
import HomeDoctorScreen from '../screens/homeDoctor';
import CadastroPacienteScreen from '../screens/cadastroPaciente';
import { DrawerMenu } from './drawer-menu';

const Stack = createStackNavigator();

export const MainNavigation = () =>(
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="app" component={DrawerMenu}/>
            <Stack.Screen name="loginStart" component={LoginStartScreen}/>
            <Stack.Screen name="login" component={LoginScreen}/>
            <Stack.Screen name="cadastroPaciente" component={CadastroPacienteScreen}/>
            <Stack.Screen name="homeDoctor" component={HomeDoctorScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
)