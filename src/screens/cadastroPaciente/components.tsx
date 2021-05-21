import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Input } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';

export interface CadastroInputProps {
    texto?:string;
    iconeL?: string;
    iconeR?: string;
    placeholder: string;
    senha?: boolean;
    onChangeText(texto:string): void;
    onBlur?: any;
    value?:string;
    mask?:any;
    maxLenght?:number;
    options?:any;
}

export function InputRound (props: CadastroInputProps) {
    return (
      <View >
         {props.texto && <Text style={styles.texto}>{props.texto}</Text>}
         { !props.mask &&
        <Input 
            onBlur={props.onBlur}
            placeholder={props.placeholder}  
            leftIcon={{name:props.iconeL, color:'black', size:15}}
            rightIcon={{name:props.iconeR, color:'black'}}
            placeholderTextColor="black"
            inputContainerStyle={styles.containerInput}
            onChangeText={(texto) => props.onChangeText(texto)}
            secureTextEntry={props.senha}
            inputStyle={{color:'black', fontSize:15}} 
         />
        }
        {props.mask &&
            <TextInputMask
                type={props.mask}
                options={props.options}
                value={props.value}
                onBlur={props.onBlur}
                placeholder={props.placeholder}  
                placeholderTextColor="black"
                onChangeText={(texto) => props.onChangeText(texto)}
                style={styles.containerTextInput} 
                maxLength={props.maxLenght}
            />
            
        }
      </View>
    );
}

const styles = StyleSheet.create({
    texto: { fontSize: 10, color: 'black' },
    containerInput: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 15,
        padding: 0,
        marginBottom: 10,
        height:25,
        width:200,
        fontSize: 15,
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2,},
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    },
    containerTextInput:{
        color:'black',
        fontSize:15, 
        backgroundColor:'white', 
        marginBottom:20,
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2,},
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        borderRadius:30,
        borderColor:'black',
        padding: 2,
        height:25,
        width:200,
        borderBottomWidth:0.5,
        borderBottomColor:'gray',
    }
})
