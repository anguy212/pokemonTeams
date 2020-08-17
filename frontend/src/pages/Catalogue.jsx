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
  overflow: hidden;
  background-color: grey;
  height: 5em;
  position: fixed;
  width: 100%;
  z-index: 2;
  padding: 1% 3% 1% 10%;`

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
    width: 80px;
    padding: 0 .5em 0 .5em;
    margin: .4em 0;`

const Catalogue = () => {
    const [pokemonList, setPokemonList] = useState([])

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

    useEffect(() => {
      setLoading(true)

      getResponse()
 
    }, [currentPageUrl, numberPP])

    // useEffect(() => {
    //   const CancelToken = axios.CancelToken;
    //   const source = CancelToken.source();

    //   setLoading(true)
    //   const fetchData = async () => {
    //   const result = await axios.get(currentPageUrl, { cancelToken: source.token })
    //   const data = result.data
    //   setNextPageUrl(data.next)
    //   setPrevPageUrl(data.previous)

    //   // console.log(data)

    //   // var holderArray = []
    //   var holderData = {}
      
    //   data.results.map((p, index) =>
    //   {
    //     var typeHolder = []
    //     var urlHolder = []
    //     // console.log(p.name)
    //     setPokemonList(pokemon=>[...pokemon, p.name])
    //     let cancel
    //     axios.get(p.url, 
    //       {cancelToken: new axios.CancelToken(c => cancel = c)})
    //     .then(res => { 
    //       // console.log(res.data)
    //       res.data.types.map((t) =>{
    //         typeHolder.push(t.type.name)
    //         urlHolder.push(t.type.url)
    //       })
    //       holderData[res.data.name] = {image: res.data.sprites.front_default, type: typeHolder, url: urlHolder}
    //       index += 1
    //       //this hardset 20 has to change after pagination
    //       if(index === 20){
    //         // console.log(holderData)
    //         // console.log(pokemonList)
    //         setPokemonInfo(holderData)
    //         setLoading(false)
    //       }
    //     })
    //     return () => {
    //       source.cancel();
    //   };
    //   })
    //   }
    //   fetchData()
    //   return () => {
    //     source.cancel();
    //   };
    // }, [currentPageUrl, numberPP])

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
              <PaginationBar>
                <BarElementsContainer>
                  <NavigationO>
                    Search:&nbsp;
                    <UserInput 
                    type = "text" 
                    placeholder = "search..." 
                    // value = {password} 
                    // onChange = {(event)=>setPassword(event.target.value)}
                    />
                    <Button>Go!</Button>
                  </NavigationO>
                  <NavigationO>
                    {/* {special} */}
                    Filter type:&nbsp;
                    <SelectBar value = {filterType} 
                    onChange = {(event)=>{setFilterType(event.target.value)
                                          setSpecial("filter")}}>
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
                        setNumberPP(event.target.value)
                        setCurrentPageUrl("https://pokeapi.co/api/v2/pokemon/?limit="+ event.target.value +"&offset=0")}}>
                      <option> 20 </option>
                      <option> 40 </option>
                      <option> 100 </option>
                    </SelectBar>
                  </NavigationO>
                  <NavigationO>
                    <Button
                      onClick = {() => {if(prevPageUrl !== null) {
                        console.log(prevPageUrl)
                        setCurrentPageUrl(prevPageUrl)
                      }}}
                    >
                      Back
                    </Button>
                    <Button
                      onClick = {() => {if(nextPageUrl !== null) {
                        console.log(nextPageUrl, "NEXT PAGE URL")
                        setCurrentPageUrl(nextPageUrl)
                      }}}>
                      Next
                    </Button>
                  </NavigationO>
                </BarElementsContainer>
              </PaginationBar>
              <PokemonScroller>
                {pokemonList.map((p, index) => (
                  <Pokemon key = {index} name = {p} pokemon = {pokemonInfo[p]}/>
                ))}
              </PokemonScroller>
            </OuterContainer>
          </div>
      </div>
      )
    }
}

{/* add empty boxes until modulo 3 reached */}
                {/* <EmptyBox></EmptyBox> */}

export default Catalogue