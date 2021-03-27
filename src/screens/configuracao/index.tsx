import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button} from 'react-native-elements';
import { useNavigation, useRoute, DrawerActions} from '@react-navigation/native';
import { Toolbar} from '../../components/toolbar';

export default function PageConfigure (props:any){
    return(
        <View>
            <Toolbar titulo="Configurações" back/>
            <Text style={{fontSize:30}}> TESTANDO </Text>
        </View>
    )
}