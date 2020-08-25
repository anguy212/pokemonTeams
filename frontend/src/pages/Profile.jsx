import React, {useState, useEffect} from 'react';
import {useLocation, Redirect, useHistory, Link} from 'react-router-dom';
import nav from '../components/sidebar'
import "../styles/sideStyle.css"
import styled from 'styled-components'
import SideBar from '../components/sidebar'
import Team from '../components/Team'
import axios from 'axios'
import {Radar} from 'react-chartjs-2'
import types from '../constants/typesIndex'
import { useMediaQuery } from 'react-responsive'

const Hat = styled.img`
    margin-top: 0px;
    height: 120px;
    width: 120px;
    margin-bottom: -90px;
    z-index: 2;
    opacity: .8;
    @media(max-width:814px){
      height: 80px;
      width: 80px;
      margin-bottom: -60px;
    }
    `
const Username = styled.h1`
    font-family: Helvetica;
    font-size: 4em;
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    z-index: 2;
    @media(min-width:815px)and(max-width:1200px){
      font-size: 3em;
    }
    @media(max-width:814px){
      font-size: 2.5em;
    }
  `
const Header = styled.div`
  display: flex;
  margin-top: 5%;
  margin-bottom: 5px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  `

const RedCircle = styled.div`
      width: 170px;
      height: 170px;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      border-radius: 90px;
      background: #CC0000;
      @media(max-width:450px){
        width: 100px;
        height: 100px;
        margin-right: 8px;
        margin-left: 8px;
        margin-bottom: 8px;
        margin-top: 5px;
      }
      `

const BlueCircle = styled.div`
      width: 170px;
      height: 170px;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      border-radius: 90px;
      background: #3B4CCA;
      @media(max-width:450px){
        width: 100px;
        height: 100px;
        margin-right: 8px;
        margin-left: 8px;
        margin-bottom: 8px;
        margin-top: 5px;
      }`

const YellowCircle = styled.div`
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      align-content: center;
      width: 170px;
      height: 170px;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      border-radius: 90px;
      background: #FFDE00;
      @media(max-width:450px){
        width: 120px;
        height: 120px;
        margin-right: 8px;
        margin-left: 8px;
        margin-top: 30px;
      }`

const SecondRow = styled.div`
      display: flex;
      margin-right: 2%;
      margin-left: 2%;
      margin-top: 2%;
      margin-bottom: 2%;
      border-radius: 30px;
      border-radius: 30px;
      @media(min-width:1200px){
        width: 900px;
        flex-direction: row;
        justify-content: space-between;
      }
      @media(min-width:815px) and (max-width:1199px){
        width: 750px;
        flex-direction: row;
        justify-content: space-between;
      }
      @media(min-width:451px) and (max-width:814px){
        width: 600px;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 20px;
      }
      @media(max-width:450px){
        width: 300px;
        margin-top: -2%;
        flex-direction: row;
        flex-wrap: wrap; 
        align-content: center;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
      }
`

const Header2 = styled.h3`
    font-family: Ketchum;
    font-size: 2em;
    transform: rotate(5deg);
    margin-top: -90px;
    @media(max-width: 450px){
      margin-top: -80px;
      font-size: 1.5em;
    }
`
const Header2B = styled.h3`
    font-family: Ketchum;
    font-size: 5em;
    margin-top: 20px;
    @media(max-width:450px){
      margin-top: 7px;
      font-size: 4em;
    }
`
const Header3 = styled.h3`
    font-family: Ketchum;
    transform: rotate(-10deg);
    font-size: 2em;
    margin-top: 12px;
    @media(max-width:450px){
      margin-top: 4px;
      font-size: 1.5em;
    }
`
const Header3B = styled.h3`
    font-family: Ketchum;
    font-size: 5em;
    margin-top: -35px;
    @media(max-width:450px){
      margin-top: -35px;
      font-size: 4em;
    }
`
const Header4 = styled.h3`
    font-family: Ketchum;
    transform: rotate(5deg);
    font-size: 2em;
    margin-top: 20px;
    margin-bottom: -20px;
    @media(max-width:450px){
      margin-top: 2px;
      font-size: 1.5em;
    }
`

const Table = styled.div`
    justify-content: center;
    height: 700px;
    overflow-y: scroll;
    border: 1px solid black;
    margin-top: 3%;
    @media(min-width:1200px){
      width: 1000px;
    }
    @media(min-width:815px) and (max-width:1199px){
      width: 800px;
    }
    @media(min-width:451px) and (max-width:814px){
      width: 600px;
    }
    @media(max-width:450px){
      width: 300px;
    }
`

const TableBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
    margin-right: 1%;
    margin-left: 1%;
    margin-top: 1%;
    height: 2.5em;
    background: white;
    @media(max-width:450px){
      flex-direction: column;
      margin-top: -5px;
      justify-content: center;
      height: 6.5em;
    }
