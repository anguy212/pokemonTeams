import React, {useState, useEffect} from 'react';
import nav from '../components/sidebar'
import {slide} from 'react-burger-menu'
import "../styles/sideStyle.css"
import styled from 'styled-components'
import SideBar from '../components/sidebar'

const Hat = styled.img`
    margin-top: 5px;
    margin-bottom: -43px;
    z-index: 2;
    @media(min-width:1227px){
        length: 100x;
        width: 100px;
    }
    @media(min-width:375px) and (max-width:1226px){
        length: 80px;
        width: 80px;
    }
    length: 60px;
    width: 60px;
    `
const Username = styled.h1`
    font-family: Helvetica;
    font-size: 2.5em;
    z-index: 2;
  `
const Header = styled.div`
  display: flex;
  margin-top: 40px;
  margin-bottom: 5px;
  justify-content: center;
  flex-direction: column;
  align-items: center;`

const RedCircle = styled.div`
      width: 120px;
      height: 120px;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      border-radius: 90px;
      background: #CC0000;`

const BlueCircle = styled.div`
      width: 120px;
      height: 120px;
      -webkit-border-radius: 25px;
      -moz-border-radius: 25px;
      border-radius: 90px;
      background: #3B4CCA;`

const YellowCircle = styled.div`
      width: 120px;
      height: 120px;
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
    margin-right: 10%;
    margin-left: 10%;
    background: grey;
    margin-top: 3%;
`

const TableBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    margin-right: 1%;
    margin-left: 1%;
    height: 2.5em;
    background: blue;
`

const UserInput = styled.input`
    align-items: center;
    align-content: center;
    width: 80px;
    padding: 0 .5em 0 .5em;
    margin: .4em 0;`

const SelectBar = styled.select`
    `
  
const Button = styled.button`
      
  `
const BarElement = styled.div`
width: 200px;
height: 100%;
padding: 10px;
`


function Profile() {
    const user = localStorage.getItem('user')
    //console.log(user)
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
              <Hat src = {require('../constants/ashhat.png')}/>
              <Username>{user}</Username>
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

              </TableBar>
              Hello
            </Table>
          </div>
        </div>
      );
    }
  }

export default Profile