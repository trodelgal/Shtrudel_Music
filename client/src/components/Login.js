import React, { useState } from 'react';
import network from '../service/network';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import logo from './files/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import {userLoggedIn} from '../service/AnalyticsManager'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async () => {
    const response = await network.post('api/login', {
      email,
      password
    });
    if (response.data && response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.name);
      window.location = '/home';
      userLoggedIn()
    } else {
      setError(response.response.data.errorMessage)
    }
  }
  return (
    <>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
          <Navbar.Brand><img src={logo} alt="logo" width="100" height="50" /></Navbar.Brand>
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
        <input className="loginInput" placeholder="email" value={email} onChange={({ target: { value } }) => setEmail(value)} /><br />
        <input className="loginInput" placeholder="password" type="password" value={password} onChange={({ target: { value } }) => setPassword(value)} /><br />
        <Button variant="dark" onClick={onSubmit}>Login</Button><br />
        {error ? <div style={{ color: 'red' }}>*{error}</div> : null}
        <Link to="/register">Create your Account</Link>
      </div>
    </>
  )
}

export default Login;