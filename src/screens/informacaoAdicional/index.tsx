import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button} from 'react-native-elements';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { Toolbar} from '../../components/toolbar';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInputMask } from 'react-native-masked-text';
import firebase from 'firebase';
import 'firebase/firestore';

/** Interface que define os atributos basicos de usuário */
export interface UsuarioInfo {
    altura?: string;
    peso?: string;
}

export default function PageInformationAdd (props:any){

    const nav = useNavigation()
    const db = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);

    const confirm = (dados) =>{
        const infoAdd = {
            genero: valueG,
            bebe: valueB,
            fuma: valueF,
            exercicio: valueE,
            altura: dados.altura,
            peso: dados.peso,
        }

        db.update(infoAdd)
            .then( () => {
                nav.navigate('homeUser')
            })
            .catch( () => {
                setErro('Ocorreu um erro Inesperado')
            })
    }


    const pegarDados = async () => {
        const doc = await db.get();

        const dados = doc.data()

        const valor = dados.genero
        setValueG(valor)

        const valor2 = dados.bebe
        setValueB(valor2)

        const valor3 = dados.fuma
        setValueF(valor3)

        const valor4 = dados.exercicio
        setValueE(valor4)

        const info = {
            altura: dados.altura,
            peso: dados.peso
        }
        setInf(info)
    }

    nav.addListener('focus', () => {
        pegarDados()
    })

    const [ genero , setGenero ] = useState([
        {label: 'Gênero', value: '0'},
        {label: 'Masculino', value: '1'},
        {label: 'Feminino', value: '2'},
    ])
    const [ bebe, setBebe ] = useState([
        {label: 'Bebe', value: '0'},
        {label: 'Sim', value: '1'},
        {label: 'Não', value: '2'},
    ])
    const [ fuma, setFuma ] = useState([
        {label: 'Fuma', value: '0'},
        {label: 'Sim', value: '1'},
        {label: 'Não', value: '2'},
    ])
    const [ exercicio, setExercicio ] = useState([
        {label: 'Exercício', value: '0'},
        {label: 'Sim', value: '1'},
        {label: 'Não', value: '2'},
    ])

    const [ valueG, setValueG ] = useState();
    const [ valueB, setValueB ] = useState();
    const [ valueF, setValueF ] = useState();
    const [ valueE, setValueE ] = useState();
    const [ inf, setInf ] = useState({
        altura: '',
        peso: '',
    })

    const [erro, setErro] = React.useState<string|null>(null);

    const controller = useRef(null);
    //Botão pra mostrar senha
    return(
        <View style={{flex:1}}>
            <Toolbar titulo="Informações Adicionais" back/>
            <View style={{alignItems:'center'}}>
                <Formik enableReinitialize
                    //Dados iniciais 
                    initialValues={{ altura:inf.altura, peso:inf.peso}}
                    // Validação de formulário
                    
                    //Envio
                    onSubmit={confirm}
                >
                 {({errors, handleBlur, handleChange, handleSubmit, touched, values}) => (
                    <View style={{flex:1}}>
                        <Text style={styles.titulo}> Informações Pessoais </Text>

                        {/* GÊNERO */}
                        <View style={{ alignItems: 'center',}}>
                            <DropDownPicker
                                items={genero}
                                placeholder = {(valueG == '1') ? 'Masculino' : (valueG == '2') ? 'Feminino' : 'Gênero'}
                                containerStyle ={styles.container}
                                itemStyle={{ justifyContent: 'center', }}
                                dropDownStyle={{backgroundColor: 'white'}}
                                labelStyle={{color: '#006F9A'}}
                                selectedLabelStyle={{color: '#006F9A'}}

                                onChangeList={(genero, callback) => {
                                    Promise.resolve(setGenero(genero))
                                    .then(() => callback());
                                }}
                                controller={instance => controller.current = instance}
                                onChangeItem={item => {setValueG(item.value)}}
                            />
                        </View>

                        {/* ALTURA */}
                        <View style={styles.textbar}>
                            <TextInputMask style={styles.input} placeholder="Altura" onBlur={handleBlur('altura')} onChangeText={handleChange("altura")}
                                type={'custom'} value={values.altura} placeholderTextColor='#006F9A' options={{ mask: '999',}} />
                            <Text style={styles.complemento}>cm</Text>
                        </View>
                        {errors.altura && touched.altura && <Text style={styles.erro}>{errors.altura}</Text>} 

                        {/* PESO */}
                        <View style={styles.textbar}>
                            <TextInputMask style={styles.input} placeholder="Peso" onBlur={handleBlur('peso')} onChangeText={handleChange("peso")}
                                type={'custom'} options={{ mask: '99.99'}} value={values.peso} placeholderTextColor='#006F9A'/>
                            <Text style={styles.complemento}>kg</Text>
                        </View>
                        {errors.peso && touched.peso && <Text style={styles.erro}>{errors.peso}</Text>}

                        {/* BEBE */}
                        <View style={{ alignItems: 'center',  zIndex: -4,}}>
                            <DropDownPicker
                                items={bebe}
                                placeholder = {(valueB == '1') ? 'Sim' : (valueB == '2') ? 'Não' : 'Bebe'}
                                containerStyle ={styles.container}
                                itemStyle={{ justifyContent: 'center', }}
                                dropDownStyle={{backgroundColor: 'white'}}
                                labelStyle={{color: '#006F9A'}}
                                selectedLabelStyle={{color: '#006F9A'}}

                                onChangeList={(bebe, callback) => {
                                    Promise.resolve(setBebe(bebe))
                                    .then(() => callback());
                                }}
                                controller={instance => controller.current = instance}
                                onChangeItem={item => {setValueB(item.value)}}
                            />
                        </View>

                        {/* FUMA */}
                        <View style={{ alignItems: 'center',  zIndex: -6,}}>
                            <DropDownPicker
                                items={fuma}
                                placeholder = {(valueF == '1') ? 'Sim' : (valueF == '2') ? 'Não' : 'Fuma'}
                                containerStyle ={styles.container}
                                itemStyle={{ justifyContent: 'center', }}
                                dropDownStyle={{backgroundColor: 'white'}}
                                labelStyle={{color: '#006F9A'}}
                                selectedLabelStyle={{color: '#006F9A'}}

                                onChangeList={(fuma, callback) => {
                                    Promise.resolve(setFuma(fuma))
                                    .then(() => callback());
                                }}
                                controller={instance => controller.current = instance}
                                onChangeItem={item => {setValueF(item.value)}}
                            />
                        </View>

                        {/* ATIVIDADE FISICA */}
                        <View style={{ alignItems: 'center',  zIndex: -8,}}>
                            <DropDownPicker
                                items={exercicio}
                                placeholder = {(valueE == '1') ? 'Sim' : (valueE == '2') ? 'Não' : 'Exercício'}
                                containerStyle ={styles.container}
                                itemStyle={{ justifyContent: 'center', }}
                                dropDownStyle={{backgroundColor: 'white'}}
                                labelStyle={{color: '#006F9A'}}
                                selectedLabelStyle={{color: '#006F9A'}}

                                onChangeList={(exercicio, callback) => {
                                    Promise.resolve(setExercicio(exercicio))
                                    .then(() => callback());
                                }}
                                controller={instance => controller.current = instance}
                                onChangeItem={item => {setValueE(item.value)}}
                            />
                        </View>
                        
                        {/* Botão */}
                        <View style={styles.botao}>
                            { erro && <Text style={styles.erro}>{erro}</Text>}
                            <Button title="Confirmar" onPress={() => handleSubmit()} buttonStyle={{height:20, backgroundColor: '#006F9A'}}
                                containerStyle={{width:100, marginTop:10}} titleStyle={{color:'white', fontSize:15}}
                                raised={true} type="outline" />
                            <Button title="Cancelar" buttonStyle={{height:20, backgroundColor: 'red',}}
                                containerStyle={{width:100, marginTop:10, marginLeft:10}} titleStyle={{color:'white', fontSize:15}}
                                raised={true} type="outline" 
                                onPress ={() =>  nav.goBack()} 
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
    },
    erro:{
        alignSelf:'center',
        fontSize: 8,
        color: 'red',
    },
    input:{
        color: '#006F9A',
        width: 40,
    },
    complemento:{
        fontSize: 8,
        alignSelf:'center',
    },
    textbar:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        zIndex: -10,
    }
});