import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Input } from 'react-native-elements';

export interface InputRoundProps {
    texto?:string;
    iconeL: string;
    iconeR?: string;
    placeholder: string;
    senha?: boolean;
    onChangeText(texto:string): void;
    onBlur?: any;
}

export function InputRound (props: InputRoundProps) {
    return (
      <View >
         {props.texto && <Text style={styles.texto}>{props.texto}</Text>}
         <Input 
            onBlur={props.onBlur}
            placeholder={props.placeholder}  
            leftIcon={{name:props.iconeL, color:'black', size:15}}
            rightIcon={{name:props.iconeR, color:'black'}}
            placeholderTextColor="black"
            inputContainerStyle={styles.containerInput}
            onChangeText={(texto) => props.onChangeText(texto)}
            secureTextEntry={props.senha}
            inputStyle={{color:'black', fontSize:15}} />
            
      </View>
    );
}

const styles = StyleSheet.create({
    texto: { fontSize: 10, color: 'black' },
    containerInput: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 30,
        padding: 0,
        marginBottom: 10,
        height:25,
        width:200,
        fontSize: 15,
    }
})
