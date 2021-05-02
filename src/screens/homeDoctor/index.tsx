import * as React from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

export default function HomeDoctorScreen (props: any) {
    
    const nav = useNavigation()
    const route = useRoute()   
    
    return (
      <View>
        <Text style={{fontSize:30, alignSelf:'center'}}> EM MANUNTEÇÃO</Text>
      </View>
    );
}
