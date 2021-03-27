import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import HomeUserScreen from '../screens/homeUser';
import PageConfigure from '../screens/configuracao';

const Top = createMaterialTopTabNavigator();

export const TopMenuNavigation = () =>(
    <Top.Navigator>
        <Top.Screen name="Histórico de Consultas" component={PageConfigure}/>
        <Top.Screen name="Buscar nova Consulta" component={HomeUserScreen}/>
    </Top.Navigator>
)