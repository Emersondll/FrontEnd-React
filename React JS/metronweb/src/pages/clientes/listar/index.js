import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import { CSVLink } from "react-csv";
import Assignment from '@material-ui/icons/GetApp';

import api from "../../../services/api.js";
import { cliente } from "../../../models/model.js";
import EditCliente from "../editar/index";

export default class listar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayList: [],
      id: "",
      nome: "",
      endereco: "",
      numero: 0,
      cidade: "",
      bairro: "",
      telefone: "",
      email: "",
      open: false
    };
  }

  async componentDidMount() {
    const response = await api.get("/clientes");
    this.setState({ arrayList: response.data });
  }

  handleChangeText = name => event => {
    this.setState({ [name]: event.target.value }, () => { });
  };

  handleEdit(arrayListClientes) {
    cliente.id = arrayListClientes.id;
    cliente.nome = arrayListClientes.nome.toUpperCase();
    cliente.endereco = arrayListClientes.endereco.toUpperCase();
    cliente.numero = arrayListClientes.numero;
    cliente.cidade = arrayListClientes.cidade.toUpperCase();
    cliente.bairro = arrayListClientes.bairro.toUpperCase();
    cliente.telefone = arrayListClientes.telefone.toUpperCase();
    cliente.email = arrayListClientes.email.toUpperCase();
    this.handleClickOpen();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {/* ShowMoldal de Edição */}
        <div className="dialog">
          <Dialog open={this.state.open} onClose={this.handleClose}>
            <EditCliente dialogOpen={this.state} />
          </Dialog>
          <CSVLink data={this.state.arrayList}><Assignment /></CSVLink>
        </div>

        <Paper className="paper">
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell>Editar</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Endereço</TableCell>
                <TableCell align="right">Numero</TableCell>
                <TableCell align="right">Cidade</TableCell>
                <TableCell align="right">Bairro</TableCell>
                <TableCell align="right">Telefone</TableCell>
                <TableCell align="right">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.arrayList.map(arrayListClientes => (
                <TableRow key={arrayListClientes.id}>
                  <TableCell component="th" scope="row">
                    <IconButton
                      onClick={() => this.handleEdit(arrayListClientes)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">{arrayListClientes.nome}</TableCell>
                  <TableCell align="right">{arrayListClientes.endereco}</TableCell>
                  <TableCell align="right">{arrayListClientes.numero}</TableCell>
                  <TableCell align="right">{arrayListClientes.cidade}</TableCell>
                  <TableCell align="right">{arrayListClientes.bairro}</TableCell>
                  <TableCell align="right">{arrayListClientes.telefone}</TableCell>
                  <TableCell align="right">{arrayListClientes.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
