import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import { Toolbar} from '../../components/toolbar';
import Consulta from '../../models/consulta';
import { ItemConsulta, HistoricoConsulta } from './components';

export default function HistoricoScreen (props:any){

    const nav = useNavigation()
    const route = useRoute()

    const [ consultas, setConsultas ] = React.useState([
        new Consulta ("Dr.João", "Cardiologista", "20/01/2021"),
        new Consulta ("Dra.Laura", "Nutricionista", "30/01/2021"),
    ])

    return  (
        <View style={{flex:1}}>
            {/* CABEÇALHO*/}
            <Toolbar titulo="Perfil" menu perfil/>

            {/*MEIO*/}
            <View style={styles.mid}>
                <View style={styles.boxMid}>
                    <View style={{justifyContent:'center', alignItems: 'center',}}>
                        <Text style={{fontSize:20, fontWeight:'bold',}}>Suas Consultas</Text>
                    </View>

                    <View style={styles.headBox}>
                        <Text style={styles.line}> Médico </Text>
                        <Text style={styles.line}> Especialidade </Text>
                        <Text style={styles.line}> Data </Text>
                    </View>
                    
                    <FlatList
                        data={consultas}
                        renderItem={({item}) => (
                            <HistoricoConsulta
                                consulta={item}
                                onDetalhar={(consulta) => console.log(consulta)}
                                onRepetir={(id) => console.log(id)}
                            />
                        )}
                    />

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
    line:{
        fontSize:15,
    },
})