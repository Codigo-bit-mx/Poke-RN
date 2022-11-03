import React from 'react'
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SimplePokemon } from '../interfaces/PokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useState, useEffect, useRef } from 'react';
import ImageColors from 'react-native-image-colors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/StackNavigator';

const windowWidth = Dimensions.get('window').width

interface Props  {
    pokemon: SimplePokemon 
    // navigation: any
}

export const PokemonCard = ({pokemon}: Props) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
    const [bgColor, setBgColor] = useState('grey')
    const isMounted = useRef(true)
   

    useEffect(() => {
        const fetchColor = async () => {
            const result = await ImageColors.getColors(pokemon.picture, {
                fallback: 'grey',
            })
        switch (result.platform) {
            case 'android':
                setBgColor(result.dominant || 'grey')
            break

            case 'ios':
                setBgColor(result.background)
            break
        }
        }
        fetchColor()
        
        return () => {isMounted.current = false}
        
        //alternativa mas corta
        // ImageColors.getColors(pokemon.picture, {fallback: 'grey'})
        // .then(colors => {
        //     (colors.platform === 'android') 
        //         ? setBgColor(colors.dominant || 'grey')
        //         :setBgColor(colors.background || 'grey')
            
        // })
    
    }, [])


    return (
    
    <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
            navigation.navigate('PokemonScreen', {simplePokemon: pokemon, colors: bgColor})
        }}
    >
        <View style ={{
            ...styles.cardContainer,
            width: windowWidth * 0.4,
            backgroundColor: bgColor
        }}>

            <View>
                <Text style={styles.name}>
                    {pokemon.name}
                    {'\n#' + pokemon.id}
                </Text>
            </View>

            <View>
                <Image 
                    source={require('../assets/pokebola-blanca.png')}
                    style={{...styles.imagenPokebola}}
               />
            </View>

      
            <FadeInImage 
            uri={ pokemon.picture }
            style={{
                ...styles.pokemonImagen
            }}
        />
             
        </View>
    </TouchableOpacity>

  )
}


const styles = StyleSheet.create({
    cardContainer:{
        marginHorizontal:10,
        // backgroundColor:'red',
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name:{
        color:'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 10,
        right: -10
    },
    containerPokebola:{
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow:'hidden' 
    },
    imagenPokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -20
    },
    pokemonImagen:{
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -10
    }
})