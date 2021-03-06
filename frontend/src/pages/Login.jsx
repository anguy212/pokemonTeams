import React, {useState} from 'react';
import {Redirect, useHistory, Link} from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios'

const OuterContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items:center;
    paddiing: 10px 50px 10px, 50px;`

const Button = styled.button`
    background-color: #464647;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    cursor: pointer;
    align-items: center;
    align-content: center;
    @media(min-width:1227px){
        margin-top: 40px 
    }
    @media(max-width:1226px){
        margin-top: 25px;
    }
    `
    const UserInput = styled.input`
    align-items: center;
    align-content: center;
    padding: 0 .5em 0 .5em;
    width: 70%;
    @media(min-width:1227px){
        margin-top: 30px;
        height: 45px; 
    }
    @media(max-width:1226px){
        margin-top: 20px;
        height: 35px;
    }`

    const NewUserLink = styled(Link)`
    text-align: center;
    justify-content: center;
    align-items: center;
    align-content: center;
    @media(min-width:1227px){
        font-size: 20px;
    }
    @media(min-width:375px) and (max-width:1226px){
        font-size: 17px;
    }
    font-size: 15px;`

    const SignInPaper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    background-color: #3B4CCA;
    flex-direction: column;
    @media(min-width:1227px){
        height: 500px;
        width: 400px;
        margin-right: 100px;
        margin-left: 100px;
        margin-bottom: 10px;
    }
    @media(min-width:375px) and (max-width:1226px){
        height: 350px;
        width: 280px;
        margin-right: 100px;
        margin-left: 100px;
        margin-bottom: 10px;
    }
    height: 300px;
    width: 240px;
    margin-right: 100px;
    margin-left: 100px;
    margin-bottom: 10px;`

    const PokemonImage = styled.img`
    length: 100x;
    width: 100px;
    margin-bottom: -50px;
    z-index: 2;
    @media(min-width:1227px){
        length: 180x;
        width: 180px;
        margin-bottom: -90px;
    }
    @media(min-width:375px) and (max-width:1226px){
        length: 120x;
        width: 120px;
        margin-bottom: -60px;
    }
    length: 100x;
    width: 100px;
    margin-bottom: -50px;
    `

const Login = () => {

    let history = useHistory();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const SignedIn = () =>
    {
        axios.get('http://localhost:8000/userRetrieve/' + username + "/" + password)
        .then((res)=>{
            if(res.data.length == 0){
                console.log("not valid information")
            }
            else{
                localStorage.setItem('user', username)
                console.log(res.data[0].id)
                localStorage.setItem('id', res.data[0].id)
                history.push("/profile")
            }
        })
    }

    const user = localStorage.getItem('user')
    if(user === null)
    {
        return(
            <OuterContainer>
                <PokemonImage src ={require('../constants/pokeball2.png')}/>
                <SignInPaper>
                    <UserInput 
                        type = "text" 
                        placeholder = "Username"  
                        value = {username} 
                        onChange = {(event)=>setUsername(event.target.value)}
                    />
                    <UserInput 
                        type = "text" 
                        placeholder = "Password" 
                        value = {password} 
                        onChange = {(event)=>setPassword(event.target.value)}
                    />
                    <Button onClick = {SignedIn}>Sign In!</Button>
                </SignInPaper>
                <NewUserLink to = "/signUp"> New User? </NewUserLink>
            </OuterContainer>
      )
    }
    else
    {
        return <Redirect to = "/profile"/>
    }
}

export default Login
