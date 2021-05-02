import React, { useState, Component, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import { Toolbar} from '../../components/toolbar';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import { TextInputMask } from 'react-native-masked-text';

export interface NovaConsulta {
    data?: string;
    hora?: string;
    especialidade?: string;
    medico?: string;
}

export default function NovaConsultaScreen (props:any){

    const nav = useNavigation()
    const route = useRoute()

    const confirm = (dados) =>{
        nav.navigate('homeUser', {user: dados})
    }

    const consulta : NovaConsulta = {};

    var cardiologista, nutricionista;

    const [ valueE, setValueE ] = useState(null);

    const [ especialidade, setEspecialidade ] = useState([
        {label: 'Especialidade', value: '0'},
        {label: 'Cardiologista', value: '1'},
        {label: 'Nutricionista', value: '2'},
    ])

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

    if (valueE ==  1){
        cardiologista = true;
        nutricionista = false;
    } else if (valueE == 2) {
        cardiologista = false;
        nutricionista = true;
    } else{
        cardiologista = false;
        nutricionista = false;
    }

    const controller = useRef(null);

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
                    <Formik
                    //Dados iniciais 
                    initialValues={consulta}
                    // Validação de formulário
                    
                    //Envio
                    onSubmit={confirm}
                >
                 {({errors, handleBlur, handleChange, handleSubmit, touched, isSubmitting, values}) => (
                    <View style={{flex:1}}>
                        {/*ESPECIALIDADE*/}
                        <View style={{alignSelf:'center'}}>
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
                            value={values.especialidade}
                            />
                        </View>

                        {/*MÉDICO*/}
                        <View style={{alignSelf:'center', zIndex: -2}}>
                            {cardiologista &&
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
                                    value={values.medico}
                                />
                            }
                            {nutricionista &&
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
                                    value={values.medico}
                                />
                            }
                            {!nutricionista && !cardiologista &&
                                <DropDownPicker
                                    items={medico}
                                    
                                    placeholder = 'Médico'
                                    containerStyle ={styles.container}
                                    itemStyle={{ alignSelf: 'center', }}
                                    dropDownStyle={{backgroundColor: 'white'}}
                                    labelStyle={{color: '#006F9A', alignSelf:'center'}}
                                    selectedLabelStyle={{color: '#006F9A'}}
                                    
                                    onChangeList={(medico, callback) => {
                                        Promise.resolve(setMedico(medico))
                                        .then(() => callback());
                                    }}
                                    controller={instance => controller.current = instance}
                                    defaultValue={valueM}
                                    onChangeItem={item => setValueM(item.value)}
                                    value={values.medico}
                                />
                            }
                        </View>

                        {/*DATA*/}
                        <View style={{alignSelf:'center', zIndex: -4}}>
                            <TextInputMask style={styles.input} placeholder="Data" onBlur={handleBlur('data')} onChangeText={handleChange("data")}
                                type={'custom'} options={{ mask: '99/99/9999'}} value={values.data} placeholderTextColor='#006F9A'/>
                        </View>

                        {/*HORA*/}
                        <View style={{alignSelf:'center', zIndex: -4}}>
                            <TextInputMask style={styles.input} placeholder="Horário" onBlur={handleBlur('hora')} onChangeText={handleChange("hora")}
                                type={'custom'} options={{ mask: '99:99'}} value={values.hora} placeholderTextColor='#006F9A'/>
                        </View>

                        {/*Botão*/}
                        <View style={{alignSelf:'center', zIndex: -4}}>
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
})