import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button} from 'react-native-elements';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { Toolbar} from '../../components/toolbar';
import DropDownPicker from 'react-native-dropdown-picker';

/** Interface que define os atributos basicos de usuário */
export interface Config {
    altura?: string;
    peso?: string;
}

export default function PageConfigure (props:any){

    const confirm = (dados) =>{
        nav.navigate('homeUser', {user: dados.user})
    }   

    const [erro, setErro] = React.useState<string|null>(null);
    const nav = useNavigation()

    //Botão pra mostrar senha
    const config : Config = {};
    return(
        <View style={{flex:1}}>
            <Toolbar titulo="Configurações" back/>
            <View style={{alignItems:'center'}}>
                <Formik
                    //Dados iniciais 
                    initialValues={config}
                    // Validação de formulário
                    
                    //Envio
                    onSubmit={confirm}
                >
                 {({errors, handleBlur, handleChange, handleSubmit, touched, isSubmitting, values}) => (
                    <View style={{flex:1}}>
                        <Text style={styles.titulo}> Notificações </Text>

                        {/* Dia da Consulta */}
                        <View style={{ alignItems: 'center', flexDirection: 'row',}}>
                            <Text style={styles.subtopicos}> Notificar no dia da Consulta </Text>
                            <DropDownPicker
                                items={[
                                    {label: 'Sim', value: '1'},
                                    {label: 'Não', value: '2'},
                                ]}
                                placeholder = 'Sim'
                                containerStyle ={styles.container}
                                itemStyle={{ justifyContent: 'center', }}
                                dropDownStyle={{backgroundColor: 'white'}}
                                labelStyle={{color: '#006F9A'}}
                                selectedLabelStyle={{color: '#006F9A'}}
                            />
                        </View>

                        {/* dia anterior */}
                        <View style={{ alignItems: 'center',  zIndex: -2, flexDirection: 'row',}}>
                            <Text style={styles.subtopicos}> Notificar no dia anterior da Consulta </Text>
                            <DropDownPicker
                                items={[
                                    {label: 'Sim', value: '1'},
                                    {label: 'Não', value: '2'},
                                ]}
                                placeholder = 'Sim'
                                containerStyle ={styles.container}
                                itemStyle={{ justifyContent: 'center', }}
                                dropDownStyle={{backgroundColor: 'white'}}
                                labelStyle={{color: '#006F9A'}}
                                selectedLabelStyle={{color: '#006F9A'}}
                            />
                        </View>

                        {/* Tipo de Alerta */}
                        <View style={{ alignItems: 'center',  zIndex: -4, flexDirection: 'row',}}>
                            <Text style={styles.subtopicos}> Tipos de Notificação </Text>
                            <DropDownPicker
                                items={[
                                    {label: 'Ambas', value: '1'},
                                    {label: 'Tocar', value: '2'},
                                    {label: 'Vibrar', value: '3'},
                                ]}
                                placeholder = 'Ambas'
                                containerStyle ={styles.container}
                                itemStyle={{ justifyContent: 'center', }}
                                dropDownStyle={{backgroundColor: 'white'}}
                                labelStyle={{color: '#006F9A'}}
                                selectedLabelStyle={{color: '#006F9A'}}
                            />
                        </View>

                        {/* Notificação por EMAIL */}
                        <View style={{ alignItems: 'center',  zIndex: -6, flexDirection: 'row',}}>
                            <Text style={styles.subtopicos}> Receber notificação por E-mail? </Text>
                            <DropDownPicker
                                items={[
                                    {label: 'Sim', value: '1'},
                                    {label: 'Não', value: '2'},
                                ]}
                                placeholder = 'Não'
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
        alignSelf: 'center',
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