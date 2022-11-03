import { useState, useEffect } from 'react';
import { PokemonFull } from '../interfaces/PokemonInterfaces';
import { PokemonApi } from '../api/PokemonApi';

export const usePokemon = (id: string ) => {
    
    const [isLoading, setIsLoading] = useState(true)
    const [dataPokemon, setDataPokemon] = useState<PokemonFull>({} as PokemonFull )

const loadPokemon = async () => {
    const resp = await PokemonApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${id}`)
    setDataPokemon(resp.data)
    setIsLoading(false)
}


useEffect(() => {
    loadPokemon()
}, [])

return {
   isLoading,
   dataPokemon
 }
}
