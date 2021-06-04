import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';

export interface LoginProps {}

export default function LoginScreen(props: LoginProps) {

    const nav = useNavigation()
    
    // Errors
    const[ user, setUser ] = React.useState('')
    const[ senha, setSenha ] = React.useState('')

    var falhaLogar = false;
    
    //Função para Logar
    const logar = async ( dados : any) =>{
        firebase.auth().signInWithEmailAndPassword(dados.user, dados.senha)
            .then (usuario => nav.navigate('app', usuario))
            .catch (erro => {
                falhaLogar = true;
            })
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
                        initialValues={{user:'teste@teste.com.br', senha:'123456'}}
                        validationSchema={Yup.object().shape({
                            user: Yup.string().required('Informe o usuario'),
                            senha: Yup.string().required('Informe a senha').min(6, 'A senha precisa ter 6 caracteres')
                        })}
                        onSubmit={logar} >
                        {({errors, handleChange, handleSubmit, isSubmitting, touched, handleBlur, values }) => (
                            <View>
                                <View style={styles.box}>

                                    <Text style={{fontSize:20, fontWeight: 'bold'}}> Entre Agora </Text>
                                    {/* USUÁRIO */}
                                    <TextInput placeholder="Digite o seu Usuário"  value={values.user} autoFocus
                                        onBlur={handleBlur('user')} onChangeText={handleChange("user")}
                                        style={styles.input}/>
                                    {touched.user && <Text style={styles.erro}>{errors.user}</Text>}
                                    {/* SENHA */}
                                    <TextInput placeholder="Digite sua senha" value={values.senha} secureTextEntry
                                        onBlur={handleBlur('senha')} onChangeText={handleChange("senha")}
                                        style={styles.input}/>
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
        height:125,
    },
    input:{
        width:200,
        height:20,
        marginVertical: 10,
        alignSelf: 'center'
    },
});