`

const UserInput = styled.input`
    width: 80px;
    height: 15px;`

const PageInput = styled.input`
    width: 35px;
    height: 15px;`

const SelectBar = styled.select`

    `
  
const Button = styled.button`
    display: flex;
    align-content:center;
    justify-content:center;
    align-items:center;
  `
const Button3 = styled.button`
    background-color: #464647;
    color: white;
    font-size: 10px;
    padding: 5px 30px;
    border-radius: 5px;
    cursor: pointer;
    align-items: center;
    align-content: center;
`

const BarElement = styled.div`
    display: flex;
    align-content:center;
    justify-content:center;
    align-items:center;
    width: 200px;
    height: 100%;
    padding: 10px;
    @media(max-width:450px){
      padding: 2px;
      margin-bottom: -5px;
      height: 30px;
    }
`
const ElementsHolder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
    margin-right: 1%;
    margin-left: 1%;
    heigh: 300px;
    background: white;
`
const Button2 = styled.button`
    background-color: #464647;
    margin-right: 100px;
    margin-left: 100px;
    width: 300px;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    cursor: pointer;
    align-items: center;
    align-content: center;
    margin-top: 20px;
    margin-bottom: 50px;
    @media(max-width:450px)
    {
      margin-right: 20px;
      margin-left: 20px;
    }
    `
const TeamAdd = styled.div`
    display: flex;
    width:320px; 
    height:240px;
    margin-top:-120px; 
    margin-left:-160px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    position: fixed;
    top:50%; 
    left:50%;
    bottom: 50%;
    right: 50%;
    background-color: #3B4CCA;
    border: 3px solid #464647;
    z-index: 9;
`

const OuterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
`
const TeamInput = styled.input`
    margin-top: 10px;
    width: 120px;
    height: 15px;
  `

const FormImage = styled.img`
  position: fixed;
  top:50%; 
  left:50%;
  bottom: 50%;
  right: 50%;
  margin-top:-158px; 
  margin-left:-40px;
  width:80px; 
  height:80px;
