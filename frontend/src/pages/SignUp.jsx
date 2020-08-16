import React, {useState, useEffect} from 'react';
import {useLocation, Redirect, useHistory, Link} from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios'

const OuterContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;`;

    //need to media qeury the width of buttons
    const Button = styled.button`
    background-color: black;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
    align-items: center;
    align-content: center;
    `;

    //need to media qeury the width of inputs
    const UserInput = styled.input`
    align-items: center;
    align-content: center;
    padding: 0 .5em 0 .5em;
    margin: .4em 0;`

    //need to change font style
    const NewUserLink = styled(Link)`
    text-align: center;
    justify-content: center;
    align-items: center;
    align-content: center;`

const SignUp = () => {

    let history = useHistory();

    const SignUp = () =>
    {
        console.log(username, password)
        axios.post('http://localhost:8000/userPost', {
            username: username,
            password: password,
        })
        .then((response)=>
            {
                console.log(response.data)
                localStorage.setItem('user', username)
                localStorage.setItem('id', response.data.id)
                history.push("/profile")
            })
        .catch((err)=>console.log(err))
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return(
        <OuterContainer>
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
            <Button onClick = {SignUp}>Sign Up!</Button>
        </OuterContainer>
      )
}

export default SignUp