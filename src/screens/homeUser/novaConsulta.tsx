import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
    especialidade?: string;
    medico?: string;
}

export default function NovaConsultaScreen (props:any){

    const nav = useNavigation()

    const confirm = (dados:any) =>{
        adicionarConsulta(dados)
    }

    const db = firebase.firestore().collection('users');
    

    const consulta : NovaConsulta = {};

    const adicionarConsulta = async (dados : any) => {
        const doc = await db.doc(firebase.auth().currentUser.uid).collection('consultas');

        let nomeMedico
        let nomeEspecialista
        medico.forEach(res => {
            if (res.value == valueM){
                nomeMedico = res.label
            }
        })

        especialidade.forEach(res => {
            if (res.value == valueE){
                nomeEspecialista = res.label
            }
        });
        const consulta = {
            medico: nomeMedico,
            especialidade: nomeEspecialista,
            data: dados.data
        }

        doc.doc().set(consulta)
        resetarCampos()
        nav.navigate('Suas Consultas')
    }

    const resetarCampos = () =>{
        setEspecialidade([{label: 'Especialidade', value: '0', selected: true}])
        setMedico([{label: 'Médico', value: '0', selected: true}])
    }

    const pegarEspecialidade = async () =>{
        const dbConsulta = await firebase.firestore().collection('especialidade').get();

        let especialidades = [{label: 'Especialidade', value: '0', selected: true}]

        dbConsulta.forEach( dados => {
            const resposta = dados.data();
            
            especialidades = [...especialidades.concat({label: resposta.especialidade, value: resposta.valor, selected: false})]
        }); 
        setEspecialidade(especialidades)
    }

    const pegarMedico = async ( value :any) =>{
        const dbEspecialista = await firebase.firestore().collection('especialidade')
        
        let medicos = [{label: 'Médico', value: '0', selected: true}]
        
        dbEspecialista.where('valor', '==', value).get()
            .then( resultados => {
                resultados.forEach(res => {

                    dbEspecialista.doc(res.data().id).collection('medicos').get()
                        .then( dados => {
                            dados.forEach( resp => {
                                medicos = [...medicos.concat({label: resp.data().medico, value: resp.data().valor, selected: false})]
                                setMedico(medicos)
                            })
                        })
                    });
                })
        if ( value == '0'){
            setMedico(medicos)
        }
    }
            

    const [ valueE, setValueE ] = useState('0');

    nav.addListener('focus', () => {
        pegarEspecialidade()
        pegarMedico('0')
    })
    
    const [ especialidade, setEspecialidade ] = useState()

    const [ valueM, setValueM ] = useState('0');

    const [ medico, setMedico ] = useState()

    const controller = useRef(null);


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
                        especialidade: Yup.string(),
                        medico: Yup.string(),
                        data: Yup.string().required('Informe uma data válida'),
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
                                onChangeItem={item => {setValueE(item.value); pegarMedico(item.value)}}
                            />
                        </View>

                        {/*MÉDICO*/}
                        <View style={{alignSelf:'center', zIndex: -2, marginBottom: 5,}}>
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
                        </View>

                        {/*DATA*/}
                        <View style={styles.data}>
                            <TextInputMask style={styles.input} placeholder="Dia" onBlur={handleBlur('data')} onChangeText={handleChange("data")}
                                type={'datetime'} options={{ format: 'DD/MM/YYYY'}} value={values.data} placeholderTextColor='#006F9A'
                            />
                            {touched.data && <Text style={styles.erro}>{errors.data}</Text>}
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