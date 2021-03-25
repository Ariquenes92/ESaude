import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeUserScreen from '../screens/homeUser';
import { ConfigGeralScreen } from '../config/geral';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => (
    <Drawer.Navigator>
        <Drawer.Screen name="homeUser" component={HomeUserScreen}/>
        <Drawer.Screen name="config" component={ConfigGeralScreen}/>
    </Drawer.Navigator>
)

