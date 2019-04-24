import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Head from "../../header";
import Foot from "../../footer";
import ListProdutosVenda from "../vendas/ListProduto/index"

function TabContainer(props) {
  return props.children;
}

export default class Vendas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div className="vendas">
        <Head />
        <div className="tab-clientes">
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChangeTab}>
              <Tab label="Listar Vendas" />
              <Tab label="Listar Produtos Disponíveis" />
              <Tab label="Listar Reservados" />
              <Tab label="Listar Histórico" />
            </Tabs>
          </AppBar>

          {value === 0 && (
            <TabContainer>
              <div className="list-sales">Listar Vendas</div>
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <div className="list-products"> <ListProdutosVenda /> </div>
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <div className="list-products">Listar Reservados</div>
            </TabContainer>
          )}
          {value === 3 && (
            <TabContainer>
              <div className="list-products">Listar Histórico</div>
            </TabContainer>
          )}
        </div>
        <br />
        <Foot />
      </div>
    );
  }
}
