import * as React from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import { Toolbar} from '../../components/toolbar';
import { ItemConsulta} from './components';
import Consulta from '../../models/consulta';
import firebase from 'firebase';
import 'firebase/firestore';
import { AdMobBanner } from 'expo-ads-admob';

export default function HomeUserScreen (props:any){

    const nav = useNavigation();
    const route = useRoute();

    const db = firebase.firestore().collection('users');
    
    const [ consultas, setConsultas ] = React.useState([])

    const pegarConsultas = async () => {
        const doc = await db.doc(firebase.auth().currentUser.uid).collection('consultas').orderBy('data').get();
        
        let cons = []
        doc.forEach( dados => {
            const resposta = dados.data();
            const idConsulta = dados.id
            cons = [...cons.concat(new Consulta (resposta.medico, resposta.especialidade, resposta.data, idConsulta))]
        });
        setConsultas(cons)
    }

    const deletarConsulta = async (id) =>{
        const doc = await db.doc(firebase.auth().currentUser.uid).collection('consultas').doc(id);
        doc.delete()
        pegarConsultas()
    }

    nav.addListener('focus', () => {
        pegarConsultas()
    })

    return (
        <View style={{flex:1}}>
            {/* CABEÇALHO*/}
            <Toolbar titulo="Perfil" menu perfil/>

            {/*MEIO*/}
            <View style={styles.mid}>
                {(Platform.OS == 'android') && <AdMobBanner
                    adUnitID="ca-app-pub-3940256099942544/6300978111"
                    bannerSize="smartBannerPortrait"
                />}
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
                            <ItemConsulta
                                consulta={item}
                                onExcluir={(id) => deletarConsulta(id)}
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