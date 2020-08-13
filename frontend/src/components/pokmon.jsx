import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios'

const Container = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Pokemon = (props)=>{
    const [pokemonImage, setPokemonImage] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)
        let cancel
        axios.get(props.url).then(res => {
            // console.log(res.sprites)
            setLoading(false)
            setPokemonImage(res.data.sprites.front_default)
        })
        return () => cancel
    }, [pokemonImage])

    // if (loading) return "Loading..."

    return(
        <div>
            <div>
                {props.name}
                {props.url}
                <img src = {pokemonImage}/>
            </div>
        </div>
    )
}

export default Pokemon