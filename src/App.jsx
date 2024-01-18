import './App.css'
import Boton from './Components/Boton'
import Carta from './Components/Carta';

import { TiArrowRightOutline,TiArrowLeftOutline } from "react-icons/ti";
import { useState, useEffect } from 'react';


function App() {

  const [numeroPokemon, SetNumeroPokemon] = useState(1);
  const [evoluciones, SetEvoluciones] = useState([]);

  function decrementarPokemon(){
    if (numeroPokemon==1){
      SetNumeroPokemon(1)
    }
    else{SetNumeroPokemon(numeroPokemon - 1)}
  }
  function aumentarPokemon(){
    SetNumeroPokemon(numeroPokemon + 1)
  }


  useEffect(() => {
    getEvoluciones(numeroPokemon)
  },[numeroPokemon])


  async function getEvoluciones(id){
    const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
    const data = await response.json()

    let pokemonEvoArray = []

    let pokemonLv1 = data.chain.species.name
    let pokemonLv1image = await getPokemonImages(pokemonLv1)

    pokemonEvoArray.push([pokemonLv1, pokemonLv1image])
    if (data.chain.evolves_to.length > 0){
      let pokemonLv2 = data.chain.evolves_to[0].species.name
      let pokemonLv2image = await getPokemonImages(pokemonLv2)
      pokemonEvoArray.push([pokemonLv2, pokemonLv2image])
      if (data.chain.evolves_to[0].evolves_to.length > 0){
        let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name
        let pokemonLv3image = await getPokemonImages(pokemonLv3)
        pokemonEvoArray.push([pokemonLv3, pokemonLv3image])
      }
    
    }
    SetEvoluciones(pokemonEvoArray)
  }

  async function getPokemonImages(name){
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      const data = await response.json()
      return data.sprites.other["official-artwork"].front_default

  }

  return (
    <div className="App">
      <div className={`contenedor-cartas carta${evoluciones.length}`}>
        {
          evoluciones.map(pokemon => 
          <Carta nombre={pokemon[0]} 
          imagen={pokemon[1]} />)
        }
      </div>
      <div className='contenedor-botones'>
        <Boton 
        icon={<TiArrowLeftOutline />}
        manejadorClick={decrementarPokemon}/>
        <Boton
        icon={<TiArrowRightOutline />}
        manejadorClick={aumentarPokemon}/>
      </div>

    </div>

  )
}

export default App;
