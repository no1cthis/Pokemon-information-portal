import {useHttp} from '../hooks/http.hook'

const usePokemonService = () =>{

    const {loading, request, error, clearError} = useHttp()

    const _baseAPI='https://pokeapi.co/api/v2/'

    const getListPokemons = async(offset=0, limit=9) =>{
      return await request(`${_baseAPI}pokemon/?offset=${offset}&limit=${limit}`)
    }

    const getPokemonbyId = async(id=1) => {
       const temp = await request(`${_baseAPI}pokemon/${id}`)

        return await _transformDataFromServer(temp);
      }

      const getPokemonByName = async(name='bulbasaur') => {
        const temp = await request(`${_baseAPI}pokemon/${name}`)
        return await _transformDataFromServer(temp)
      }

      const _transformDataFromServer = (data) => {
        return {
        name: data['name'],
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        specialAttack: data.stats[3].base_stat,
        specialDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
        picture: data.sprites['front_default'],
        id: data['id']
        }
      }

      return {getPokemonbyId, getPokemonByName, getListPokemons, loading, error, clearError}
}

export default usePokemonService