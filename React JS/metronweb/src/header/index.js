import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "./styles.css";
import { Link } from "react-router-dom";
import Home from '@material-ui/icons/Home';


function SimpleAppBar() {
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <div className="div-menu">
            <Link to="/">
              <Home/>
            </Link>
            <Link to="/produtos">Produtos</Link>
            <Link to="/clientes">Clientes</Link>
            <Link to="/vendas">Vendas</Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default SimpleAppBar;
