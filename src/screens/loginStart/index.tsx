import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';

export interface LoginProps {}

export default function LoginStartScreen(props: LoginProps) {

    const nav = useNavigation()
    
    // Errors
    //Função para Logar

    var falhaLogar = false;
    var dentro = false;

    

    const cadastrar = () =>{
        nav.navigate('cadastroPaciente')
    }

    const entrar = () =>{
        nav.navigate('login')
    }

     return (                
            <View style={styles.container}>
                <View style={{flex:1, marginTop: 40}}>

                    <Text style={styles.logo}>E-Saude</Text>
                </View>
                
                <View style={{flex:3, alignItems: 'center',}}>
                        
                        <View style={styles.box}>  
                            
                            <Button 
                                icon={{
                                    name:"person",
                                    size:30,
                                    color:'black'
                                }}
                                type="outline"
                                title="Paciente"
                                titleStyle={{color:'black'}}
                                onPress={() => entrar()}
                            />

                            <Button 
                                icon={{
                                    name:"favorite",
                                    size:30,
                                    color:'black'
                                }}
                                type="outline"
                                title="Médico"
                                titleStyle={{color:'black'}}
                                onPress={() => entrar()}
                            />      

                            
                        </View>
                    
                        <Button title="Cadastre-se" buttonStyle={{height:20, backgroundColor: 'black'}}
                            containerStyle={{width:100, marginTop:10}} titleStyle={{color:'white', fontSize:15}}
                            raised={true} type="outline" 
                            onPress={() => cadastrar()} />
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
    box: {
        alignItems: 'center', 
        backgroundColor:'white', 
        textAlign: 'center',
        borderRadius:10,
        width:250,
        height:125,
        flexDirection:'row',
        justifyContent: 'center',
    },
});
