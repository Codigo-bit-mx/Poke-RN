import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigator } from './src/navigator/StackNavigator';
import { Tabs } from './src/navigator/Tabs';
import { Text, View } from 'react-native'

const App = () => {
  return (
    <>
     <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </>
  )
}


export default App