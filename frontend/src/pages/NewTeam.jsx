import React, {useState, useEffect} from 'react';
import "../styles/sideStyle.css"
import styled from 'styled-components'
import SideBar from '../components/sidebar'
import Pokemon from '../components/pokemon'
import axios from 'axios'
import types from '../constants/typesIndex'
import {useHistory, Redirect} from 'react-router-dom';


const ListofPokemons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 12em;
  z-index: 1;
`
const FirstContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-content: center;
  align-items: center;
  align-items: stretch;
  z-index: 1;`

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
  padding: 2% 3% 0% 3%;
  @media(min-width:695px) and (max-width:900px){
    flex-direction: row;
  }
  @media(max-width:694px) and (min-width:500px){
    flex-direction: row;
    height: 9.2em;
  }
  @media(max-width:499px){
    flex-direction: row;
    height: 9.5em;
  }
  `

const BarElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 80%;
  width: 90%;
  padding: 10px 10px 0px 10px;
  @media(min-width:300px) and (max-width:900px){
    flex-direction: column;
    width: 30%;
    align-items: flex-end;
    margin-right: 30px;
    align-content: flex-start;
    align-self: flex-start;
  }
  `
const BarElementsContainer0 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 90%;
  padding: 0px 10px 0px 10px;
  @media(min-width:695px) and (max-width:900px){
    margin-left: 100px;
  }
  @media(min-width:500px) and (max-width:694px){
    width: 240px;
    flex-wrap: wrap;
    margin-top: -30px;
    margin-left: 15%;
    margin-right: 2%;
  }
  @media(max-width:499px){
    flex-direction: column;
    height: 300px;
    width: 60px;
    margin-top: 0px;
    margin-left: 20%;
    margin-right: 20%;
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
      background: #FFDE00;
      @media(min-width:530px) and (max-width:694px){
        width: 70px;
        height: 70px;
      }
      @media(max-width:529px) and (min-width:500px){
        width: 60px;
        height: 60px;
      }
      @media(max-width:499px){
        width: 40px;
        height: 40px;
        margin-bottom: 8px;
      }
      `

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
      background: #3B4CCA;
      @media(min-width:530px) and (max-width:694px){
        width: 70px;
        height: 70px;
      }
      @media(max-width:529px) and (min-width:500px){
        width: 60px;
        height: 60px;
      }
      @media(max-width:499px){
        width: 40px;
        height: 40px;
        margin-bottom: 8px;
      }
      `

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
      background: #CC0000;
      @media(min-width:530px) and (max-width:694px){
        width: 70px;
        height: 70px;
      }
      @media(max-width:529px) and (min-width:500px){
        width: 60px;
        height: 60px;
      }
      @media(max-width:499px){
        width: 40px;
        height: 40px;
        margin-bottom: 8px;
      }
      `

const PokemonImage = styled.img`
      width: 100px;
      height: 100px;
      align-self: center
      @media(max-width:529px) and (min-width:500px){
        width: 70px;
        height: 70px;
      }
      @media(max-width:499px){
        width: 60px;
        height: 60px;
      }
      `

const TeamAdd = styled.div`
      display: flex;
      width:320px; 
      height:370px;
      margin-top:-150px; 
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
      background-color: #ACBCD2;
      border: 3px solid #464647;
      z-index: 9;
  `
const Button3 = styled.button`
      background-color: #464647;
      color: white;
      font-size: 10px;
      padding: 5px 30px;
      border-radius: 5px;
      margin-bottom: 5px;
      margin-top: 3px;
      cursor: pointer;
      align-items: center;
      align-content: center;
`

const FormImage = styled.img`
    position: fixed;
    top:50%; 
    left:50%;
    bottom: 50%;
    right: 50%;
    margin-top:-188px; 
    margin-left:-40px;
    width:80px; 
    height:80px;
    `

const TName = styled.h2`
      margin-top: 18%;
      margin-bottom: 0%;
      background-color: 
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
const YellowCircle2 = styled.div`
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

const BlueCircle2 = styled.div`
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

const RedCircle2 = styled.div`
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

const NewTeam = () => {
    const [pokemonList, setPokemonList] = useState([])

    const [pokemonPicked, setPokemonPicked] = useState([])

    const [searchablePokeList, setSerachablePokeList] = useState([])

    const [pokemonInfo, setPokemonInfo] = useState([])

    const [donePicking, setDonePicking] = useState(false)

    const [filterType, setFilterType] = useState("none")

    const [find, setfind] = useState("")

    const [numberPP, setNumberPP] =  useState(20)

    const [numberS, setNumberS] = useState(0)

    const [numberE, setNumberE] = useState(20)

    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=910&offset=0")

    const [loading, setLoading] = useState(true)

    const strengths = types.strengths

    let history = useHistory()

    
    async function getResponse(){
      let source = axios.CancelToken.source();
      const resp = await axios.get(currentPageUrl)
      const url = resp.data.results.map(p => axios.get(p.url))
      
      setPokemonList(resp.data.results.map(p=> p.name))

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
        setLoading(false)
      })).catch(errors => {

      }) 
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

    function PickedPokemon(p){
      if(donePicking === false)
      {
        setPokemonPicked(pokemonPicked => [...pokemonPicked, p])
        console.log(p)
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

    function twoDigits(d) {
      if(0 <= d && d < 10) return "0" + d.toString();
      if(-10 < d && d < 0) return "-0" + (-1*d).toString();
      return d.toString();
    }

    Date.prototype.toMysqlFormat = function() {
        return this.getUTCFullYear() + 
        "-" + twoDigits(1 + this.getUTCMonth()) + 
        "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + 
        ":" + twoDigits(this.getUTCMinutes()) + 
        ":" + twoDigits(this.getUTCSeconds());
    };

    function addTeamToDatabase(){
      var count = 0
      var StrengthAll = []
      pokemonPicked.forEach((p) => {
        var s = []
        console.log(strengths)
        s = strengths[p.type[0]]
        if(p.type.length === 2){
          for (var i=0; i<strengths[p.type[1]].length; i++)
          {
            if(s[i] < strengths[p.type[1]][i])
            {
              s[i] = strengths[p.type[1]][i]
            }
          }
        }
        StrengthAll.push(s)
      })
      console.log(StrengthAll, "strength all")
      var total = []
      for(var i = 0; i<StrengthAll[0].length; i++)
      {
        total.push(StrengthAll[0][i] + StrengthAll[1][i] + StrengthAll[2][i])
      }
      console.log(total, "total strengths")
      var img1 = pokemonPicked[0].image.split("/")
      var img2 = pokemonPicked[1].image.split("/")
      var img3 = pokemonPicked[2].image.split("/")
      console.log(img1[8], img2[8], img3[8])
      axios.post('http://localhost:8000/addNewTeam', {
        team: teamName,
        user: user,
        p1: pokemonPicked[0].name,
        p2: pokemonPicked[1].name,
        p3: pokemonPicked[2].name,
        p1Image: img1[8],
        p2Image: img2[8],
        p3Image: img3[8],
        normal: total[0],
        fighting: total[1],
        flying: total[2],
        poison: total[3],
        ground: total[4],
        rock:   total[5],
        bug:    total[6],
        ghost:  total[7],
        steel:  total[8],
        fire:   total[9],
        water:  total[10],
        grass:  total[11],
        electric: total[12],
        psychic: total[13],
        ice:    total[14],
        dragon: total[15],
        dark:   total[16],
        fairy:  total[17],
        date:   new Date().toMysqlFormat()
      })
      .then((response)=>
      {
          console.log(response.data)
          history.push("/profile")
      })
      .catch((err)=>console.log(err))
    }

    const user = localStorage.getItem('id')
    const teamName = localStorage.getItem('team')

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
            <FirstContainer>
              <PaginationBar>
                <BarElementsContainer0>
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
                      PickedPokemon(p)
                    }}>
                    <Pokemon key = {index} pokemon = {p}/>
                  </PickPokemon>
                ))}
              </ListofPokemons>
              } 
              {donePicking?
                <TeamAdd>
                  <FormImage src = {require('../constants/pokeball1.png')}/>
                  <MessageHolder>
                    <TName>
                      Team {teamName}!
                    </TName>
                  </MessageHolder>
                  <MessageHolder>
                    <RedCircle2> 
                      <>
                      {pokemonPicked[0]? 
                      <PokemonImage src = {pokemonPicked[0].image}/>
                      : 
                      <div></div> }
                      </>
                    </RedCircle2>
                    <YellowCircle2>
                      <>
                      {pokemonPicked[1]? 
                      
                      <PokemonImage src = {pokemonPicked[1].image}/>
                      : 
                      <div></div> }
                      </>
                    </YellowCircle2>
                  </MessageHolder>
                  <MessageHolder>
                    <BlueCircle2>
                        <>
                        {pokemonPicked[2]? 
                        <PokemonImage src = {pokemonPicked[2].image}/>
                        : 
                        <div></div> }
                        </>
                    </BlueCircle2>
                  </MessageHolder>
                  <MessageHolder>
                    Is this team okay?
                  </MessageHolder>
                  <MessageHolderColumn>
                    <Button3 onClick = {()=>addTeamToDatabase()}>
                      Ok!
                    </Button3>
                    <Button3 onClick = {()=>pickAgain()}>
                      No!
                    </Button3>
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

export default NewTeam