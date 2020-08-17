import React, {useState, useEffect} from 'react';
// import styled from 'styled-components'
// import axios from 'axios'
// // imprt {Route, Switch} from 'react-router-dom'
// // import pages and wrap within 

// //USE HISTORY TO PUSH TO NEW PAGE

// const Container = styled.div`
//  display: flex;
//  flex-direction: row;
// `

// function App() {
//   const [pokemon, setPokemon] = useState([])
//   const [pokemonUrl, setPokemonUrl] = useState([])
//   const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
//   const [nextPageUrl, setNextPageUrl] = useState()
//   const [prevPageUrl, setPrevPageUrl] = useState()
//   const [loading, setLoading] = useState(true)

//   useEffect(()=>
//   {
//     setLoading(true)
//     let cancel
//     axios.get(currentPageUrl, {
//       cancelToken: new axios.CancelToken(c => cancel = c)
//     }).then(res=>{
//       setLoading(false)
//       setNextPageUrl(res.data.next)
//       setPrevPageUrl(res.data.previous)
//       setPokemon(res.data.results.map(p=> p))
//     })
    
//     return () => cancel()
//   }, [currentPageUrl])

//   console.log(pokemon)
//   const goToNextPage = () => {
//     setCurrentPageUrl(nextPageUrl)}

//   const goToPreviousPage = ()=>{
//     setCurrentPageUrl(prevPageUrl)
//   }

//   if (loading) return "Loading..."

//   return (
//     <div>
//       {pokemon.map((p, index)=>(
//         <PokemonInfo key = {index} name = {p.name} url = {p.url}/>
//       ))}
//       {/* <PokemonInfo pokemon = {pokemon} url={pokemonUrl}/> */}
//       <button onClick={goToPreviousPage}>Previous</button>
//       <button onClick={goToNextPage}>Next</button>
//     </div>
    
//   );
// }

// import React, {useState, useEffect} from 'react';
// import styled from 'styled-components';
// import axios from 'axios'

// const Container = styled.div`
//  display: flex;
//  flex-direction: row;
//  flex-wrap: wrap;
// `
// const Column = styled.div`
//   display: flex;
//   flex-direction: column;
// `

// const Pokemon = (props)=>{
//     const [pokemonImage, setPokemonImage] = useState()
//     const [loading, setLoading] = useState(true)

//     useEffect(()=>{
//         setLoading(true)
//         let cancel
//         axios.get(props.url).then(res => {
//             // console.log(res.sprites)
//             setLoading(false)
//             setPokemonImage(res.data.sprites.front_default)
//         })
//         return () => cancel
//     }, [pokemonImage])

//     // if (loading) return "Loading..."

//     return(
//         <div>
//             <div>
//                 {props.name}
//                 {props.url}
//                 <img src = {pokemonImage}/>
//             </div>
//         </div>
//     )
// }

// export default Pokemon


// export default App;