import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { InputRound } from './components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, PrivateValueStore } from '@react-navigation/core';
import { TextInputMask } from 'react-native-masked-text'

export interface CadastroInputProps {}

export default function CadastroPacienteScreen(props: CadastroInputProps) {

    const nav = useNavigation()
    
    // Errors
    const[ nome, setNome ] = React.useState('')
    const[ user, setUser ] = React.useState('')
    const[ senha, setSenha ] = React.useState('')
    const[ confirmeSenha, setConfirmeSenha ] = React.useState('')
    const[ nascimento, SetNascimento ] = React.useState('')
    const[ cpf, SetCpf ] = React.useState('')
    const[ celular, SetCelular ] = React.useState('')
    const[ email, SetEmail ] = React.useState('')


    var falhaCadastrar = false;

    //Função para Submeter cadastro
    const cadastrar = (dados) =>{
        nav.navigate('homeUser', {user: dados.user})
    }

    const voltar = () =>{
        nav.navigate('loginStart')
    } 

     return (                
            <View style={styles.container}>
                <View style={{flex:1, marginTop: -5}}>

                    <Text style={styles.logo}>E-Saude</Text>
                </View>
                
                <View style={{flex:7, alignItems: 'center',}}>

                    <Formik
                        initialValues={{ nome:'', cpf:'', email:'', nascimento:'', celular:'', user:'', senha:'', confirmeSenha:''}}
                        validationSchema={Yup.object().shape({
                            nome: Yup.string().required('Informe o seu Nome'),
                            cpf: Yup.string().required('Informe um CPF válido').min(14,'CPF são pelo menos 11 dígitos'),
                            email: Yup.string().required('Informe um Email válido').email('Informe um Email válido'),
                            nascimento: Yup.date().required('Informe uma data válida'),
                            celular: Yup.string().min(11,'Informe o DDD e os 9 dígitos'),
                            user: Yup.string().required('Informe o usuario'),
                            senha: Yup.string().required('Informe a senha').min(6, 'A senha precisa ter 6 caracteres'),
                            confirmeSenha: Yup.string().required('Confirme a senha').oneOf([Yup.ref('senha'), null], "A senha não coincide"),
                        })}
                        onSubmit={cadastrar} >
                        {({errors, handleChange, handleSubmit, isSubmitting, touched, handleBlur, values }) => (
                            <View>
                                <View style={styles.box}>

                                    <Text style={{fontSize:15, fontWeight: 'bold', marginBottom: 10}}> Cadastro Paciente </Text>
                                    {/* NOME */}
                                    <InputRound placeholder="Nome*" 
                                                    onBlur={handleBlur('nome')} onChangeText={handleChange("nome")}/>
                                    {touched.nome && <Text style={styles.erro}>{errors.nome}</Text>}
                                    {/* CPF */}
                                    <InputRound placeholder="Cpf*" 
                                                    mask={'cpf'} value ={values.cpf}
                                                    onBlur={handleBlur('cpf')} onChangeText={handleChange("cpf")}/>
                                    {touched.cpf && <Text style={styles.erro}>{errors.cpf}</Text>}
                                    {/* EMAIL */}
                                    <InputRound placeholder="Email*" 
                                                    onBlur={handleBlur('email')} onChangeText={handleChange("email")}/>
                                    {/* NASCIMENTO */}
                                    <InputRound placeholder="Data de Nascimento*"
                                                    mask={'datetime'} value={values.nascimento} options={{format: 'DD/MM/YYYY'}} maxLenght={10}
                                                    onBlur={handleBlur('nascimento')} onChangeText={handleChange("nascimento")}/>
                                    {touched.nascimento && <Text style={styles.erro}>{errors.nascimento}</Text>}
                                    {/* CELULAR */}
                                    <InputRound placeholder="Celular" 
                                                    mask={'cel-phone'} value={values.celular} options={{maskType: 'BRL', withDDD: true, dddMask: '(99) '}}
                                                    onBlur={handleBlur('celular')} onChangeText={handleChange("celular")}/>
                                    {touched.celular && <Text style={styles.erro}>{errors.celular}</Text>}
                                    {/* USUÁRIO */}
                                    <InputRound placeholder="Usuário*" 
                                                    onBlur={handleBlur('user')} onChangeText={handleChange("user")}/>
                                    {touched.user && <Text style={styles.erro}>{errors.user}</Text>}
                                    {/* SENHA */}
                                    <InputRound placeholder="Senha*"  senha 
                                                    onBlur={handleBlur('senha')} onChangeText={handleChange("senha")}/>
                                    {touched.senha && <Text style={styles.erro}>{errors.senha}</Text>}
                                    {/* CONFIRMAR SENHA */}
                                    <InputRound placeholder="Confirmar Senha*"  senha 
                                                    onBlur={handleBlur('confirmeSenha')} onChangeText={handleChange("confirmeSenha")}/>
                                    {touched.confirmeSenha && <Text style={styles.erro}>{errors.confirmeSenha}</Text>}
                                    
                                    {falhaCadastrar && <Text style={styles.erroLogin}>Preencha todos os campos corretamente</Text>}
                                
                                </View>

                                {isSubmitting && <ActivityIndicator size="large"/> }
                                <View style={{alignItems: 'center', flexDirection:'row'}}>
                                {!isSubmitting &&   
                                                <Button title="Cadastrar" buttonStyle={{height:20, backgroundColor: 'green'}} titleStyle={{color:'white', fontSize:15}}
                                                        containerStyle={{width:100, marginTop:10, marginRight: 20}} 
                                                        raised={true} type="outline"
                                                        onPress={() => handleSubmit()} />
                                                }
                                                <Button title="Voltar" buttonStyle={{height:20, backgroundColor: 'red'}}
                                                containerStyle={{width:100, marginTop:10}} titleStyle={{color:'white', fontSize:15}}
                                                raised={true} type="outline" 
                                                onPress={() => voltar()} />
                                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
                

            </View>

            )       
}
    
const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor:'#006F9A',
    },
    logo: {
        flex:1,
        color: 'white',
        fontSize: 35,
        textAlign: 'center',        
    },
    erro: {
        color:"red",
        fontSize: 10,
        textAlign: "right",
        marginTop: -10,
    },
    erroLogin: {
        textAlign: 'center',
        fontSize: 15,
        color: 'red'
    },
    box: {
        alignItems: 'center', 
        backgroundColor:'white', 
        textAlign: 'center', 
        borderRadius:10,
        width:250,
    },
});
