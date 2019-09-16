import React, { Component } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";

import { cliente } from "../../../models/model";
import api from "../../../services/api";
import "./styles.css";

export default class editar extends Component {
  handleClose = async event => {
    await api
      .delete(`/cliente/${cliente.id}`)
      .then(function (response) {
        alert("Cliente Removido com Sucesso!");
      })
      .catch(function (error) {
        alert("Erro de Exclusão.\n Procure o administrador: " + error);
      });
  };

  handleEdit = async event => {
    await api
      .put("/cliente", cliente)
      .then(function (response) {
        alert("Atualizado com Sucesso o Cliente!");
      })
      .catch(function (error) {
        alert("Erro ao Atualizar.\n Procure o administrador: " + error);
      });
  };

  handleChangeText = name => event => {
    this.setState({ [name]: event.target.value.toUpperCase() }, () => {
      cliente[name] = this.state[name];
    });
  };

  render() {
    return (
      <div>
        <form className="formEdit">
          <DialogContent>
            <TextField
              id="nome"
              label="Nome"
              margin="normal"
              defaultValue={cliente.nome}
              onChange={this.handleChangeText("nome")}
              required
            />

            <TextField
              id="endereco"
              label="Endereco"
              onChange={this.handleChangeText("endereco")}
              margin="normal"
              defaultValue={cliente.endereco}
              fullWidth
              required
            />

            <TextField
              id="numero"
              label="Número"
              margin="normal"
              type="number"
              onChange={this.handleChangeText("numero")}
              defaultValue={cliente.numero}
              required
            />
            <br />
            <TextField
              id="cidade"
              label="Cidade"
              margin="normal"
              onChange={this.handleChangeText("cidade")}
              defaultValue={cliente.cidade}
              required
            />
            <br />
            <TextField
              id="bairro"
              label="Bairro"
              margin="normal"
              onChange={this.handleChangeText("bairro")}
              defaultValue={cliente.bairro}
              required
            />
            <br />
            <TextField
              id="telefone"
              onChange={this.handleChangeText("telefone")}
              label="Telefone"
              margin="normal"
              defaultValue={cliente.telefone}
              type="number"
              required
            />
            <br />
            <TextField
              id="email"
              onChange={this.handleChangeText("email")}
              label="Email:"
              margin="normal"
              defaultValue={cliente.email}
              required
            />
          </DialogContent>
          <div className="divButonsDialog">
            <IconButton onClick={() => this.handleEdit()}>
              <SaveIcon />
            </IconButton>

            <IconButton onClick={() => this.handleClose()}>
              <DeleteIcon />
            </IconButton>
          </div>
        </form>
      </div>
    );
  }
}
