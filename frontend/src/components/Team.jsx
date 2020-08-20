import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import {Radar} from 'react-chartjs-2'
import types from '../constants/typesIndex'
import {useLocation, Redirect, useHistory, Link} from 'react-router-dom';


const TeamContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:center;
    align-content:center;
    width: 95%;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 180px;
    background-color: #3d7dca;
    border-radius: 25px;
`
const PokemonContainer = styled.div`
    display: flex;
    width: 100%;
    height: 110px;
    margin-left: 20px;
    margin-right: 20px; 
    margin-top: 20px;
    margin-left: 20px;
`
const PokemonBox = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-left: 5%;   
    margin-right: 5%;
    height: 100%;`
const PokemonImage = styled.img`
    width: 155%;
    height: 155%;
    align-self: center;`

const Team = (props) =>
{
    const labels = types.names 
    const data = [props.team.normal,props.team.fighting,props.team.flying,props.team.poison,props.team.ground,props.team.rock,
        props.team.bug,props.team.steel,props.team.fire,props.team.water,props.team.grass,props.team.electric,
        props.team.psychic,props.team.ice,props.team.dragon,props.team.dark,props.team.fairy]

    return(
        <TeamContainer> 
            <PokemonContainer>
                <PokemonBox>
                    <PokemonImage src = {props.team.pic1}/>
                </PokemonBox>
                <PokemonBox>
                    <PokemonImage src = {props.team.pic2}/>
                </PokemonBox>
                <PokemonBox>
                    <PokemonImage src = {props.team.pic3}/>
                </PokemonBox>
                <PokemonBox>
                    <Radar 
                        data = {{labels: labels, datasets: [{data: data}]}}
                        width = {200}
                        height = {200}
                        options = {{scale: {
                            ticks: {
                            display: false,
                            maxTicksLimit: 5
                            }
                        },
                            title:{
                                display: false,
                                text: "Strengths"
                            },
                            legend:{
                                display: false
                            },
                            // gridLines:{
                            //     display: false
                            // },
                        }}
                    />
                </PokemonBox>
            </PokemonContainer>
        </TeamContainer>
    )
}

export default Team