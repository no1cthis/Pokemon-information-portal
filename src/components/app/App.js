import { useState } from "react";


import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import './pokemon.scss'




const App = () => {

    const [selectedPokemon, setPokemon] = useState()


   const ChangeSelectedPokemon = (id) => {
        setPokemon(id)
   }

    return (
        <div className="app">
            <AppHeader/>
            <main>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onChangePokemon={ChangeSelectedPokemon}/>
                    </ErrorBoundary>
                    <div>
                    <ErrorBoundary>
                        <CharInfo selectedPokemon = {selectedPokemon}/>
                    </ErrorBoundary>

                    </div>
                    
                </div>
            </main>
        </div>
    )
}

export default App;