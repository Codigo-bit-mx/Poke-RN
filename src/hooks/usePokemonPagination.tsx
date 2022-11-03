import { useEffect, useRef, useState } from "react"
import { PokemonApi } from '../api/PokemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from "../interfaces/PokemonInterfaces";

export const usePokemonPagination = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')
 
  const loadPokemon = async() => { 
    setIsLoading(true)
    const resp = await PokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current)
    nextPageUrl.current = resp.data.next
    mapPokemonList(resp.data.results) 
    
}

    const mapPokemonList = (pokemonList: Result[]) => {
        
        const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {

            const pathUrl = url.split('/')
            const id = pathUrl[pathUrl.length-2]
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            
            return {name, id, picture}

        })
        setSimplePokemonList([...simplePokemonList, ...newPokemonList])
        setIsLoading(false)
    }

    useEffect(() => {
        loadPokemon()
    }, [])


return {
   isLoading,
   loadPokemon,
   simplePokemonList
}
}
