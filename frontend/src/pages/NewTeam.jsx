import React, {useState, useEffect} from 'react';
import "../styles/sideStyle.css"
import styled from 'styled-components'
import SideBar from '../components/sidebar'
import Pokemon from '../components/pokemon'
import axios from 'axios'
import types from '../constants/typesIndex'


const ListofPokemons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 12em;
  z-index: 1;
`
  // @media(min-width:995px) and (max-width:1330px){
  //   width: 995px;
  // }
  
const FirstContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-content: center;
  align-items: center;
  align-items: stretch;
  z-index: 1;`

// const Header = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-content: center;
//   align-items: center;
//   background-color: #91a3b0;
//   height: 5em;
//   position: fixed;
//   width: 100%;
//   z-index: 2;
//   padding: 1% 3% 1% 3%;
// `

const PaginationBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: #91a3b0;
  height: 9em;
  position: fixed;
  width: 100%;
  z-index: 3;
  padding: 2% 3% 0% 3%;`

// const SelectedBar = styled.div`
//   display: flex;
//   justify-content: center;
//   align-content: center;
//   align-items: center;
//   background-color: #91a3b0;
//   height: 2em;
//   position: fixed;
//   width: 100%;
//   z-index: 3;
//   padding: 1% 20% 1% 20%;
// `

const BarElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 80%;
  width: 90%;
  padding: 10px 10px 0px 10px;
  `
const BarElementsContainer0 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 90%;
  padding: 0px 10px 0px 10px;
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
  height: 60%;
  padding: 5px;
`
const UserInput = styled.input`
  align-items: center;
  align-content: center;
  width: 100px;
  padding: 0 .5em 0 .5em;
  margin: .2em 0;`

const PickPokemon = styled.button`
  background-color: Transparent;
  background-repeat:no-repeat;
  border: none;
  cursor:pointer;
  overflow: hidden;
  outline:none;  
`

const YellowCircle = styled.div`
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      width: 90px;
      height: 90px;
      margin-right: 2%;
      margin-left: 2%;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      border-radius: 90px;
      background: #FFDE00;`

const BlueCircle = styled.div`
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;    
      width: 90px;
      height: 90px;
      margin-right: 2%;
      margin-left: 2%;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      border-radius: 90px;
      background: #3B4CCA;`

const RedCircle = styled.div`
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      width: 90px;
      height: 90px;
      margin-right: 2%;
      margin-left: 2%;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      border-radius: 90px;
      background: #CC0000;`

const PokemonImage = styled.img`
      width: 70px;
      height: 70px;
      align-self: center`

const TeamAdd = styled.div`
      display: flex;
      width:320px; 
      height:350px;
      margin-top:-120px; 
      margin-left:-160px;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      align-content: center;
      position: fixed;
      top:50%; 
      left:50%;
      bottom: 50%;
      right: 50%;
      background-color: white;
      border: 3px solid #f1f1f1;
      z-index: 9;
  `
const MessageHolder = styled.div`
      display: flex;
      flex-direction: row;
      margin-top: 10px;
`

const MessageHolderColumn = styled.div`
      display: flex;
      flex-direction: column;
`

