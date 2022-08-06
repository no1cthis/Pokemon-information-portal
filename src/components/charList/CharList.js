import  React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'

import usePokemonService from '../../services/PokemonService';
import Loading from '../loading/Loading';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';


const CharList = (props) => {

    const refItemPokemon = useRef()
    const refLastItemPokemon = useRef()

    const {loading, error, getListPokemons, getPokemonByName } = usePokemonService()
    const [pokemonList, setPokemonList] = useState([])
    const [loadingMore, setLoadingMore] = useState(false)


    useEffect( ()=>{
        loadMorePokemons()
    }, [])
   
    const loadMorePokemons =async ()=>{
        setLoadingMore(true)

        let temp = []
          await getListPokemons(pokemonList.length)
         .then(item => item.results)
         .then(item => item.map(element => element['name']))
         .then(item => item.map(pok => getPokemonByName(pok)))
         .then(item => {
             item.forEach(promise => 
                 promise.then(inner => {
                     temp.push(inner)
             }))
         })
         
       setTimeout(()=> {
         temp.sort((a,b)=>a.id-b.id)
         temp = [...pokemonList, ...temp]
         setPokemonList(temp);
         setLoadingMore(false);
     }, 1000)
    }

    const buttonMore = () => {
        return(
            
            <button className="button button__main button__long">
            <div className="inner" onClick={loadMorePokemons}>load more</div>
            </button>
            
        )
    }

    const setRef = elem => {
        if(refItemPokemon.current == elem)
            return
        console.log('setRef')
        refItemPokemon.current = elem;
       toggleActiveClass(elem)
    }

    const toggleActiveClass = (elem) => {
        console.log('toggleClass');
        refItemPokemon.current.className += ' char__item_selected'
        
        if(refLastItemPokemon.current)
        {
            console.log('if')
            refLastItemPokemon.current.className = 'char__item'
        }
            
        refLastItemPokemon.current = elem
    }


    const charItems = (ListItem) => {
        return(
            <>
            <li className="char__item" 
            key = {ListItem['id']}
            onClick={ (event) => {
                props.onChangePokemon(ListItem['id'])
                setRef(event.target)
            }}
            >
                            <img src={ListItem['picture']} alt={ListItem['name']}/>
                <div className="char__name">{ListItem['name']}</div>
            </li>
            </>
            ) 
    }

    
       
        let charItemsList = []
            charItemsList.shift()
            pokemonList.forEach(item => charItemsList.push(charItems(item)))

         if( loading == false && error == true)
            charItemsList.push(<ErrorMessage/>)

            let buttonMoreElement = buttonMore() 
            if(loadingMore==true) buttonMoreElement = <Loading/>




        return (
            <div className="char__list">
                <ul className="char__grid">
                    {[...charItemsList]}
                </ul>
                    {buttonMoreElement}
                
            </div>
        )
}


CharList.propTypes ={
    onChangePokemon: PropTypes.func
}



export default CharList;