import React, { useState, Component, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import { Toolbar} from '../../components/toolbar';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInputMask } from 'react-native-masked-text';
import firebase from 'firebase';
import 'firebase/firestore';

export interface NovaConsulta {
    data?: string;
    hora?: string;
    especialidade?: string;
    medico?: string;
}

export default function NovaConsultaScreen (props:any){

    const nav = useNavigation()

    const confirm = (dados:any) =>{
        adicionarConsulta(dados)
        nav.navigate('homeUser')
    }

    const db = firebase.firestore().collection('users');
    

    const consulta : NovaConsulta = {};

    const adicionarConsulta = async dados => {
        const doc = await db.doc(firebase.auth().currentUser.uid).collection('consultas');

        const consulta = {
            medico: dados.medico,
            especialidade: dados.especialidade,
            data: dados.data
        }

        doc.add(consulta);
    }

    const pegarEspecialidade = async () =>{
        const dbConsulta = await firebase.firestore().collection('especialidade').get();

        let especialidades = [{label: 'Especialidade', value: '0', selected: true}]
        let value = 1;

        dbConsulta.forEach( dados => {
            const resposta = dados.data();
            
            especialidades = [...especialidades.concat({label: resposta.especialidade, value: resposta.value, selected: false})]
            value++
        }); 
        setEspecialidade(especialidades)
    }
    const [ valueE, setValueE ] = useState(null);

    nav.addListener('focus', () => {
        pegarEspecialidade().then(esp => console.log(esp))
    })
    
    const [ especialidade, setEspecialidade ] = useState()

    const [ valueM, setValueM ] = useState(null);

    const [ medico1, setMedico1 ] = useState([
        {label: 'Médico', value: '0'},
        {label: 'João', value: '1'},
        {label: 'Carlos', value: '2'},
        {label: 'Carla', value: '3'},
    ])
    const [ medico2, setMedico2 ] = useState([
        {label: 'Médico', value: '0'},
        {label: 'Maria', value: '1'},
        {label: 'Pedro', value: '2'},
        {label: 'Laura', value: '3'},
    ])
    const [ medico, setMedico ] = useState([
        {label: 'Médico', value: '0'}
    ])

    const controller = useRef(null);

    const today = new Date();
    today.setHours(0, 0, 0, 0)

    return  (
        <View style={{flex:1}}>
            {/* CABEÇALHO*/}
            <Toolbar titulo="Perfil" menu perfil/>

            {/*MEIO*/}
            <View style={styles.mid}>
                <View style={styles.boxMid}>
                    <View style={{justifyContent:'center', alignItems: 'center',}}>
                        <Text style={{fontSize:20, fontWeight:'bold',}}>Nova Consulta</Text>
                    </View>
                    <Formik
                    //Dados iniciais 
                    initialValues={consulta}
                    // Validação de formulário
                    validationSchema={Yup.object().shape({
                        data: Yup.date().required('Informe uma data válida').min(today, 'A data não pode ser no passado'),
                    })}
                    //Envio
                    onSubmit={confirm}
                >
                 {({errors, handleBlur, handleChange, handleSubmit, touched, isSubmitting, values}) => (
                    <View style={{flex:1}}>
                        {/*ESPECIALIDADE*/}
                        <View style={{alignSelf:'center', marginBottom: 5,}}>
                        <DropDownPicker
                            
                            items={especialidade}
                            
                            placeholder = 'Especialidade'
                            containerStyle ={styles.container}
                            itemStyle={{ alignSelf: 'center', }}
                            dropDownStyle={{backgroundColor: 'white'}}
                            labelStyle={{color: '#006F9A', alignSelf:'center'}}
                            selectedLabelStyle={{color: '#006F9A'}}
                            
                            onChangeList={(especialidade, callback) => {
                                Promise.resolve(setEspecialidade(especialidade))
                                .then(() => callback());
                            }}
                            controller={instance => controller.current = instance}
                            defaultValue={valueE}
                            onChangeItem={item => setValueE(item.value)}
                            />
                        </View>

                        {/*MÉDICO*/}
                        <View style={{alignSelf:'center', zIndex: -2, marginBottom: 5,}}>
                            {(valueE ==  1) &&
                                <DropDownPicker
                                    items={medico1}
                                    
                                    placeholder = 'Médico'
                                    containerStyle ={styles.container}
                                    itemStyle={{ alignSelf: 'center', }}
                                    dropDownStyle={{backgroundColor: 'white'}}
                                    labelStyle={{color: '#006F9A', alignSelf:'center'}}
                                    selectedLabelStyle={{color: '#006F9A'}}
                                    
                                    onChangeList={(medico1, callback) => {
                                        Promise.resolve(setMedico1(medico1))
                                        .then(() => callback());
                                    }}
                                    controller={instance => controller.current = instance}
                                    defaultValue={valueM}
                                    onChangeItem={item => setValueM(item.value)}
                                />
                            }
                            {(valueE == 2) &&
                                <DropDownPicker
                                    items={medico2}
                                    
                                    placeholder = 'Médico'
                                    containerStyle ={styles.container}
                                    itemStyle={{ alignSelf: 'center', }}
                                    dropDownStyle={{backgroundColor: 'white'}}
                                    labelStyle={{color: '#006F9A', alignSelf:'center'}}
                                    selectedLabelStyle={{color: '#006F9A'}}
                                    
                                    onChangeList={(medico2, callback) => {
                                        Promise.resolve(setMedico2(medico2))
                                        .then(() => callback());
                                    }}
                                    controller={instance => controller.current = instance}
                                    defaultValue={valueM}
                                    onChangeItem={item => setValueM(item.value)}
                                />
                            }
                            {(valueE == null || valueE == 0) &&
                                <DropDownPicker
                                    items={medico}
                                    
                                    placeholder = 'Médico'
                                    containerStyle ={styles.container}
                                    itemStyle={{ alignSelf: 'center', }}
                                    dropDownStyle={{backgroundColor: 'white', }}
                                    labelStyle={{color: '#006F9A', alignSelf:'center'}}
                                    selectedLabelStyle={{color: '#006F9A'}}
                                    
                                    onChangeList={(medico, callback) => {
                                        Promise.resolve(setMedico(medico))
                                        .then(() => callback());
                                    }}
                                    controller={instance => controller.current = instance}
                                    defaultValue={valueM}
                                    onChangeItem={item => setValueM(item.value)}
                                />
                            }
                        </View>

                        {/*DATA*/}
                        <View style={styles.data}>
                            <TextInputMask style={styles.input} placeholder="Dia" onBlur={handleBlur('data')} onChangeText={handleChange("data")}
                                type={'custom'} options={{ mask: '99/99/9999'}} value={values.data} placeholderTextColor='#006F9A'
                            />
                        </View>

                        {/*Botão*/}
                        <View style={{alignSelf:'center', zIndex: -8}}>
                            <Button title="Confirmar" onPress={() => handleSubmit()} buttonStyle={{height:20, backgroundColor: '#006F9A'}}
                                containerStyle={{width:100, marginTop:10}} titleStyle={{color:'white', fontSize:15}}
                                raised={true} type="outline" />
                        </View>
                    </View>
                )}

                </Formik>
                    
                
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
    container:{
        padding: 2,
        height: 20,
        width: 150,
        
    },
    subtopicos:{
        fontSize: 15,
        color: '#006F9A',
    },
    input:{
        color: '#006F9A',
        width: 80,
    },
    erro: {
        color:"red",
        fontSize: 10,
        textAlign: "center",
    },
    data:{
        alignSelf:'center',
        zIndex: -4, 
        marginBottom: 5,
        width: 80,
        height: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    }
})