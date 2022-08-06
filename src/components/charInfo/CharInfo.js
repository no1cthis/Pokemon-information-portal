import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import Loading from '../loading/Loading';
import usePokemonService from "../../services/PokemonService";

import cl from './charInfo.module.scss';


const CharInfo =(props) => {

    const {error, getPokemonbyId} = usePokemonService()
    const [pokemon, setPokemon]  = useState(null);  

    useEffect(() =>{
        
        updatePokemon(props.selectedPokemon)
    }, [props.selectedPokemon])

    const updatePokemon = (id) =>{
        console.log('1')
        getPokemonbyId(id)
        .then(item => setPokemon(item))
}
       let selectedPokemon
       if(pokemon!= null)
       {
        selectedPokemon = generateSelectedPokemon(pokemon)
       }
        else{selectedPokemon = <Loading/>}
        return (
            <div className={cl.char__info}>
                    {selectedPokemon}
            </div>
        )
}

    

const generateSelectedPokemon = (pokemon) => {
    return(
        <>
        <div className={cl.char__basics}>
                    <img src={pokemon['picture']} alt={pokemon['name']}/>
                    <div>
                        <div className={cl.char__infoName}>{pokemon.name}</div>
                        <div className={cl.char__btns}>
                        HP: {pokemon.hp}<br/>
                        Attack: {pokemon.attack}<br/>
                        Defense: {pokemon.defense}<br/>
                        Special Attack: {pokemon.specialAttack} <br/>
                        Special Defense: {pokemon.specialDefense}<br/>
                        Speed: {pokemon.speed}<br/>
                        </div>
                    </div>
                </div>
        </>
    )
}

CharInfo.propTypes ={
    selectedPokemon: PropTypes.number
}

export default CharInfo;