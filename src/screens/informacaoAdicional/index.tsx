import * as React from 'react';
import { View, Text } from 'react-native';
import { Toolbar} from '../../components/toolbar';

export default function PageInformationAdd (props:any){
    return(
        <View>
            <Toolbar titulo="Informações Adicionais" back/>
            <Text style={{fontSize:30}}> TESTANDO </Text>
        </View>
    )
}