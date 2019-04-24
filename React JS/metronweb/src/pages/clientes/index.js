import React, { Component } from "react";
import Head from "../../header";
import Foot from "../../footer";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Cadastrar from './cadastrar/index';
import Listar from './listar/index';


function TabContainer(props) {
  return props.children;
}

export default class Clientes extends Component {

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
      <div className='clientes'>
        <Head />
        <div className="tab-clientes">
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChangeTab}>
              <Tab label="Listar Clientes" />
              <Tab label="Cadastrar Clientes" />
            </Tabs>
          </AppBar>

          {value === 0 && (
            <TabContainer>
              <div className="list-clientes">
                <Listar />
              </div>
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <div className="cad-clientes">
                <Cadastrar />
              </div>
            </TabContainer>
          )}
        </div>
        <br />
        <Foot />
      </div>
    );
  }
}
