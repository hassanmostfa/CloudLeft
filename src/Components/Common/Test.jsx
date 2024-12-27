import React from 'react'

// import { useGetPokemonByNameQuery } from '../../Redux/userSlice'

const Test = () => {

     // Using a query hook automatically fetches data and returns query values
//  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
 // Individual hooks are also accessible under the generated endpoints:
 // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

    return (
            <div className="test container">
                <h1>Test</h1>
    </div>
    )
}
export default Test
