import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { RootStackParams } from "./StackNavigator"
import { PokemonScreen } from '../screens/PokemonScreen'
import { SearchPokemon } from '../screens/SearchPokemon'

const Tab2 =  createStackNavigator<RootStackParams>()

export const Tab2Screen = () => {

    return(
            <Tab2.Navigator
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

                <Tab2.Screen name="HomeScreen" component={SearchPokemon} />
                <Tab2.Screen name="PokemonScreen" component={PokemonScreen} />

            </Tab2.Navigator>
    )

}