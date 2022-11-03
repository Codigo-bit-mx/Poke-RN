import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigator } from './StackNavigator';

import { SearchPokemon } from '../screens/SearchPokemon';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform, Text } from 'react-native';
import { Tab2Screen } from './Tab2';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    
    <Tab.Navigator
        sceneContainerStyle={{
            backgroundColor: 'white'
        }}
        screenOptions={{
            headerShown: false,
            activeTintColor: 'green',
            tabBarLabelStyle:{
                marginBottom: (Platform.OS === 'ios' ? 0 : 10)
            },
            tabBarStyle:{
                position: 'absolute',
                backgroundColor: 'rgba(255, 255, 255, 0.90)',
                borderWidth:0,
                elevation: 0,
                height: (Platform.OS === 'ios') ? 80 : 55
            }
        }}
    >
    
      <Tab.Screen 
            name="Pokedex"
            component={StackNavigator}
            options={{
                tabBarLabel: () => (
                    <Text style={{color:'green', fontSize: 10}}>Pokedex</Text>
                ),
                tabBarIcon:() => ( 
                    <Icon color={'green'} size={25} name='home-outline' />
                 )
            
            }}     
      />
      
      <Tab.Screen 
            name="SearchPokemon"
            component={Tab2Screen}
            options={{
                tabBarLabel: () => (
                    <Text style={{color:'green', fontSize: 10}}>Busqueda</Text>
                ),
                tabBarIcon:() => ( 
                    <Icon color={'green'} size={25} name='search-outline' />
                 )
            
            }}     
     />
    
    </Tab.Navigator>
    
  );
}

   {/* <Tab.Screen name="Tabs1Screen" options={{ title: 'Tab1', tabBarIcon: (props) => <Text>T1</Text> }} component={Tabs2Screen} /> */}