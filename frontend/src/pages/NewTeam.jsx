import React, {useState, useEffect} from 'react';
import "../styles/sideStyle.css"
import styled from 'styled-components'
import SideBar from '../components/sidebar'
import PokemonAdd from '../components/pokemonAdd'
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
  overflow: hidden;
  background-color: #91a3b0;
  height: 4em;
  position: fixed;
  width: 100%;
  z-index: 2;
  padding: 1% 3% 1% 10%;`

const BarElementsContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
align-content: center;
position: fixed;
height: 50px;
top: 1%;
right: 30%;
width: 400px;
background-color: white;
border: 3px solid #f1f1f1;
z-index: 9;
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
    width: 80px;
    padding: 0 .5em 0 .5em;
    margin: .4em 0;`

const T2 = styled.text`
    font-family: Ketchum;
    font-size: 25px;
    margin-bottom: 0em;
`
const B = styled.button`
    border: none;
    background:none;`

const NewTeam = () => {
    const [pokemonList, setPokemonList] = useState([])

    const [picked, setPicked] = useState([])

    const [done, setDone] = useState([false])

    const [pokemonInfo, setPokemonInfo] = useState([])

    const [filterType, setFilterType] = useState("none")

    const [special, setSpecial] = useState("none")

    const [search, setSearch] = useState("")

    const [numberPP, setNumberPP] =  useState(20)

    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0")
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

      var holderData = {}

      axios.all(url, {
        cancelToken: source.token,
      }).then(axios.spread((...responses) => {
        responses.forEach(r => {
          // console.log(r)
          var typeHolder = []
          var urlHolder = []
          r.data.types.map(t => {
            typeHolder.push(t.type.name)
            urlHolder.push(t.type.url)
          })
          holderData[r.data.name] = {image: r.data.sprites.front_default, url: urlHolder, type: typeHolder}
        })
        setPokemonInfo(holderData)
        setLoading(false)
        // use/access the results 
      })).catch(errors => {
        // react on errors.
      }) 
      return function () {
        source.cancel("Cancelling in cleanup");}
    }

    async function getType(){
      let source = axios.CancelToken.source();
      const resp = await axios.get("https://pokeapi.co/api/v2/type/" + filterType)
      // console.log(resp.data.pokemon)

      setNextPageUrl(null)
      setPrevPageUrl(null)
      setPokemonList(resp.data.pokemon.map(p=> p.pokemon.name))

      const url = resp.data.pokemon.map(p=>axios.get(p.pokemon.url))

      var holderData = {}

      axios.all(url, {
        cancelToken: source.token,
      }).then(axios.spread((...responses) => {
        responses.forEach(r => {
          // console.log(r)
          var typeHolder = []
          var urlHolder = []
          r.data.types.map(t => {
            typeHolder.push(t.type.name)
            urlHolder.push(t.type.url)
          })
          holderData[r.data.name] = {image: r.data.sprites.front_default, url: urlHolder, type: typeHolder}
        })
        setPokemonInfo(holderData)
        setLoading(false)
        // use/access the results 
      })).catch(errors => {
        // react on errors.
      }) 
      return function () {
        source.cancel("Cancelling in cleanup");}

    }

    function Searching(){
      setLoading(true)
      let source = axios.CancelToken.source();
      axios.get("https://pokeapi.co/api/v2/pokemon/" + search, {
        cancelToken: source.token,
      }).then((resp) => {
        console.log(resp.data)
        setPrevPageUrl(null)
        setNextPageUrl(null)
        setPokemonList([resp.data.name])
        var holderData = {}
        var typeHolder = []
        var urlHolder = []
        resp.data.types.map(t => {
          typeHolder.push(t.type.name)
          urlHolder.push(t.type.url)
        })
        holderData[resp.data.name] = {image: resp.data.sprites.front_default, url: urlHolder, type: typeHolder}
        setPokemonInfo(holderData)
        setLoading(false)
      }).catch(errors => {
        console.log(errors)
      })
      return function () {
        source.cancel("Cancelling in cleanup");}
    }

    useEffect(() => {
      if(special === "none"){
        setLoading(true)
        getResponse()
      }
      else if(special === "filter")
      {
        console.log("filter")
        console.log(filterType)
        if(filterType !== "")
        {
          setLoading(true)
          getType()
        }
      }
      else if(special === "search")
      {
        console.log(search)
        Searching()
        setSpecial("")

      }

 
    }, [currentPageUrl, numberPP, filterType, special])

    const PickedHandler = (i) =>
    {
        console.log(i)
        var holder = [...picked]
        holder.push(pokemonList[i])
        setPicked(holder)
        console.log(picked)

    }

    const user = localStorage.getItem('user')
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
                    {picked.map((p)=>(
                        <T2>
                            {p}
                        </T2>
                    ))}
                </NavigationO>
                </BarElementsContainer>
              </PaginationBar>
              <>
              {loading ? 
              <text>loading</text>
              : 
              <PokemonScroller>

                {pokemonList.map((p, index) => (
                    <B onClick = {() => PickedHandler(index)}>
                        <PokemonAdd key = {index} name = {p} pokemon = {pokemonInfo[p]}/>
                    </B>
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

export default NewTeam