import React, { useState } from 'react';
import network from '../service/network';
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import logo from './files/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async () => {
    const response = await network.post('api/login', {
      username,
      password
    });
    if (response.data && response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', username);
      window.location = '/home';
    } else {
      console.log(response.response.data.errorMessage)
      setError(response.response.data.errorMessage)
    }
  }
  return(
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
      <h3>Sign in</h3>
      <input className="loginInput" placeholder="user name" value={username} onChange={({ target: { value } }) => setUsername(value)} /><br/>
      <input className="loginInput" placeholder="password" type="password" value={password} onChange={({ target: { value } }) => setPassword(value)} /><br/>
      <button onClick={onSubmit}>Login</button><br/>
      {error ? <div>*{error}</div> : null}
      <Link to="/register">Create your Account</Link>
    </div>
    </>
  )
}

export default Login;