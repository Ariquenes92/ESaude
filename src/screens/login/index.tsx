import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { InputRound } from './components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/core';
import { boolean } from 'yup/lib/locale';

export interface LoginProps {}

export default function LoginScreen(props: LoginProps) {

    const nav = useNavigation()
    
    // Errors
    const[ user, setUser ] = React.useState('')
    const[ senha, setSenha ] = React.useState('')

    var falhaLogar = false;
    
    //Função para Logar
    const logar = async ({user, senha} : any) =>{
        if (user == 'user' && senha == '123456'){
            console.log ('Login realizado com sucesso');
            nav.navigate('homeUser', {user: user})
        } if (user == 'doctor' && senha == '123456'){
            console.log ('Login realizado com sucesso');
            nav.navigate('homeDoctor', {user: user})
        }
        else {
            falhaLogar = true;
        }
    }

    const cadastrar = () =>{
        nav.navigate('cadastroPaciente')
    }

     return (                
            <View style={styles.container}>
                <View style={{flex:1, marginTop: 40}}>

                    <Text style={styles.logo}>E-Saude</Text>
                </View>
                
                <View style={{flex:3, alignItems: 'center',}}>

                    <Formik
                        initialValues={{user:'', senha:''}}
                        validationSchema={Yup.object().shape({
                            user: Yup.string().required('Informe o usuario'),
                            senha: Yup.string().required('Informe a senha').min(6, 'A senha precisa ter 6 caracteres')
                        })}
                        onSubmit={logar} >
                        {({errors, handleChange, handleSubmit, isSubmitting, touched, handleBlur }) => (
                            <View>
                                <View style={styles.box}>

                                    <Text style={{fontSize:20, fontWeight: 'bold'}}> Entre Agora </Text>
                                    {/* USUÁRIO */}
                                    <InputRound placeholder="Digite o seu Usuário" iconeL="person"
                                                    onBlur={handleBlur('user')} onChangeText={handleChange("user")}/>
                                    {touched.user && <Text style={styles.erro}>{errors.user}</Text>}
                                    {/* SENHA */}
                                    <InputRound placeholder="Digite sua senha" iconeL="lock" senha 
                                                    onBlur={handleBlur('senha')} onChangeText={handleChange("senha")}/>
                                    {touched.senha && <Text style={styles.erro}>{errors.senha}</Text>}
                                    
                                    {falhaLogar && <Text style={styles.erroLogin}>Usuário ou Senha incorretos</Text>}
                                
                                </View>

                                {isSubmitting && <ActivityIndicator size="large"/> }
                                                      
                                {!isSubmitting && <View style={{alignItems: 'center'}}>  
                                                    <Button title="Entrar" buttonStyle={{height:20}} titleStyle={{color:'black', fontSize:15}}
                                                        containerStyle={{width:100, marginTop:10}} 
                                                        raised={true} type="outline"
                                                        onPress={() => handleSubmit()} />
                                                </View>}
                            </View>
                        )}
                    </Formik>
                    <View style={{alignItems: 'center'}}>

                        <Button title="Cadastre-se" buttonStyle={{height:20, backgroundColor: 'black'}}
                            containerStyle={{width:100, marginTop:10}} titleStyle={{color:'white', fontSize:15}}
                            raised={true} type="outline" 
                            onPress={() => cadastrar()} />
                    </View>
                </View>
                

            </View>

            )       
}
    
const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex:1,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor:'#006F9A',
    },
    btnRound: {
        borderRadius:30,
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
        height:125,
    },
});
