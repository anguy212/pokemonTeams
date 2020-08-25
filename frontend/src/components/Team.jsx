import React, {useEffect} from 'react';
import styled from 'styled-components'
import {Radar} from 'react-chartjs-2'
import types from '../constants/typesIndex'


const TeamContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    width: 95%;
    background-color: #70B2EF;
    border-radius: 25px;
    @media(min-width:1200px){
        margin-top: 20px;
        margin-bottom: 15px;
        height: 200px;
    }
    @media(min-width:375px) and (max-width:1199px){
        margin-top: 30px;
        margin-bottom: 15px;
        height: 230px;
    }
`
const PokemonContainer = styled.div`
    display: flex;
    width: 90%;
    height: 110px;
    margin-left: 5px;
    margin-right: 5px; 
    margin-top: 20px;
`

const PokemonBox = styled.div`
    display: flex;
    width: 200px;
    align-items: center;
    height: 100%;
    @media(min-width:451px) and (max-width:814px){
        width: 90px;
        height: 90px;
        align-self: center;
    }
    @media(max-width:450px)
    {
        width: 80px;
        height: 80px;
        align-self: center;
    }`

const PokemonImage = styled.img`
    width: 120px;
    height: 120px;
    align-self: center;
    @media(min-width:451px) and (max-width:814px){
        width: 90px;
        height: 90px;
        align-self: center;
    }
    @media(max-width:450px)
    {
        width: 60px;
        height: 60px;
        align-self: center;
    }
    `

const NameTag = styled.div`
    display: flex;
    justify-content: center;
    height: 30px; 
    width: 200px;
    background: #FFDE00;
    border-radius: 30px;
    @media(min-width:1200px){
        margin-top: -55px;
        margin-bottom: 5px;
    }
    @media(min-width:815px) and (max-width:1199px){
        margin-top: -85px;
        margin-bottom: 25px;
    }
    @media(min-width:451px) and (max-width:814px){
        margin-top: -75px;
        margin-bottom: 25px;
    }
    @media(max-width:450px){
        margin-top: -85px;
        margin-bottom: 30px;
    }
`
const Header4 = styled.h3`
    font-family: Ketchum;
    font-size: 20px;
    margin-top: 3px;
    margin-bottom: 3px;
`
const PokemonImageBar = styled.div`
    display: flex;
    margin-left: 10px;
    justify-content: center;
    align-content: center;
    align-items: center;
    @media(min-width:1200){
        flex-direction: row;
        width: 600px;
    }
    @media(min-width:815px) and (max-width:1199px){
        flex-direction: row;
        width: 400px;
        flex-wrap: wrap;
    }
    @media(min-width:451px) and (max-width:814px){
        flex-direction: row;
        width: 270px;
    }
    @media(max-width:450px){
        flex-direction: column;
        width: 50px;
        margin-right: -18px;
        margin-left: 0px;
      }
`

const Team = (props) =>
{
    useEffect(()=>{
        console.log(props.team.team)
        console.log(types.names)
        console.log(data, "data")
    }, [])
    const labels = types.names 
    const data = [props.team.normal, //0
                  props.team.fighting, //1
                  props.team.flying,  //2
                  props.team.poison, //3
                  props.team.ground, //4
                  props.team.rock, //5
                  props.team.bug, //6
                  props.team.ghost, //7
                  props.team.steel, //8
                  props.team.fire, //9
                  props.team.water, //0
                  props.team.grass, //1
                  props.team.electric, //2
                  props.team.psychic, //3
                  props.team.ice, //4
                  props.team.dragon, //5
                  props.team.dark, //6
                  props.team.fairy //7
                ]
    const img1 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + props.team.p1Image 
    const img2 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + props.team.p2Image 
    const img3 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + props.team.p3Image

    return(
        <TeamContainer> 
            <NameTag>
                <Header4>
                {props.team.team}
                </Header4>
            </NameTag>
            <PokemonContainer>
                <PokemonImageBar>
                    <PokemonBox>
                        <PokemonImage src = {img1}/>
                    </PokemonBox>
                    <PokemonBox>
                        <PokemonImage src = {img2}/>
                    </PokemonBox>
                    <PokemonBox>
                        <PokemonImage src = {img3}/>
                    </PokemonBox>
                </PokemonImageBar>
                <PokemonBox>
                    <Radar 
                            data = {{labels: labels, datasets: [{data: data}]}}
                            width = {220}
                            height = {220}
                            options = {{scale: {
                                ticks: {
                                display: false,
                                maxTicksLimit: 5,
                                fontColor: 'white'
                                }
                            },
                                title:{
                                    display: false,
                                    text: "Strengths"
                                },
                                legend:{
                                    display: false
                                },
                                gridLines:{
                                    // display: false,
                                    color: "white"
                                },
                                responsive: false,
                            }}
                        />
                </PokemonBox>
            </PokemonContainer>
        </TeamContainer>
    )
}

export default Team