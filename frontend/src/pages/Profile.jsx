import React, {useState, useEffect} from 'react';
import {useLocation, Redirect, useHistory, Link} from 'react-router-dom';
import nav from '../components/sidebar'
import {slide} from 'react-burger-menu'
import "../styles/sideStyle.css"
import styled from 'styled-components'
import SideBar from '../components/sidebar'
import Team from '../components/Team'

const Hat = styled.img`
    margin-top: 0px;
    margin-bottom: 30px;
    z-index: 2;
    @media(min-width:1227px){
      length: 80px;
      width: 80px;
    }
    @media(min-width:375px) and (max-width:1226px){
      length: 60px;
      width: 60px;
    }
    length: 40px;
    width: 40px;
    `
const Username = styled.h1`
    font-family: Helvetica;
    font-size: 2em;
    z-index: 2;
  `
const Header = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 5px;
  justify-content: center;
  flex-direction: column;
  align-items: center;`

const RedCircle = styled.div`
      width: 150px;
      height: 150px;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      border-radius: 90px;
      background: #CC0000;`

const BlueCircle = styled.div`
      width: 150px;
      height: 150px;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      border-radius: 90px;
      background: #3B4CCA;`

const YellowCircle = styled.div`
      width: 150px;
      height: 150px;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      border-radius: 90px;
      background: #FFDE00;`

const SecondRow = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-right: 18%;
      margin-left: 18%;
      margin-top: 2%;`

const Header2 = styled.h3`
    font-family: Ketchum;
    font-size: 2em;
    margin-top: 2px;
`
const Table = styled.div`
    justify-content: center;
    margin-right: 10%;
    margin-left: 10%;
    height: 80vh;
    border: 1px solid black;
    margin-top: 3%;
`

const TableBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
    margin-right: 1%;
    margin-left: 1%;
    height: 2.5em;
    background: white;
`

const UserInput = styled.input`
    width: 80px;
    height: 15px;`

const PageInput = styled.input`
width: 15px;
height: 15px;`

const SelectBar = styled.select`

    `
  
const Button = styled.button`
    display: flex;
    align-content:center;
    justify-content:center;
    align-items:center;
      
  `
const BarElement = styled.div`
display: flex;
align-content:center;
justify-content:center;
align-items:center;
width: 200px;
height: 100%;
padding: 10px;
`
const ElementsHolder = styled.div`
    display: flex;
    flex-direction: column;
    overflow: scoll;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
    margin-right: 1%;
    margin-left: 1%;
    heigh: 80vh;
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
    `
const TeamAdd = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    position: fixed;
    height: 100px;
    bottom: 50%;
    right: 40%;
    background-color: white;
    border: 3px solid #f1f1f1;
    z-index: 9;
`


function Profile() {
    let history = useHistory()
    const [teamName, setteamName] = useState("")
    const user = localStorage.getItem('user')
    const [newTeam, setNewTeam] = useState(false)
    const [teams, setTeams] = useState([
      {teamName: "GOAT", p1: "bulbasaur", p2: "charmander", p3: "squirtle", 
      pic1: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      pic2: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      pic3: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
      date: 'Mar 12 2012 10:00:00 AM',
      normal: 1, fighting: 1, flying: 2, poison: 3, ground: 2, rock: 2, bug: 3, steel: 2,
      fire: 1, water: 4, grass:4, electric: 1, psychic: 1, ice: 2, dragon: 3,
      dark: 4, fairy: 4
    },
    {teamName: "WaterSlid3", p1: "bulbasaur", p2: "charmander", p3: "squirtle", 
      pic1: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      pic2: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      pic3: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
      date: 'Mar 12 2012 12:00:00 PM',
      normal: 1, fighting: 1, flying: 2, poison: 3, ground: 2, rock: 2, bug: 3, steel: 2,
      fire: 1, water: 4, grass:4, electric: 1, psychic: 1, ice: 2, dragon: 3,
      dark: 4, fairy: 4
    }
    ])
    //console.log(user)
    // <Header>
    //           <Hat src = {require('../constants/ashhat.png')}/>
    //           {/* <Username>{user}</Username> */}
    //         </Header>
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
          <Header>
            {/* <Hat src = {require('../constants/ashhat.png')}/> */}
             <Username>PROFILE</Username>
             </Header>
            <SecondRow>
              <RedCircle>
                <Header2>5 <br/>Teams</Header2>
              </RedCircle>
              <BlueCircle>
                <Header2>
                  Pokemon: 4/100
                </Header2>
              </BlueCircle>
              <YellowCircle>
                <Header2>
                  Strengths:
                </Header2>
              </YellowCircle>
            </SecondRow>
            <Table>
              <TableBar>
              <BarElement>
                Sort by:&nbsp;
                <SelectBar 
                // value = {} 
                // onChange = {(event)=>{}}
                >
                  <option value = "name"> name </option>
                  <option value = "recently"> recently added </option>
                  <option value = "type"> strong against  </option>
                  <option value = "flying"> flying </option>
                </SelectBar>
              </BarElement>
              <BarElement>
                Search: &nbsp;
                  <UserInput 
                        type = "text" 
                        // placeholder = "search..." 
                        // value = {search} 
                        // onChange = {
                        //   (event)=>
                        //   {
                        //     setSearch(event.target.value)
                        //   }}
                        />
                  <Button>Go!</Button>
              </BarElement>
              <BarElement>
                <PageInput></PageInput>
                <Button>
                  Back
                </Button>
                <Button>
                  Next
                </Button>
              </BarElement>
              </TableBar>
              <ElementsHolder>
                {teams.map((t, index) => 
                (
                  <Team key = {index} team = {t}/>
                )
                )}
              </ElementsHolder>
            </Table>
            {newTeam? 
              <TeamAdd>
                Enter your new team name:
                <br/>
                <UserInput value = {teamName}
                onChange = {(event) => {setteamName(event.target.value)}}/>
                <br/>
                <Button onClick = {()=>
                  {
                    console.log(teamName)
                    localStorage.setItem('team', teamName)
                    history.push("/newTeam")
                  }}>
                    Go!
                </Button>
              </TeamAdd>
              :
              <></>
            }
            <Button2 onClick = {() => setNewTeam(true)} >Add Team</Button2>
          </div>
        </div>
      );
    }
  }

export default Profile