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
  justify-content: center;
  margin-top: 8em;
  z-index: 1;
`
  // @media(min-width:995px) and (max-width:1330px){
  //   width: 995px;
  // }
  
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
  height: 4em;
  position: fixed;
  width: 100%;
  z-index: 2;
  padding: 1% 3% 1% 3%;`

const BarElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 80%;
  width: 90%;
  padding: 20px;
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

const NavigationO = styled.div`
  width: 200px;
  height: 100%;
  padding: 10px;
`
const UserInput = styled.input`
    align-items: center;
    align-content: center;
    width: 100px;
    padding: 0 .5em 0 .5em;
    margin: .4em 0;`

const Catalogue = () => {
    const [pokemonList, setPokemonList] = useState([])

    const [searchablePokeList, setSerachablePokeList] = useState([])

    const [pokemonInfo, setPokemonInfo] = useState([])

    const [filterType, setFilterType] = useState("none")

    const [special, setSpecial] = useState("none")

    const [search, setSearch] = useState("")

    const [numberPP, setNumberPP] =  useState(20)

    const [numberS, setNumberS] = useState(0)

    const [numberE, setNumberE] = useState(20)

    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=1048&offset=0")
    const [nextPageUrl, setNextPageUrl] = useState("")
    const [prevPageUrl, setPrevPageUrl] = useState("")
    const [loading, setLoading] = useState(true)
    
    async function getResponse(){
      let source = axios.CancelToken.source();
      const resp = await axios.get(currentPageUrl)
      // console.log(resp.data, "data")
      const url = resp.data.results.map(p => axios.get(p.url))
      
      setNextPageUrl(resp.data.next)
      setPrevPageUrl(resp.data.previous)
      setPokemonList(resp.data.results.map(p=> p.name))

      // console.log(url, "urls")

      var holderData = []

      axios.all(url, {
        cancelToken: source.token,
      }).then(axios.spread((...responses) => {
        responses.forEach(r => {
          // console.log(r)
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
        setLoading(false)
        // console.log(holderData)
        // use/access the results 
      })).catch(errors => {
        // react on errors.
      }) 
      // setSerachablePokeList(pokemonInfo)
      return function () {
        source.cancel("Cancelling in cleanup");}
    }

    useEffect(() => {
      setLoading(true)
      getResponse()
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
      // console.log(holderTableReturn)
      setSerachablePokeList(holderTableReturn)
    }

    function FilterByType(s) {
      setNumberE(20)
      setNumberS(0)
      if (s === "")
      {
        // console.log("none filter type")
        // console.log(pokemonInfo)
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

    // console.log(pokemonInfo)
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
                    {/* {special} */}
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
                  {/* <SortO>
                    Sort by:&nbsp;
                    <SelectBar>
                      <option> index </option>
                      <option> name </option>
                      <option> type </option>
                    </SelectBar>
                  </SortO> */}
                  <NavigationO>
                    Pokemon per Page:&nbsp;
                    <SelectBar value = {numberPP}
                      onChange = {(event)=>{
                        setNumberPP(Number(event.target.value))
                        setNumberE(numberS+Number(event.target.value))
                        setSpecial("none")}}>
                      <option> 20 </option>
                      <option> 40 </option>
                      <option> 100 </option>
                    </SelectBar>
                  </NavigationO>
                  <NavigationO>
                    <Button
                      onClick = {() => {
                        if(numberS - numberPP >= 0) {
                        console.log(numberS - numberPP, "new offset")
                        setNumberS(numberS - numberPP)
                        setNumberE(numberE - numberPP)
                      }}}
                    >
                      Back
                    </Button>
                    <Button
                      onClick = {() => {
                        if(numberS +  numberPP < 1048) {
                        console.log(numberS +  numberPP, "new offset")
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

{/* add empty boxes until modulo 3 reached */}
                {/* <EmptyBox></EmptyBox> */}

export default Catalogue