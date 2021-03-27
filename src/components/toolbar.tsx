import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { MaterialIcons} from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native';

export interface ToolbarProps {
    titulo:string;
    menu?:boolean;
    back?:boolean;
}

export function Toolbar (props: ToolbarProps) {
    let leftComponent = <View/>
    let rightComponent = <View/>

    const nav= useNavigation();

    if (props.back)
        leftComponent = (
            <TouchableOpacity onPress ={() =>  nav.goBack()}>
                <MaterialIcons name="keyboard-backspace" color ="white" size={20}/>
            </TouchableOpacity>
            )
     
    if (props.menu)
        rightComponent = (
            <TouchableOpacity onPress ={() => nav.dispatch(DrawerActions.toggleDrawer())}>
                <MaterialIcons name="menu" color ="white" size={20}/>
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
