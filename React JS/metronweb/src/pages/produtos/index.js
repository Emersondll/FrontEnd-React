import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Button } from "@material-ui/core";

import Head from "../../header";
import Foot from "../../footer";
import "./styles.css";
import ListCheckBoxBebe from "./elementos/ListCheckBox/ListCheckBoxBebe";
import ListCheckBoxInfantil from "./elementos/ListCheckBox/ListCheckBoxInfantil";
import ListCheckBoxJuvenil from "./elementos/ListCheckBox/ListCheckBoxJuvenil";
import ListCheckBoxTamanhoUnico from "./elementos/ListCheckBox/ListCheckBoxTamanhoUnico";
import Categorias from "./elementos/categorias/categorias";
import Estacao from "./elementos/estacao/estacao";
import Tipo from "./elementos/tipo/tipo";
import { produto, tamanho } from "../../models/model";
import api from "../../services/api";
import ListProdutos from "./elementos/listProdutos/listProdutos"

function TabContainer(props) {
  return props.children;
}

export default class Produtos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantidade: 1,
      value: 0,
      codigo: "",
      produto: "",
      custo: 0,
      promocao: 0,
      venda: 0
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.handleApi();
  };

  handleApi = async event => {
    await api
      .post("/produto", { produto, tamanho })
      .then(function(response) {
        alert("Cadastro realizado com Sucesso do Produto");
      })
      .catch(function(error) {
        alert(
          "Erro ao realizar o Cadastro.\n Procure o administrador " + error
        );
      });
  };

  handleChangeText = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      produto[name] = this.state[name];
    });
  };

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div className="produtos">
        <Head />

        <div className="tab-produtos">
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChangeTab}>
              <Tab label="Listar Produtos" />
              <Tab label="Cadastrar Produto" />
            </Tabs>
          </AppBar>

          {value === 0 && (
            <TabContainer>
              <div className="list-produtos">
              <ListProdutos />
              </div>
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer className="tab-container-cad-prod">
              <div className="div-cad-produtos">
                <div className="div-produtos">
                  <form
                    className="form-produtos"
                    autoComplete="off"
                    onSubmit={this.handleSubmit}
                  >
                    <TextField
                      id="codigo"
                      label="Sigla Marca (EX: KK)"
                      margin="normal"
                      onChange={this.handleChangeText("codigo")}
                      required
                    />
                    <br />
                    <TextField
                      id="produto"
                      label="Produto"
                      onChange={this.handleChangeText("produto")}
                      margin="normal"
                      required
                      fullWidth
                    />

                    <ListCheckBoxBebe />
                    <ListCheckBoxInfantil />
                    <ListCheckBoxJuvenil />
                    <ListCheckBoxTamanhoUnico />
                    <Tipo />
                    <Estacao />
                    <Categorias />

                    <TextField
                      id="custo"
                      label="Preço de Custo"
                      margin="normal"
                      onChange={this.handleChangeText("custo")}
                      required
                    />
                    <br />
                    <TextField
                      id="promocao"
                      label="Valor de Promoção"
                      margin="normal"
                      onChange={this.handleChangeText("promocao")}
                    />
                    <br />
                    <TextField
                      id="valorVenda"
                      label="Valor Venda"
                      margin="normal"
                      onChange={this.handleChangeText("venda")}
                      required
                    />
                    <br />
                    <TextField
                      id="quantidade"
                      type="number"
                      defaultValue={this.state.quantidade}
                      onChange={this.handleChangeText("quantidade")}
                      label="Quantidade"
                      margin="normal"
                      required
                    />
                    <p />
                    <Button variant="contained" color="primary" type="submit">
                      Salvar
                    </Button>
                  </form>
                </div>
                <div className="estatistica">
                
                Dasboard
                
                </div>
              </div>
            </TabContainer>
          )}
        </div>
        <Foot />
      </div>
    );
  }
}
