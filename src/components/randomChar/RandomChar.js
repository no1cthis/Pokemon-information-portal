import { useState, useEffect } from 'react';

import usePokemonService from '../../services/PokemonService';
import Loading from '../loading/Loading'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './randomChar.scss';




const RandomChar = () => {
 

   const {getPokemonbyId, loading, error} = usePokemonService()

   const favoritePokemon = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/199.png'//'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png'

    const [pokemon, setPokemon] = useState({})

   
    useEffect(()=> {
        UpdateRandomPokemon()
    },[])

   const UpdateRandomPokemon = () => {
    const id = Math.round(1 - 0.5 + Math.random() * (898 - 1 + 1));
    console.log(id)
    getPokemonbyId(id)
    .then(item => {
        setPokemon(item);
    })
   }

        let randomPokemonBlock = <Loading></Loading>
        if(loading == false && error != true)
            randomPokemonBlock = RandomPokemon(pokemon);
        else if(loading == false && error == true)
            randomPokemonBlock = <ErrorMessage/>
    return (
        <div className="randomchar">
            <div className="randomchar__block">
                {randomPokemonBlock}
            </div>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random pokemon for today!<br/>
                </p>
                <p className="randomchar__title">
                    Wanna choose another one?
                </p>
                <button className="button button__main"
                onClick={UpdateRandomPokemon}>
                    <div className="inner">try it</div>
                </button>
                <img src={favoritePokemon} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}


const RandomPokemon = (pokemon)=>{
    return (
        <>
            <img src={pokemon.picture} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{pokemon['name']}</p>
                    <p className="randomchar__descr">
                        HP: {pokemon.hp}<br/>
                        Attack: {pokemon.attack}<br/>
                        Defense: {pokemon.defense}<br/>
                        Special Attack: {pokemon.specialAttack} <br/>
                        Special Defense: {pokemon.specialDefense}<br/>
                        Speed: {pokemon.speed}<br/>
                        
                    </p>

                </div>
            </>
    )
}

export default RandomChar;