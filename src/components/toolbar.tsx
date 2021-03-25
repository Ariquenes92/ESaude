import * as React from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { MaterialIcons} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerActions, useNavigation } from '@react-navigation/core';

export interface ToolbarProps {
    titulo:string;
    menu?:boolean;
    config?:boolean;
}

export function Toolbar (props: ToolbarProps) {
    let leftComponent = <View/>
    let rightComponent = <View/>

    const nav= useNavigation();

    if (props.menu)
        leftComponent = (
            <TouchableOpacity onPress ={() =>  console.log('teste')}>
                <MaterialIcons name="menu" color ="white" size={20}/>
            </TouchableOpacity>
            )
     
    if (props.config)
        rightComponent = (
            <TouchableOpacity onPress ={() => nav.dispatch(DrawerActions.toggleDrawer())}>
                <MaterialIcons name="settings" color ="white" size={20}/>
            </TouchableOpacity>
            )
    

    return (
      <Header
        leftComponent={leftComponent}
        centerComponent={{text: props.titulo, style:{fontSize:15, color: 'white'}}}
        rightComponent={rightComponent}
        containerStyle={{backgroundColor:'#006F9A'}}
      />
    );
}
