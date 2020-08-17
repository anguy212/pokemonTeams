import React, {useState, useEffect} from 'react';
import "../styles/sideStyle.css"
import styled from 'styled-components'
import SideBar from '../components/sidebar'
import Pokemon from '../components/pokemon'
import axios from 'axios'

const PokemonScroller = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center
  ;
  @media(min-width:995px) and (max-width:1330px){
    width: 995px;
  }
  `
  // align-content:center;
  // align-items: center;
const OuterContainer = styled.div`
  display: flex;
  justify-content: center;`

const Catalogue = () => {
    const [pokemonList, setPokemonList] = useState([])
    // {name:"bulbasaur", url:"https://pokeapi.co/api/v2/pokemon/1/"},
    // {name:"ivysaur", url:"https://pokeapi.co/api/v2/pokemon/2/"}
    const [pokemonInfo, setPokemonInfo] = useState([])
    // {image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    //   type: ["grass", "poison"],
    //   url: ["https://pokeapi.co/api/v2/type/12/", "https://pokeapi.co/api/v2/type/4/"]},
    //   {image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    //   type: ["grass","poison"],
    //   url: ["https://pokeapi.co/api/v2/type/12/", "https://pokeapi.co/api/v2/type/4/"]}

    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
    const [nextPageUrl, setNextPageUrl] = useState()
    const [prevPageUrl, setPrevPageUrl] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>
    {
      setLoading(true)
      let cancel
      axios.get(currentPageUrl).then(res=>{
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        // res.data.results.map(p=> 
        //   {
        //     axios.get
        //   }
        setPokemonList(res.data.results.map(p=> p))
        // console.log(pokemonList,'pokemon')
      })
    }, [currentPageUrl])

    // useEffect(()=>{
    //   var holderData = {}
    //   pokemonList.map((p, index = 0) => {
    //   console.log("searching urls")
    //   axios.get(p.url)
    //   .then(res => {
    //     // console.log(res.data.sprites)
    //     var typeHolder = []
    //     var urlHolder = []
    //     res.data.types.forEach(t => {
    //       typeHolder.push(t.type.name)
    //       urlHolder.push(t.type.url)
    //     });
    //     holderData[res.data.name] = {image: res.data.sprites.front_default, type: typeHolder, url: urlHolder}
    //     index += 1
    //     if(index === 20)
    //     {
    //       console.log(holderData)
    //       setPokemonInfo(holderData)
    //       setLoading(false)
    //     }
    //   })
    // })}, [pokemonList])

    const user = localStorage.getItem('user')
    // console.log(user)    
    if(user === null)
    {
      return(
        <div>
          Not Logged In
        </div>
      )
    }
    else
    {
      if(loading) return "loading..."
      return (
        <div id="App">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <OuterContainer>
              <PokemonScroller>
                {pokemonList.map((pokemon, index) => (
                  <Pokemon key = {index} p = {pokemon} info = {pokemonInfo[pokemon.name]}> </Pokemon>
                ))}
              </PokemonScroller>
            </OuterContainer>
          </div>
      </div>
      )
    }
}

export default Catalogue