import React, { useState, useRef, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./files/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { newRegister } from "../service/AnalyticsManager";

function Register() {
  const [error, setError] = useState("");
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const secondPasswordRef = useRef();

  const nextInput = (e, field) => {
    if (e.keyCode === 13) {
      switch (field) {
        case "username":
          emailRef.current.focus();
          break;
        case "email":
          passwordRef.current.focus();
          break;
        case "password":
          secondPasswordRef.current.focus();
          break;
        case "secondPassword":
          createAcount();
          break;
      }
    }
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const createAcount = async () => {
    let postUserObj = {
      name: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      is_admin: false,
      created_at: new Date().toISOString().slice(0, 10),
      upload_at: new Date().toISOString().slice(0, 10),
    };
    if (
      postUserObj.name !== "" &&
      postUserObj.email !== "" &&
      postUserObj.password !== "" &&
      postUserObj.secondPassword !== ""
    ) {
      if (passwordRef.current.value === secondPasswordRef.current.value) {
        const res = await axios.post("/api/register", postUserObj);
        if (res.data.name) {
          newRegister(usernameRef.current.value);
          window.location = "/";
        } else {
          if (res.data.split("_")[1] === "DUP") {
            setError("email already exists");
          } else if (res.data.split("/")[1] === "^([^0-9]*)$") {
            setError("Your user name can't contain numbers");
          } else {
            setError(res.data);
          }
        }
      } else {
        setError("password and confirm password are not the same");
      }
    } else {
      setError("you must fill in all the details");
    }
  };

  return (
    <>
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          fixed="top"
        >
          <Navbar.Brand>
            <img src={logo} alt="logo" width="100" height="50" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav></Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="login">
        <h3>Register Here</h3>
        <input
          className="loginInput"
          placeholder="user name"
          ref={usernameRef}
          onKeyUp={(e) => nextInput(e, "username")}
        />
        <br />
        <input
          className="loginInput"
          placeholder="email"
          type="email"
          ref={emailRef}
          onKeyUp={(e) => nextInput(e, "email")}
        />
        <br />
        <input
          className="loginInput"
          placeholder="password"
          type="password"
          ref={passwordRef}
          onKeyUp={(e) => nextInput(e, "password")}
        />
        <br />
        <input
          className="loginInput"
          placeholder="Confirm password"
          type="password"
          ref={secondPasswordRef}
          onKeyUp={(e) => nextInput(e, "secondPassword")}
        />
        <br />
        <Button variant="dark" onClick={createAcount}>
          Create new account
        </Button>
        <br />
        <Link to="/">Already have account - Sign in</Link>
        {error ? <div style={{ color: "red" }}>*{error}</div> : null}
      </div>
    </>
  );
}

export default Register;