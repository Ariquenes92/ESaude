import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import { Toolbar} from '../../components/toolbar';

export default function NovaConsultaScreen (props:any){

    const nav = useNavigation()
    const route = useRoute()

    return  (
        <View style={{flex:1}}>
            {/* CABEÇALHO*/}
            <Toolbar titulo="Perfil" menu perfil/>

            {/*MEIO*/}
            <View style={styles.mid}>
                <View style={styles.boxMid}>
                    <View style={{justifyContent:'center', alignItems: 'center',}}>
                        <Text style={{fontSize:20, fontWeight:'bold',}}>Buscar nova Consulta</Text>
                    </View>

                    <View style={styles.headBox}>
                        <Text style={styles.lineOne}> Médico </Text>
                        <Text style={styles.lineTwo}> Especialidade </Text>
                        <Text style={styles.lineThree}> Data </Text>
                    </View>
                    <View style={styles.insideBox}>
                        <Text style={styles.lineOne}> Dr.João </Text>
                        <Text style={styles.lineTwo}> Cardiologista </Text>
                        <Text style={styles.lineThree}> 20/05/2021 </Text>
                    </View>
                    <View style={styles.insideBox2}>
                        <Text style={styles.lineOne}> Dra.Laura </Text>
                        <Text style={styles.lineTwo}> Nutricionista </Text>
                        <Text style={styles.lineThree}> 12/06/2021 </Text>
                    </View>
                    <View style={styles.insideBox}>
                        <Text style={styles.lineOne}> Dr.João </Text>
                        <Text style={styles.lineTwo}> Cardiologista </Text>
                        <Text style={styles.lineThree}> 25/07/2021 </Text>
                    </View>
                    <View style={styles.insideBox2}>
                        <Text style={styles.lineOne}> Dra.Laura </Text>
                        <Text style={styles.lineTwo}> Nutricionista </Text>
                        <Text style={styles.lineThree}> 12/09/2021 </Text>
                    </View>

                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mid:{
        flex: 8,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#006F9A',
    },
    boxMid:{
        flex: 1,
        padding: 10,
        alignItems: 'stretch',
        backgroundColor:'white',
        borderRadius: 20,
        width: 300,
        height:300,
    },
    headBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor:'white',
    },
    insideBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor:'#ADD8E6',
    },
    insideBox2:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor:'#B0C4DE',
    },
    lineOne:{
        fontSize:15,
    },
    
    lineTwo:{
        fontSize:15,
    },
    
    lineThree:{
        fontSize:15,
    }
})