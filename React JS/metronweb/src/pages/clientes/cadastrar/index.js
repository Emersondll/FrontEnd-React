import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

import api from "../../../services/api";
import { cliente } from "../../../models/model";
import "./styles.css";

export default class cadastrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nome: "",
      endereco: "",
      numero: 0,
      cidade: "Araraquara",
      bairro: "",
      telefone: "",
      obs: ""
    };
  }

  handleSubmit = event => {
    this.handleApi();
  };

  handleApi = async event => {
    await api
      .post("/cliente", cliente)
      .then(function (response) {
        alert("Cadastro realizado com Sucesso do Cliente");
      })
      .catch(function (error) {
        alert(
          "Erro ao realizar o Cadastro.\n Procure o administrador " + error
        );
      });
  };

  handleChangeText = name => event => {
    this.setState({ [name]: event.target.value.toUpperCase() }, () => {
      cliente[name] = this.state[name];
    });
  };

  render() {
    return (
      <div className="div-cad-clientes">
        <div className="div-clientes">
          <form
            className="form-cad-clientes"
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <TextField
              id="nome"
              label="Nome Cliente"
              margin="normal"
              onChange={this.handleChangeText("nome")}
              required
            />
            <br />
            <TextField
              id="endereco"
              label="Endereço"
              margin="normal"
              onChange={this.handleChangeText("endereco")}
              required
              fullWidth
            />
            <br />
            <TextField
              id="numero"
              label="Número"
              margin="normal"
              onChange={this.handleChangeText("numero")}
              required
              type="number"
            />
            <br />
            <TextField
              id="cidade"
              label="Cidade"
              margin="normal"
              onChange={this.handleChangeText("cidade")}
              defaultValue={this.state.cidade}
              required
            />
            <br />
            <TextField
              id="bairro"
              label="Bairro"
              margin="normal"
              onChange={this.handleChangeText("bairro")}
              required
            />
            <br />
            <TextField
              id="telefone"
              label="Telefone"
              margin="normal"
              required
              type="number"
              onChange={this.handleChangeText("telefone")}
            />
            <br />
            <TextField
              id="email"
              label="Email"
              margin="normal"
              onChange={this.handleChangeText("email")}
              required
            />
            <p />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="btn-salvar"
            >
              Salvar
            </Button>
          </form>
        </div>
        <div className="div-clientes">Dashboard2</div>
      </div>
    );
  }
}
