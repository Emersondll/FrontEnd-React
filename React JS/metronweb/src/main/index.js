import React, { Component } from "react";
import Logo from "../Image/Logo.jpeg";
import "./styles.css";
import Head from "../header"
import Foot from "../footer";

export default class Body extends Component {
  render() {
    
    return (
    <div>
      <Head/>
      <img src={Logo} alt="Home" className="home" />
      <Foot/>
      </div>);
  }
}
