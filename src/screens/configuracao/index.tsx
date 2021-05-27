import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button} from 'react-native-elements';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { Toolbar} from '../../components/toolbar';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';
import 'firebase/firestore';

export interface Config {
    notDia?: string;
    notDiaAnt?: string;
    tiposDeNot?: string;
    enviarEmail?: string;
}

export default function PageConfigure (){
    const nav = useNavigation()
    
    const db = firebase.firestore().collection('users');

    const confirm = async () =>{
        const doc = await db.doc(firebase.auth().currentUser.uid);

        const dados = {
            notiDia: valueDia,
            notiDiaAnt: valueDiaAnt,
            tiposDeNot: valueTiposDeNot,
            enviarEmail: valueEnviarEmail,
        }

        doc.update(dados).then( () => {
            nav.navigate('homeUser')
        })
    }

    const voltar = async () =>{
        nav.goBack()
    }

    const pegarDados = async () =>{
        const doc = await db.doc(firebase.auth().currentUser.uid).get();
        const dados = doc.data()

        const valor = dados.notiDia
        setValueDia(valor)

        const valor2 = dados.notiDiaAnt
        setValueDiaAnt(valor2)

        const valor3 = dados.tiposDeNot
        setValueTiposDeNot(valor3)

        const valor4 = dados.enviarEmail
        setValueEnviarEmail(valor4)
    }

    nav.addListener('focus', () => {
        pegarDados()
    })

    const [ notDia, setNotDia ] = useState([
        {label: 'Sim', value: '1'},
        {label: 'Não', value: '2'},
    ])
    const [ notDiaAnt, setNotDiaAnt ] = useState([
        {label: 'Sim', value: '1'},
        {label: 'Não', value: '2'},
    ])
    const [ tiposDeNot, setTiposDeNot ] = useState([
        {label: 'Tocar', value: '1'},
        {label: 'Vibrar', value: '2'},
    ])
    const [ enviarEmail, setEnviarEmail ] = useState([
        {label: 'Sim', value: '1'},
        {label: 'Não', value: '2'},
    ])

    const [ valueDia, setValueDia] = useState();
    const [ valueDiaAnt, setValueDiaAnt] = useState()
    const [ valueTiposDeNot, setValueTiposDeNot] = useState()
    const [ valueEnviarEmail, setValueEnviarEmail] = useState()

    const controller = useRef(null);

    //Botão pra mostrar senha
    const config : Config = {};
    return(
        <View style={{flex:1}}>
            <Toolbar titulo="Configurações" back/>
            <View style={{alignItems:'center'}}>
                <Formik enableReinitialize
                    //Dados iniciais 
                    initialValues={config}
                    // Validação de formulário
                    
                    //Envio
                    onSubmit={confirm}
                >
                 {({handleSubmit, isSubmitting}) => (
                    <View style={{flex:1}}>
                        <Text style={styles.titulo}> Notificações </Text>

                        {/* Dia da Consulta */}
                        <View style={{ alignItems: 'center', flexDirection: 'row',}}>
                            <Text style={styles.subtopicos}> Notificar no dia da Consulta </Text>
                            <DropDownPicker
                                items={notDia}

                                placeholder = {(valueDia == '1') ? 'Sim' : 'Não'}
                                containerStyle ={styles.container}
                                itemStyle={{ justifyContent: 'center', }}
                                dropDownStyle={{backgroundColor: 'white'}}
                                labelStyle={{color: '#006F9A'}}
                                selectedLabelStyle={{color: '#006F9A'}}

                                onChangeList={(notDia, callback) => {
                                    Promise.resolve(setNotDia(notDia))
                                    .then(() => callback());
                                }}
                                controller={instance => controller.current = instance}
                                onChangeItem={item => {setValueDia(item.value)}}
                            />
                        </View>

                        {/* Dia anterior */}
                        <View style={{ alignItems: 'center',  zIndex: -2, flexDirection: 'row',}}>
                            <Text style={styles.subtopicos}> Notificar no dia anterior da Consulta </Text>
                            <DropDownPicker
                                items={notDiaAnt}

                                placeholder = {(valueDiaAnt == '1') ? 'Sim' : 'Não'}
                                containerStyle ={styles.container}
                                itemStyle={{ justifyContent: 'center', }}
                                dropDownStyle={{backgroundColor: 'white'}}
                                labelStyle={{color: '#006F9A'}}
                                selectedLabelStyle={{color: '#006F9A'}}

                                onChangeList={(notDiaAnt, callback) => {
                                    Promise.resolve(setNotDiaAnt(notDiaAnt))
                                    .then(() => callback());
                                }}
                                controller={instance => controller.current = instance}
                                onChangeItem={item => {setValueDiaAnt(item.value)}}
                            />
                        </View>

                        {/* Tipo de Alerta */}
                        <View style={{ alignItems: 'center',  zIndex: -4, flexDirection: 'row',}}>
                            <Text style={styles.subtopicos}> Tipos de Notificação </Text>
                            <DropDownPicker
                                items={tiposDeNot}

                                placeholder = {(valueTiposDeNot == '1') ? 'Tocar' : 'Vibrar'}
                                containerStyle ={styles.container}
                                itemStyle={{ justifyContent: 'center', }}
                                dropDownStyle={{backgroundColor: 'white'}}
                                labelStyle={{color: '#006F9A'}}
                                selectedLabelStyle={{color: '#006F9A'}}

                                onChangeList={(tiposDeNot, callback) => {
                                    Promise.resolve(setTiposDeNot(tiposDeNot))
                                    .then(() => callback());
                                }}
                                controller={instance => controller.current = instance}
                                onChangeItem={item => {setValueTiposDeNot(item.value)}}
                            />
                        </View>

                        {/* Notificação por EMAIL */}
                        <View style={{ alignItems: 'center',  zIndex: -6, flexDirection: 'row',}}>
                            <Text style={styles.subtopicos}> Receber notificação por E-mail? </Text>
                            <DropDownPicker
                                items={enviarEmail}

                                placeholder = {(valueEnviarEmail == '1') ? 'Sim' : 'Não'}
                                containerStyle ={styles.container}
                                itemStyle={{ justifyContent: 'center', }}
                                dropDownStyle={{backgroundColor: 'white'}}
                                labelStyle={{color: '#006F9A'}}
                                selectedLabelStyle={{color: '#006F9A'}}

                                onChangeList={(enviarEmail, callback) => {
                                    Promise.resolve(setEnviarEmail(enviarEmail))
                                    .then(() => callback());
                                }}
                                controller={instance => controller.current = instance}
                                onChangeItem={item => {setValueEnviarEmail(item.value)}}
                            />
                        </View>
                        
                        {/* Botão */}
                        <View style={styles.botao}>
                            <Button title="Confirmar" onPress={() => handleSubmit()} buttonStyle={{height:20, backgroundColor: '#006F9A'}}
                                containerStyle={{width:100, marginTop:10}} titleStyle={{color:'white', fontSize:15}}
                                raised={true} type="outline" />
                            <Button title="Cancelar" buttonStyle={{height:20, backgroundColor: 'red',}}
                                containerStyle={{width:100, marginTop:10, marginLeft:10}} titleStyle={{color:'white', fontSize:15}}
                                raised={true} type="outline" 
                                onPress ={() => voltar()} 
                            />
                        </View>
                    </View>
                )}

                </Formik>

                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titulo:{
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
    },
    container: {
        padding: 2,
        height: 20,
        width: 100,
    },
    subtopicos:{
        fontSize: 15,
        color: '#006F9A',
    },
    botao:{
        flexDirection: 'row',
        padding: 10,
        zIndex: -10,
        alignSelf: 'center',
    },
    erro:{
        alignSelf:'center',
        fontSize: 8,
        color: 'red',
    },
});