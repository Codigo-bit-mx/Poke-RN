import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useState, useEffect } from 'react';

interface Props {
    style?: StyleProp<ViewStyle> 
    onDebounce: (value: string) => void
}

export const SearchInput = ({style, onDebounce}: Props) => {
  
  const [textValue, setTextValue] = useState('')
  const deboncedValue =  useDebouncedValue(textValue)
  
    useEffect(() => {
        onDebounce(deboncedValue)
        // console.log({deboncedValue})
    }, [deboncedValue])

    return (
    <View style={{...style as any}}>
        <View style={styles.textBackground} >
            <TextInput 
                placeholder='Buscar Pokémon'
                style={{    
                    ...styles.textInput
                }}
                autoCapitalize='none'
                autoCorrect={false}
                value={textValue}
                onChangeText={setTextValue}
            />

            <Icon 
                name="search-outline"
                color="grey"
                size={ 30 } 
            />
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    textBackground: {
        backgroundColor: '#F3F1F3',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    textInput: {
        flex: 1,
        fontSize: 18
    }
})