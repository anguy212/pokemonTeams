import React, {useState, useEffect} from 'react';
import "../styles/sideStyle.css"
import styled from 'styled-components'
import SideBar from '../components/sidebar'
import Pokemon from '../components/pokemon'
import axios from 'axios'
import {Redirect} from 'react-router-dom';

const PokemonScroller = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 1;
  @media(min-width:950px){
    margin-top: 8em;
  }
  @media(min-width:300px) and (max-width:949px){
    margin-top: 11em;
  }
`
  
const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  z-index: 1;`

const PaginationBar = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: #91a3b0;
  position: fixed;
  width: 100%;
  z-index: 2;
  padding: 1% 3% 1% 3%;
  @media(min-width:950px){
    height: 4em;
  }
  @media(min-width:300px) and (max-width:949px){
    height: 9.5em;
  }`

const BarElementsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  height: 80%;
  width: 90%;
  padding: 20px;
  @media(min-width:950px){
    flex-direction: row;
  }
  @media(min-width:300px) and (max-width:949px){
    flex-direction: column;
  }
  `

const EmptyBox = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 300px;
  margin: 1em;
  z-index: 1`

const SelectBar = styled.select`
  `

const Button = styled.button`
    
`
const Button1 = styled.button`
  @media(min-width:800px) and (max-width:949px){
    margin-right: 600px;
  }
  @media(min-width:513px) and (max-width:799px){
    margin-right: 300px;
  }
  @media(min-width:300px) and (max-width:512px){
    margin-right: 110px;
  }
`

const NavigationO = styled.div`
  padding: 10px;
  height: 100%;
  @media(min-width:950px){
    width: 200px;
  }
  @media(min-width:800px) and (max-width:949px){
    width: 800px;
  }
  @media(min-width:513px) and (max-width:799px){
    margin-right: 50px;
  }
