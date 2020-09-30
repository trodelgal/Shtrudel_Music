import React, { useState } from "react";
import {Navbar, Nav} from 'react-bootstrap';
import logo from './files/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import network from '../service/network';

function Register() {
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [secondPassword,setSecondPassword] = useState('');
    const [error,setError] = useState('');
const createAcount= async () => {
    let postUserObj = {
        name: username ,
        email: email,
        password: password,
        is_admin: false,
        created_at: new Date().toISOString().slice(0,10) ,
        upload_at: new Date().toISOString().slice(0,10) 
    }
    if(password===secondPassword){
    const res = await network.post('/api/users',postUserObj);
    if (res.data === 'users added') {
        window.location = '/';
      } else {
        setError(res)
      }
    }else{
        setError('password and confirm password is not the same')
    }
}


  return (
    <>
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"  fixed="top">
        <Navbar.Brand><img src={logo} alt="logo" width="100" height="50"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </div>
    <div className="login">
        <h3>Register Here</h3>
        <input className="loginInput" placeholder="user name" value={username} onChange={({ target: { value } }) => setUsername(value)} /><br/>
        <input className="loginInput" placeholder="email" type="email" value={email} onChange={({ target: { value } }) => setEmail(value)} /><br/>
        <input className="loginInput" placeholder="password" type="password" value={password} onChange={({ target: { value } }) => setPassword(value)} /><br/>
        <input className="loginInput" placeholder="Confirm password" type="password" value={secondPassword} onChange={({ target: { value } }) => setSecondPassword(value)} /><br/>
        <button onClick={createAcount}>Create new account</button><br/>
        {error ? <div>*{error}</div> : null}
    </div>
    </>
  );
}

export default Register;
