import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Button} from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/core';

export default function HomeUserScreen (props: any) {
    
    const nav = useNavigation()
    const route = useRoute()
    
    const config = () =>{

    }

    const menu = () =>{

    }
    const photo = () =>{

    }
    const consultas = () =>{

    }
    const search = () =>{
        
    }

    return (
      <View style={{flex:1}}>

        {/* CABEÇALHO */}
        <View style={styles.header}>
            <Text style={{color:'white', fontSize:10, marginTop:5, marginRight:70,}}> {route.params?.user} Usuário </Text>
            <View style={{flexDirection: 'row'}}>
                <Button 
                    icon={{
                        name:"list",
                        size:10,
                        color:'white'
                    }}
                    type="clear"
                    title=""
                    titleStyle={{color:'black'}}
                    onPress={() => menu()}
                />
                <Button 
                    icon={{
                        name:"settings",
                        size:10,
                        color:'white'
                    }}
                    type="clear"
                    title=""
                    titleStyle={{color:'black'}}
                    onPress={() => config()}
                />
            </View>
        </View>
        
        {/* PERFIL */}
        <View style={styles.perfil}>
            <View style={{flexDirection: 'row', marginRight: 20}}>
                <TouchableOpacity
                    onPress={() => photo()}
                    >
                    <Image
                        source={require('./user.png')}
                        style={{width:30, height:30}}
                        />
                </TouchableOpacity>
                <Text style={{color:'black', fontSize:15, marginTop:5}}> {route.params?.name} Nome </Text>
            </View>

            <Button 
                type="outline"
                title="Histórico de Consultas"
                titleStyle={{color:'black', fontSize: 10}}
                onPress={() => consultas()}
                style={{ marginRight: 20}}
            />
            <Button 
                type="outline"
                title="Buscar nova Consulta"
                titleStyle={{color:'black', fontSize: 10}}
                onPress={() => search()}
            />
        </View>
        
        {/* CONSULTAS */}
        <View style={styles.mid}>
            <View style={styles.boxMid}>
                <Text style={{fontSize:20, fontWeight: 'bold', marginLeft:80,}}>Suas Consultas</Text>
                {/* CABEÇALHO */}
                <View style={styles.headBox}>
                    <Text style={styles.lineOne}> Médico </Text>
                    <Text style={styles.lineTwo}> Especialidade</Text>
                    <Text style={styles.lineThree}> Data </Text>
                </View>
                <View style={styles.insideBox}>
                    <Text style={styles.lineOne}> Dr.João </Text>
                    <Text style={styles.lineTwo}> Cardiologista </Text>
                    <Text style={styles.lineThree}> 20/05/2021 </Text>
                </View>
                <View style={styles.insideBox2}>
                    <Text style={styles.lineOne}> Dra.Laura </Text>
                    <Text style={styles.lineTwo}> Nutricionista </Text>
                    <Text style={styles.lineThree}> 12/06/2021 </Text>
                </View>
                <View style={styles.insideBox}>
                    <Text style={styles.lineOne}> Dr.João </Text>
                    <Text style={styles.lineTwo}> Cardiologista </Text>
                    <Text style={styles.lineThree}> 25/07/2021 </Text>
                </View>
                <View style={styles.insideBox2}>
                    <Text style={styles.lineOne}> Dra.Laura </Text>
                    <Text style={styles.lineTwo}> Nutricionista </Text>
                    <Text style={styles.lineThree}> 12/09/2021 </Text>
                </View>
            </View>
        </View>
      </View>
    );

}

const styles = StyleSheet.create({
    header: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#006F9A',
    },
    perfil: {
        flex:1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white',
    },
    mid: {
        flex:8,
        padding: 10,
        alignItems: 'center',
        backgroundColor:'#006F9A',
    },
    boxMid: {
        flex:1,
        padding: 10,
        alignItems: 'stretch',
        backgroundColor:'white',
        borderRadius: 20,
        width:300,
        height:300,
    },
    headBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor:'white',
    },
    insideBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor:'#ADD8E6',
    },
    insideBox2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor:'#B0C4DE',
    },
    lineOne:{
        fontSize: 15,
    },
    lineTwo:{
        fontSize: 15,
    },
    lineThree:{
        fontSize: 15,
    },
});
