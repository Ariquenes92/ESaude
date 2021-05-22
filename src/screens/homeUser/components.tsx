import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import { Button } from 'react-native-elements';
import Consulta from '../../models/consulta';

export interface ItemConsultaProps {
    consulta:Consulta

    onEditar(consulta: Consulta): void;
    onExcluir(id?:string): void;
}

export interface HistoricoConsultaProps {
    consulta:Consulta

    onDetalhar(consulta: Consulta): void;
    onRepetir(id?:string): void;
}

export function ItemConsulta (props: ItemConsultaProps) {
    
    const { consulta } = props;

    return (
      <SwipeRow stopRightSwipe={-60} 
                rightOpenValue={-60}
                disableRightSwipe
                onRowPress={() => console.log('Teste')}
                >
        {/*Oculta */}
        <View style={styles.btt}>
            <Button 
                containerStyle={styles.btn}
                buttonStyle={[styles.btn, {backgroundColor:'red'} ]}
                onPress={() => props.onExcluir(consulta.id)}
                title="Excluir"
                />
        </View>

        {/*Visível */}
        <View style={styles.container}>
            <Text>{consulta.medico}</Text>
            <Text>{consulta.especialidade}</Text>
            <Text>{consulta.data}</Text>
        </View>

      </SwipeRow>
    );
}

export function HistoricoConsulta (props: HistoricoConsultaProps) {
    
    const { consulta } = props;

    return (
      <SwipeRow stopRightSwipe={-120} 
                rightOpenValue={-120}
                disableRightSwipe
                onRowPress={() => console.log('Teste')}
                >
        {/*Oculta */}
        <View style={styles.btt}>
            <Button 
                containerStyle={styles.btn}
                buttonStyle={[styles.btn, {backgroundColor:'green'} ]} 
                onPress={() => props.onDetalhar(consulta)}
                title="Detalhar"
                />
            <Button 
                containerStyle={styles.btn}
                buttonStyle={[styles.btn, {backgroundColor:'yellow'} ]}
                titleStyle={{color:'black'}}
                onPress={() => props.onRepetir(consulta.id)}
                title="Repetir"
                />
        </View>

        {/*Visível */}
        <View style={styles.container}>
            <Text>{consulta.doctor}</Text>
            <Text>{consulta.speceality}</Text>
            <Text>{consulta.date}</Text>
        </View>

      </SwipeRow>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 0,
        borderColor: '#006F9A',
        backgroundColor: '#ADD8E6',
    },
    btt:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    btn:{
        width:60,
        borderRadius: 0,
    },
})