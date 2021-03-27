import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeUserScreen from '../screens/homeUser';
import HistoricoScreen from '../screens/homeUser/historicoConsulta';
import NovaConsultaScreen from '../screens/homeUser/novaConsulta';

const Top = createBottomTabNavigator();

export const BotMenuNavegator = () =>(
    <Top.Navigator
        tabBarOptions={{
            activeBackgroundColor:'#ADD8E6',
            inactiveBackgroundColor:'white',
            inactiveTintColor:'black',
        }}
    >
        <Top.Screen name="Suas Consultas" component={HomeUserScreen}/>
        <Top.Screen name="Buscar nova Consulta" component={NovaConsultaScreen}/>
        <Top.Screen name="Histórico de Consultas" component={HistoricoScreen}/>
    </Top.Navigator>
)