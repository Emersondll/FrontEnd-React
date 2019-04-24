import DialogContent from "@material-ui/core/DialogContent";
import React, { Component } from "react";
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from '@material-ui/icons/Delete';

import { produto } from "../../../models/model";
import api from "../../../services/api";
import "./styles.css";

export default class editProduto extends Component {

  handleClose = async event => {
    await api
      .delete(`/produto/${produto.id}`)
      .then(function (response) {
        alert("Produto Removido com Sucesso!");
      })
      .catch(function (error) {
        alert("Erro de Exclusão.\n Procure o administrador: " + error);
      });
  };

  handleEdit = async event => {
    await api
      .put("/produto", produto)
      .then(function (response) {
        alert("Atualizado com Sucesso do Produto!");
      })
      .catch(function (error) {
        alert("Erro ao Atualizar.\n Procure o administrador: " + error);
      });
  };

  handleChangeText = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      produto[name] = this.state[name];
    });
  };

  render() {
    return (
      <div>
        <form className="formEdit">
          <DialogContent>
            <TextField
              id="codigo"
              label="Código"
              margin="normal"
              value={produto.codigo}
            />

            <TextField
              id="produto"
              label="Produto"
              onChange={this.handleChangeText("produto")}
              margin="normal"
              defaultValue={produto.produto}
              fullWidth
            />

            <TextField
              id="promocao"
              label="Valor de Promoção"
              margin="normal"
              onChange={this.handleChangeText("promocao")}
              defaultValue={produto.promocao}
            />
            <br />
            <TextField
              id="valorVenda"
              label="Valor Venda"
              margin="normal"
              onChange={this.handleChangeText("venda")}
              defaultValue={produto.venda}
            />
            <br />
            <TextField
              id="quantidade"
              type="number"
              onChange={this.handleChangeText("quantidade")}
              label="Quantidade"
              margin="normal"
              defaultValue={produto.quantidade}
            />
          </DialogContent>
          <div className='divButonsDialog'>
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