`

function Profile() {
    let history = useHistory()
    const [teamName, setteamName] = useState("")
    const user = localStorage.getItem('user')
    const [newTeam, setNewTeam] = useState(false)
    const [teams, setTeams] = useState([])
    const [searchTeams, setSearchTeams] = useState([])
    const uid = localStorage.getItem('id')
    const [loading, setLoading] = useState(true)
    const [pokemon, setPokemon] = useState(new Set())
    const [totalStrength, setTotalStrength] = useState([])
    const [sortValue, setSortValue] = useState()
    const [name, setName] = useState()
    const [pageNumber, setPageNumber] = useState(3)
    const [totalNumTeams, setTotalNumTeams] = useState()
    const [startpage, setStartPage] = useState(0)
    const [endPage, setEndPage] = useState(3)
    const [pageNumber2, setPageNumber2] = useState(3)
    const isTabletOrMobileDevice = useMediaQuery({
      query: '(max-device-width: 450px)'
    })

    useEffect(() => 
    {
      setLoading(true)
      axios.get('http://localhost:8000/teamRetrieve/' + uid )
      .then((res)=>{
        if(res.data.length == 0){
            console.log("not valid information")
        }
        else{
            setTeams(res.data)
            setSearchTeams([...res.data])
            setTotalNumTeams(res.data.length)
            var holderSet = new Set()
            var holderStrength = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            res.data.forEach(t => {
              holderSet.add(t.P1)
              holderSet.add(t.P2)
              holderSet.add(t.P3)
              holderStrength[0] += t.normal 
              holderStrength[1] += t.fighting 
              holderStrength[2] += t.flying 
              holderStrength[3] += t.poison
              holderStrength[4] += t.ground
              holderStrength[5] += t.rock 
              holderStrength[6] += t.bug
              holderStrength[7] += t.ghost
              holderStrength[8] += t.steel
              holderStrength[9] += t.fire
              holderStrength[10] += t.water
              holderStrength[11] += t.grass
              holderStrength[12] += t.electric 
              holderStrength[13] += t.psychic
              holderStrength[14] += t.ice
              holderStrength[15] += t.dragon
              holderStrength[16] += t.dark
              holderStrength[17] += t.fairy
            })
            setPokemon(holderSet)
            setTotalStrength(holderStrength)
            setLoading(false)
        }
      })
    }, [])

    function sortFunction(value){
      if(value === "none")
      {
        setSearchTeams([...teams])
      }
      else if(value === "name"){
        var holder = [...teams]
        holder.sort((a,b)=>(a.team > b.team)? 1: -1)
        setSearchTeams(holder)
      }
      else if (value === "recently")
      {
        var holder = [...teams]
        holder = holder.reverse()
        setSearchTeams(holder)
      }
      else if(value === "flying")
      {
        var holder = [...teams]
        holder.sort((a,b)=>(a.flying > b.flying)? -1: 1)
        setSearchTeams(holder)
      }
    }

    function Search(s) {
      var holderTableReturn = teams.filter((element) =>
      {
        return element.team.includes(s) 
      })
      console.log(teams)
      setSearchTeams(holderTableReturn)
    }

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
          <Header>
            <Hat src = {require('../constants/pokeball1.png')}/>
             <Username>PROFILE</Username>
          </Header>
            <SecondRow>
              <RedCircle>
                {loading?
                <></>
                :
                <>
                <Header2B>{teams.length}</Header2B>
                <Header2>Teams</Header2>
                </>
                }
              </RedCircle>
              <BlueCircle>
                {loading?
                <></>
                :
                <>
                <Header3>
                  Pokemons
                </Header3>
                <Header3B>
                  {pokemon.size}
                </Header3B>
                </>
                }
              </BlueCircle>
              <YellowCircle>
                {loading?
                  <></>
                  :
                  <>
                  <Header4>
                    Strengths:
                  </Header4>
                  {isTabletOrMobileDevice? 
                  <>
                    <Radar 
                      data = {{labels: types.names, datasets: [{data: totalStrength}]}}
                      width = {170}
                      height = {170}
                      options = {
                          {scale: {
                            ticks: {
                            display: false,
                            maxTicksLimit: 5,
                            }
                          },
                          title:{
                              display: false,
                              text: "Strengths"
                          },
                          legend:{
                              display: false
                          },
                          responsive: false,
                      }}
                    />
                  </>
                  :
                  <>
                    <Radar 
                      data = {{labels: types.names, datasets: [{data: totalStrength}]}}
                      width = {220}
                      height = {220}
                      options = {
                          {scale: {
                            ticks: {
                            display: false,
                            maxTicksLimit: 5,
                            }
                          },
                          title:{
                              display: false,
                              text: "Strengths"
                          },
                          legend:{
                              display: false
                          },
                          responsive: false,
                      }}
                    />
                  </>
                  }
                </>
                }
              </YellowCircle>
            </SecondRow>
            <Table>
              <TableBar>
              <BarElement>
                Sort by:&nbsp;
                <SelectBar 
                value = {sortValue} 
                onChange = {(event)=>{
                  setSortValue(event.target.value)
                  sortFunction(event.target.value)
                }}
                >
                  <option value = "none"> none </option>
                  <option value = "name"> name </option>
                  <option value = "recently"> recently added </option>
                  <option value = "flying"> against flying  </option>
                </SelectBar>
              </BarElement>
              <BarElement>
                Search: &nbsp;
                  <UserInput 
                    type = "text" 
                    placeholder = "search..." 
                    value = {name} 
                    onChange = {
                    (event)=>
                      {
                        setName(event.target.value)
                        Search(event.target.value)
                      }}
                  />
              </BarElement>
              <BarElement>
                <PageInput
                type = "number"
                placeholder = "3"
                value = {pageNumber2}
                onChange = {(event) => {
                  setPageNumber2(event.target.value)
                  setPageNumber(Number(event.target.value))
                  setEndPage(startpage+Number(event.target.value))
                }}/>
                <Button
                onClick = {() => {
                  if(startpage-pageNumber >= 0)
                  {
                    setStartPage(startpage-pageNumber)
                    setEndPage(endPage-pageNumber)
                    console.log("start", startpage-pageNumber)
                    console.log("end", endPage-pageNumber)
                  }
                }}>
                  Back
                </Button>
                <Button
                onClick = {() => {
                  if(startpage+pageNumber < totalNumTeams)
                  {
                    setStartPage(startpage+pageNumber)
                    setEndPage(endPage+pageNumber)
                    console.log("start", startpage+pageNumber)
                    console.log("end", endPage+pageNumber)
                  }
                }}>
                  Next
                </Button>
              </BarElement>
              </TableBar>
              <ElementsHolder>
                {loading?
                <></>
                :
                searchTeams.slice(startpage, endPage).map((t, index) => 
                  (
                    <Team key = {index} team = {t}/>
                  )
                )
                }
              </ElementsHolder>
            </Table>
            </OuterContainer>
            <Button2 onClick = {() => setNewTeam(true)} >Add Team</Button2>
            {newTeam? 
              <TeamAdd>
                <FormImage src ={require('../constants/pokeball2.png')}></FormImage>
                Enter your new team name:
                <br/>
                <TeamInput value = {teamName}
                onChange = {(event) => {setteamName(event.target.value)}}/>
                <br/>
                <Button3 onClick = {()=>
                  {
                    console.log(teamName)
                    localStorage.setItem('team', teamName)
                    history.push("/newTeam")
                  }}>
                    Go!
                </Button3>
              </TeamAdd>
              :
              <></>
            }
          </div>
        </div>
      );
    }
  }

export default Profile