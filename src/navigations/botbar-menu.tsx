import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeUserScreen from '../screens/homeUser';
import HistoricoScreen from '../screens/homeUser/historicoConsulta';
import NovaConsultaScreen from '../screens/homeUser/novaConsulta';

const Bot = createBottomTabNavigator();

export const BotMenuNavegator = () =>(
    <Bot.Navigator
        tabBarOptions={{
            activeBackgroundColor:'#ADD8E6',
            inactiveBackgroundColor:'white',
            inactiveTintColor:'black',
        }}
    >
        <Bot.Screen name="Suas Consultas" component={HomeUserScreen}/>
        <Bot.Screen name="Nova Consulta" component={NovaConsultaScreen}/>
        <Bot.Screen name="Histórico de Consultas" component={HistoricoScreen}/>
    </Bot.Navigator>
)