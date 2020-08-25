import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import {Radar} from 'react-chartjs-2'
import types from '../constants/typesIndex'
import Flippy, { FrontSide, BackSide } from 'react-flippy';


const PokemonBox = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    align-self: center;
    flex-direction: column;
    margin: .5em;
    padding: .5em`

const Name = styled.text`
    display: flex;
    text-align: center;`

const PokemonImage = styled.img`
    width: 190px;
    height: 190px;
    align-self: center`

const Card = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 300px;
    margin: .7em .25em .7em .25em;`

const T = styled.text`
    font-family: Ketchum;
    font-size: 35px;
    margin-top: -1em;
    `
const T2 = styled.text`
    font-family: Ketchum;
    font-size: 25px;
    margin-bottom: -4em;
`

const Pokemon = (props) =>
{   
    const strengths = types.strengths

    const labels = types.names 
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>
    {
        setLoading(true)
        var s = []
        s = strengths[props.pokemon.type[0]]
        if(props.pokemon.type.length === 2){
          for (var i=0; i<s.length; i++)
          {
            if(s[i] < strengths[props.pokemon.type[1]][i])
            {
              s[i] = strengths[props.pokemon.type[1]][i]
            }
          }
        }
        setData(s)
        setLoading(false)
    }, [])
    return(
        <>
        {
        props.pokemon?.image ? 
            <Card>
                <Flippy
                    flipOnHover={true} 
                    flipOnClick={true} 
                    flipDirection="horizontal" 
                >
                    <FrontSide
                    style={{
                        backgroundColor: '#3d7dca',
                    }}
                    >
                        <PokemonBox>
                        <PokemonImage src = {props.pokemon?.image}/>
                        <T>
                            {props.pokemon.name}
                        </T>
                            <text>
                                type:&nbsp;
                                {props.pokemon.type.map((t) => 
                                    (
                                        <text>
                                            {t}&nbsp;
                                        </text>
                                    ))}
                            </text>
                            </PokemonBox>
                    </FrontSide>
                    <BackSide
                    style={{ backgroundColor: '#ffcb05'}}>
                        <T2>Strengths</T2>
                        {loading?
                        <></>
                        :
                        <Radar 
                                    data = {{labels: labels, datasets: [{data: data}]}}
                                    width = {250}
                                    height = {250}
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
                                    }}
                                />
                        }
                    </BackSide>
                </Flippy>
            </Card> 
        :
        
        <div>
        </div>

        }
        </>
    )
}

export default Pokemon