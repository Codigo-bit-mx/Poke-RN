import React from 'react'
import { Text, View, Platform, StyleSheet, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles as globalStyle } from '../styles/AppTheme';
import { useState, useEffect } from 'react';
import { SimplePokemon } from '../interfaces/PokemonInterfaces';

const ScreenWidth = Dimensions.get('window').width

export const SearchPokemon = () => {
  
  const {top} = useSafeAreaInsets()
  const [ term, setTerm ] = useState<string>('')
  const [pokemonFilterd, setPokemonFiltered] = useState<SimplePokemon[]>([])
  const {isLoading, simplePokemonList} = usePokemonSearch()

  useEffect(() => {
    if( term.length === 0){
      return 
    }

    if( isNaN(Number(term) )) {
      setPokemonFiltered(
        simplePokemonList.filter(
          (poke) => poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        )
      )
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term )
      setPokemonFiltered(
        (pokemonById) ? [pokemonById] : []
      )
    }

  }, [term])


  if(isLoading) {
    return(
      <View style={styles.activityContainer}>
        <ActivityIndicator
          color='grey'
          size={25}
        />
      </View>
    )
  }

  return (
    <View style={{
      flex: 1,
      marginTop:(Platform.OS === 'ios') ? top : top + 20,
      marginHorizontal: 20 
    }}>

        <SearchInput 
          onDebounce = {(value) => setTerm (value)}
            style={{
              position: 'absolute',
              zIndex: 999,
              width: ScreenWidth - 40,
              top:(Platform.OS === 'ios') ? top : top + 10
            }}
        />

        <View style={{alignItems: 'center'}}>
          
        <FlatList 
            data={pokemonFilterd}
            keyExtractor={(pokemon) => pokemon.id}
            showsVerticalScrollIndicator={false}
            numColumns={2}

            ListHeaderComponent={(
                <Text style={{
                    ...globalStyle.marginGlobal,
                    ...globalStyle.title,
                    paddingBottom: 10,
                    marginTop:(Platform.OS === 'ios') ? top + 60 : top + 80
                }}>
                    {term}
                </Text>
            )}

            renderItem={({item}) => (
                <PokemonCard pokemon={item}  />
            )}
        />
    </View>

    </View>
  )
}


const styles = StyleSheet.create({
  activityContainer:{
    flex: 1,
    color: 'red',
    justifyContent:'center',
    alignItems:'center'
  }
})