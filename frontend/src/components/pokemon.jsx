import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import axios from 'axios'
import {Radar} from 'react-chartjs-2'
import types from '../constants/typesIndex'
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import {useLocation, Redirect, useHistory, Link} from 'react-router-dom';

// let history = useHistory()


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
    margin: 2em;`

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
    const labels = types.names 
    const [data, setData] = useState(types.startData)
    const chartDataExample = {labels: ["test1", "test2", "test3", "test4", "test5", "test6"],
                datasets: [
                    {data: [3,3,3,3,3,3]},
                ]
            }
    // console.log(props, "prop")
    useEffect(()=>
    {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        props.pokemon.url.forEach(url => {
            // console.log(url)
            let cancel
            axios.get(url, 
                {cancelToken: new axios.CancelToken(c => cancel = c)}
            ).then(res=>{
                // console.log(res)
                var newData = [...data]
                res.data.damage_relations.double_damage_to.forEach(type =>{
                    // console.log(type.name)
                    // console.log(types.index[type.name])
                    newData[types.index[type.name]] = 4
                })
                res.data.damage_relations.half_damage_to.forEach(type =>{
                    // console.log(type.name)
                    // console.log(types.index[type.name])
                    newData[types.index[type.name]] = 1
                })
                res.data.damage_relations.no_damage_to.forEach(type =>{
                    // console.log(type.name)
                    // console.log(types.index[type.name])
                    newData[types.index[type.name]] = 0
                })
                // console.log(newData, 'pokemondata', props.name)
                // setData([2,2,2,2,2,2,4,2,2,4,2,2,2,2,2,2,2])
                setData(newData)
                // console.log(data)
            })
            return () => {
                source.cancel();
            };
        });
    }, [])
    return(
        <>
        {
        props.pokemon?.image ? 
            <Card>
                <Flippy
                    flipOnHover={true} // default false
                    flipOnClick={true} // default false
                    flipDirection="horizontal" // horizontal or vertical
                    // ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                    // if you pass isFlipped prop component will be controlled component.
                    // and other props, which will go to div
                    // style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
                >
                    <FrontSide
                    style={{
                        backgroundColor: '#3d7dca',
                    }}
                    >
                        <PokemonBox>
                        <PokemonImage src = {props.pokemon?.image}/>
                        <T>
                            {props.name}
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
                        {/* {console.log(data, 'here')}
                        {console.log(labels, 'labels')} */}
                        <T2>Strengths</T2>
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
                                        // gridLines:{
                                        //     display: false
                                        // },
                                    }}
                                />
                    </BackSide>
                </Flippy>
            </Card> 
        :
        
        <Redirect to="/catalogue"></Redirect>

        }
        </>
    )
}

export default Pokemon