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
    border: 3px solid black;
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
    margin: 1em;`

const Pokemon = (props) =>
{   
    const labels = types.names 
    const [data, setData] = useState(types.startData)
    const chartDataExample = {labels: ["test1", "test2", "test3", "test4", "test5", "test6"],
                datasets: [
                    {data: [3,3,3,3,3,3]},
                ]
            }
    // console.log(props.info)
    useEffect(()=>
    {
        
        props.info.url.forEach(url => {
            console.log(url)
            let cancel
            axios.get(url, {
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res=>{
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
                console.log(newData, 'pokemondata', props.p.name)
                // setData([2,2,2,2,2,2,4,2,2,4,2,2,2,2,2,2,2])
                setData(newData)
                // console.log(data)
            })
        });
    }, [])
    return(
        <>
        {
        props.info?.image ? 
            <Card>
                <text>
                    {props.p.name}
                </text>
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
                        backgroundColor: '#41669d',
                    }}
                    >
                        <PokemonBox>
                        <PokemonImage src = {props.info?.image}/>
                            <text>
                                type:&nbsp;
                                {props.info.type.map((t) => 
                                    (
                                        <text>
                                            {t}&nbsp;
                                        </text>
                                    ))}
                            </text>
                            </PokemonBox>
                    </FrontSide>
                    <BackSide
                    style={{ backgroundColor: '#175852'}}>
                        {console.log(data, 'here')}
                        {console.log(labels, 'labels')}
                        
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
                                            display: true,
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