const NewTeam = () => {
    const [pokemonList, setPokemonList] = useState([])

    const [pokemonPicked, setPokemonPicked] = useState([])

    const [searchablePokeList, setSerachablePokeList] = useState([])

    const [pokemonInfo, setPokemonInfo] = useState([])

    const [donePicking, setDonePicking] = useState(false)

    const [filterType, setFilterType] = useState("none")

    const [special, setSpecial] = useState("none")

    const [find, setfind] = useState("")

    const [numberPP, setNumberPP] =  useState(20)

    const [numberS, setNumberS] = useState(0)

    const [numberE, setNumberE] = useState(20)

    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=1048&offset=0")
    const [loading, setLoading] = useState(true)
    const strengths = types.strengths

    
    async function getResponse(){
      let source = axios.CancelToken.source();
      const resp = await axios.get(currentPageUrl)
      // console.log(resp.data, "data")
      const url = resp.data.results.map(p => axios.get(p.url))
      
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

    function findPokemons(s) {
      setNumberE(20)
      setNumberS(0)
      console.log(s)
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

    function PickedPokemon(index){
      if(donePicking === false)
      {
        setPokemonPicked(pokemonPicked => [...pokemonPicked, searchablePokeList[index]])
        if (pokemonPicked.length === 2) 
        {
          console.log("had 3")
          setDonePicking(true)
        }
      }
    }

    function pickAgain(){
      setDonePicking(false)
      setPokemonPicked([])
    }

    function addTeamToDatabase(){
      console.log("add to firebase", pokemonPicked[0], pokemonPicked[1], pokemonPicked[2])
      
    }

    const user = localStorage.getItem('user')
    const teamName = localStorage.getItem('team')

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
            <FirstContainer>
              <PaginationBar>
                <BarElementsContainer0>
                  {/* {pokemonPicked.map(p => 
                    (
                      <RedCircle>
                        <PokemonImage src = {p.image}/>
                      </RedCircle>
                    ))} */}
                    <RedCircle> 
                      <>
                      {pokemonPicked[0]? 
                      <PokemonImage src = {pokemonPicked[0].image}/>
                      : 
                      <div></div> }
                      </>
                    </RedCircle>
                    <YellowCircle>
                      <>
                      {pokemonPicked[1]? 
                      
                      <PokemonImage src = {pokemonPicked[1].image}/>
                      : 
                      <div></div> }
                      </>
                    </YellowCircle>
                    <BlueCircle>
                      <>
                      {pokemonPicked[2]? 
                      <PokemonImage src = {pokemonPicked[2].image}/>
                      : 
                      <div></div> }
                      </>
                    </BlueCircle>
                </BarElementsContainer0>
                <BarElementsContainer>
                  <NavigationO>
                    Search:&nbsp;
                    <UserInput 
                    type = "text" 
                    placeholder = "search..." 
                    value = {find} 
                    onChange = {
                      (event)=>
                      {
                        setfind(event.target.value)
                        findPokemons(event.target.value)
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
              <ListofPokemons>
                {searchablePokeList.slice(numberS,numberE).map((p, index) => (
                  <PickPokemon onClick = {()=> 
                    {
                      PickedPokemon(index)
                    }}>
                    <Pokemon key = {index} pokemon = {p}/>
                  </PickPokemon>
                ))}
              </ListofPokemons>
              } 
              {donePicking?
                <TeamAdd>
                  <MessageHolder>
                    Team {teamName}!
                  </MessageHolder>
                  <MessageHolder>
                    <RedCircle> 
                      <>
                      {pokemonPicked[0]? 
                      <PokemonImage src = {pokemonPicked[0].image}/>
                      : 
                      <div></div> }
                      </>
                    </RedCircle>
                    <YellowCircle>
                      <>
                      {pokemonPicked[1]? 
                      
                      <PokemonImage src = {pokemonPicked[1].image}/>
                      : 
                      <div></div> }
                      </>
                    </YellowCircle>
                  </MessageHolder>
                  <MessageHolder>
                    <BlueCircle>
                        <>
                        {pokemonPicked[2]? 
                        <PokemonImage src = {pokemonPicked[2].image}/>
                        : 
                        <div></div> }
                        </>
                    </BlueCircle>
                  </MessageHolder>
                  <MessageHolder>
                    Is this team okay?
                  </MessageHolder>
                  <MessageHolderColumn>
                    <Button onClick = {()=>addTeamToDatabase()}>
                      Ok!
                    </Button>
                    <Button onClick = {()=>pickAgain()}>
                      No!
                    </Button>
                  </MessageHolderColumn>
                </TeamAdd>
              :
                <></>
              }
            </>
            </FirstContainer>
          </div>
      </div>
      )
    }
}

{/* add empty boxes until modulo 3 reached */}
                {/* <EmptyBox></EmptyBox> */}

export default NewTeam