`
const UserInput = styled.input`
    align-items: center;
    align-content: center;
    width: 100px;
    padding: 0 .5em 0 .5em;
    margin: .4em 0;`


const Catalogue = () => {
    const [searchablePokeList, setSerachablePokeList] = useState([])

    const [pokemonInfo, setPokemonInfo] = useState([])

    const [filterType, setFilterType] = useState("none")

    const [search, setSearch] = useState("")

    const [numberPP, setNumberPP] =  useState(12)

    const [numberS, setNumberS] = useState(0)

    const [numberE, setNumberE] = useState(12)

    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=910&offset=0")

    const [loading, setLoading] = useState(true)
    
    async function getResponse(){
      let source = axios.CancelToken.source();
      const resp = await axios.get(currentPageUrl)
      const url = resp.data.results.map(p => axios.get(p.url))

      var holderData = []

      axios.all(url, {
        cancelToken: source.token,
      }).then(axios.spread((...responses) => {
        responses.forEach(r => {
          var typeHolder = []
          var urlHolder = []
          var monData = {}
          r.data.types.map(t => {
            typeHolder.push(t.type.name)
            urlHolder.push(t.type.url)
          })
          monData = { id: r.data.id, name: r.data.name, image: r.data.sprites.front_default, url: urlHolder, type: typeHolder}
          holderData.push(monData)
        })
        setPokemonInfo(holderData)
        const now = new Date()
        const pData = {
          data: holderData,
          expire: now.getTime() + 604800000
        }
        localStorage.setItem('pokemonList', JSON.stringify(pData))
        setLoading(false)
      })).catch(errors => 
      {
      }) 
      return function () {
        source.cancel("Cancelling in cleanup");}
    }

    useEffect(() => {
      setLoading(true)
      const pList = localStorage.getItem('pokemonList')
      const pokemonList = JSON.parse(pList)
      const now = new Date()
      console.log(pokemonList)
      if(pokemonList === null || now.getTime() > pokemonList.expire)
      {
        console.log("fetching from pokemon api")
        getResponse()
      }
      else
      {
        console.log("getting pokemon info from cache")
        setPokemonInfo(pokemonList.data)  
        setLoading(false)      
      }
    }, [])

    useEffect(() => {
      setSerachablePokeList(pokemonInfo)
    }, [pokemonInfo])

    function searchPokemon(s) {
      setNumberE(20)
      setNumberS(0)
      var holderTableReturn = pokemonInfo.filter((element) =>
      {
        return element.name.includes(s) 
      })
      setSerachablePokeList(holderTableReturn)
    }

    function FilterByType(s) {
      setNumberE(20)
      setNumberS(0)
      if (s === "")
      {
        setSerachablePokeList(pokemonInfo)
      }
      else
      {
        var holderTableReturn = pokemonInfo.filter((element) =>
        {
          return element.type.includes(s) 
        })
        setSerachablePokeList(holderTableReturn)
      }
    }

    const user = localStorage.getItem('user')

    if(user === null)
    {
      return(
        <Redirect to = "/"/>
      )
    }
    else
    {
      return (
        <div id="App">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <OuterContainer>
              <PaginationBar>
                <BarElementsContainer>
                  <NavigationO>
                    Search:&nbsp;
                    <UserInput 
                    type = "text" 
                    placeholder = "search..." 
                    value = {search} 
                    onChange = {
                      (event)=>
                      {
                        setSearch(event.target.value)
                        searchPokemon(event.target.value)
                      }}
                    />
                  </NavigationO>
                  <NavigationO>
                    Filter type:&nbsp;
                    <SelectBar value = {filterType} 
                    onChange = {(event)=>{setFilterType(event.target.value)
                                          FilterByType(event.target.value)
                                          }}>
                      <option value = ""> none </option>
                      <option value = "normal"> normal </option>
                      <option value = "fighting"> fighting </option>
                      <option value = "flying"> flying </option>
                      <option value = "poison"> poison </option>
                      <option value = "ground"> ground </option>
                      <option value = "flying"> flying </option>
                      <option value = "rock"> rock </option>
                      <option value = "bug"> bug </option>
                      <option value = "steel"> steel </option>
                      <option value = "fire"> fire </option>
                      <option value = "water"> water </option>
                      <option value = "grass"> grass </option>
                      <option value = "electric"> electric </option>
                      <option value = "psychic"> psychic </option>
                      <option value = "ice"> ice </option>
                      <option value = "dragon"> dragon </option>
                      <option value = "dark"> dark </option>
                      <option value = "fairy"> fairy </option>
                    </SelectBar>
                  </NavigationO>
                  <NavigationO>
                    Pokemon per Page:&nbsp;
                    <SelectBar value = {numberPP}
                      onChange = {(event)=>{
                        setNumberPP(Number(event.target.value))
                        setNumberE(numberS+Number(event.target.value))
                      }}>
                      <option> 12 </option>
                      <option> 24 </option>
                      <option> 72 </option>
                    </SelectBar>
                  </NavigationO>
                  <NavigationO>
                    <Button1
                      onClick = {() => {
                        if(numberS - numberPP >= 0) {
                        setNumberS(numberS - numberPP)
                        setNumberE(numberE - numberPP)
                      }}}
                    >
                      Back
                    </Button1>
                    <Button
                      onClick = {() => {
                        if(numberS +  numberPP < 1048) {
                        setNumberS(numberS + numberPP)
                        setNumberE(numberE + numberPP)
                      }}}>
                      Next
                    </Button>
                  </NavigationO>
                </BarElementsContainer>
              </PaginationBar>
              <>
              {loading ? 
              <text>loading</text>
              : 
              <PokemonScroller>
                {searchablePokeList.slice(numberS,numberE).map((p, index) => (
                  <Pokemon key = {index} pokemon = {p}/>
                ))}
              </PokemonScroller>
              } 
              </>
            </OuterContainer>
          </div>
      </div>
      )
    }
}

export default Catalogue