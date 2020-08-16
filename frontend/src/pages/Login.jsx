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
                localStorage.setItem('id', res.data.id)
                history.push("/profile")
            }
        })
    }

    const user = localStorage.getItem('user')
    if(user === null)
    {
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
                <Button onClick = {SignedIn}>Sign In!</Button>
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
