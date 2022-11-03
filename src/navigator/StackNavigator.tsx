import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native'
import { HomeScreen } from '../screens/HomeScreen';
import { PokemonScreen } from '../screens/PokemonScreen';
import { SimplePokemon } from '../interfaces/PokemonInterfaces';

export type RootStackParams = {
    HomeScreen: undefined,
    PokemonScreen: {simplePokemon: SimplePokemon, colors?: string}
}

const Stack =  createStackNavigator<RootStackParams>()

export const StackNavigator = () => {

    return(
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    headerStyle: {
                        elevation:0
                    },
                    cardStyle:{
                    backgroundColor:'white'
                }
                }}
            >

                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="PokemonScreen" component={PokemonScreen} />

            </Stack.Navigator>
    )

}