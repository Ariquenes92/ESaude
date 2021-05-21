import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { Button} from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, useRoute, DrawerActions} from '@react-navigation/native';
import { Toolbar} from '../../components/toolbar';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInputMask } from 'react-native-masked-text';

/** Interface que define os atributos basicos de usuário */
export interface UsuarioInfo {
    altura?: string;
    peso?: string;
}

export default function PageInformationAdd (props:any){

    const state ={
        genero: 'Gênero',
    }

    const confirm = (dados) =>{
        nav.navigate('homeUser', {user: dados})
    }   

    const [erro, setErro] = React.useState<string|null>(null);
    const nav = useNavigation()

    //Botão pra mostrar senha
    const usuario : UsuarioInfo = {};
    return(
        <View style={{flex:1}}>
            <Toolbar titulo="Informações Adicionais" back/>
            <View style={{alignItems:'center'}}>
                <Formik
                    //Dados iniciais 
                    initialValues={usuario}
                    // Validação de formulário
                    
                    //Envio
                    onSubmit={confirm}
                >
                 {({errors, handleBlur, handleChange, handleSubmit, touched, isSubmitting, values}) => (
                    <View style={{flex:1}}>
                        <Text style={styles.titulo}> Informações Pessoais </Text>

                        {/* GÊNERO */}
                        <View style={{ alignItems: 'center',}}>
                            <DropDownPicker
                                items={[
                                    {label: 'Gênero', value: '0'},
                                    {label: 'Masculino', value: '1'},
                                    {label: 'Feminino', value: '2'},
                                ]}
                                placeholder = 'Gênero'
                                containerStyle ={styles.container}
                                itemStyle={{ justifyContent: 'center', }}
                                dropDownStyle={{backgroundColor: 'white'}}
                                labelStyle={{color: '#006F9A'}}
                                selectedLabelStyle={{color: '#006F9A'}}
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
                                items={[
                                    {label: 'Bebe', value: '0'},
                                    {label: 'Sim', value: '1'},
                                    {label: 'Não', value: '2'},
                                ]}
                                placeholder = 'Bebe'
                                containerStyle ={styles.container}
                                itemStyle={{ justifyContent: 'center', }}
                                dropDownStyle={{backgroundColor: 'white'}}
                                labelStyle={{color: '#006F9A'}}
                                selectedLabelStyle={{color: '#006F9A'}}
                            />
                        </View>

                        {/* FUMA */}
                        <View style={{ alignItems: 'center',  zIndex: -6,}}>
                            <DropDownPicker
                                items={[
                                    {label: 'Fuma', value: '0'},
                                    {label: 'Sim', value: '1'},
                                    {label: 'Não', value: '2'},
                                ]}
                                placeholder = 'Fuma'
                                containerStyle ={styles.container}
                                itemStyle={{ justifyContent: 'center', }}
                                dropDownStyle={{backgroundColor: 'white'}}
                                labelStyle={{color: '#006F9A'}}
                                selectedLabelStyle={{color: '#006F9A'}}
                            />
                        </View>

                        {/* ATIVIDADE FISICA */}
                        <View style={{ alignItems: 'center',  zIndex: -8,}}>
                            <DropDownPicker
                                items={[
                                    {label: 'Exercício', value: '0'},
                                    {label: 'Sim', value: '1'},
                                    {label: 'Não', value: '2'},
                                ]}
                                placeholder = 'Exercício'
                                containerStyle ={styles.container}
                                itemStyle={{ justifyContent: 'center', }}
                                dropDownStyle={{backgroundColor: 'white'}}
                                labelStyle={{color: '#006F9A'}}
                                selectedLabelStyle={{color: '#006F9A'}}
                            />
                        </View>
                        
                        {/* Botão */}
                        <View style={styles.botao}>
                            { erro && <Text style={styles.erro}>{erro}</Text>}
                            { isSubmitting && <ActivityIndicator size={30} color='#006F9A'/>}
                            { !isSubmitting && <Button title="Confirmar" onPress={() => handleSubmit()} buttonStyle={{height:20, backgroundColor: '#006F9A'}}
                                containerStyle={{width:100, marginTop:10}} titleStyle={{color:'white', fontSize:15}}
                                raised={true} type="outline" />}
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