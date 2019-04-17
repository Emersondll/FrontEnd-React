import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import { CSVLink } from "react-csv";
import Assignment from '@material-ui/icons/GetApp';

import api from "../../../../services/api.js";
import EditProduto from "./editProduto";
import { produto } from "../../../../models/model";
import './styles.css';

export default class listProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masculino: '',
      feminino: '',
      unissex: '',
      arrayList: [],
      carregamento: false,
      filter: "",
      filterDate: "",
      open: false,

    };
  }

  async componentDidMount() {
    // carrega os elementos quando a tela o metodo render é concluido
    const response = await api.get("/produtos");
    this.setState({ arrayList: response.data });
  }

  handleChangeText = name => event => {
    this.setState({ [name]: event.target.value }, () => { });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked }, () => { });


  };

  handleSubmit = event => {
    event.preventDefault();
    this.handleSearch();
  };

  async handleSearch() {
    let filter = this.state.filter;
    let genero = null;
    let  responsefilter;

    if (this.state.masculino) {
      genero = "Masculino";
    }
    if (this.state.feminino) {
      if (genero !== null) {
        genero = genero + ",Feminino";
      }
      else {
        genero = "Feminino";
      }

    } if (this.state.unissex) {
      if (genero !== null) {
        genero = genero + ",Unissex";
      }
      else {
        genero = "Unissex";
      }

    }
    if (genero === null) {
      genero = "Masculino,Feminino,Unissex";
    }

    console.log(filter + "  e ai");

    /* Validar qual Endpoint chamar*/

    if (filter === "") {
      responsefilter = await api.get(`/produtos/type/${genero}`);
    }

    else  {
      responsefilter = await api.get(`/produtos/${filter}/${genero}`);
    }
    

    this.setState({ arrayList: responsefilter.data });

  }

  handleSubmitDate = event => {
    event.preventDefault();
    this.handleSearchDate();
  };

  async handleSearchDate() {
    let filter = this.state.filterDate;
    const responsefilter = await api.get(`/produtosDate/${filter}`);
    this.setState({ arrayList: responsefilter.data });

  }


  handleEdit(arrayListProdutos) {
    produto.categoria = arrayListProdutos.categoria;
    produto.codigo = arrayListProdutos.codigo;
    produto.custo = arrayListProdutos.custo;
    produto.estacao = arrayListProdutos.estacao;
    produto.produto = arrayListProdutos.produto;
    produto.promocao = arrayListProdutos.promocao;
    produto.quantidade = arrayListProdutos.quantidade;
    produto.tamanho = arrayListProdutos.tamanho;
    produto.tipo = arrayListProdutos.tipo;
    produto.venda = arrayListProdutos.venda;
    produto.id = arrayListProdutos.id;
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
        <div className="dialog">
          <Dialog open={this.state.open} onClose={this.handleClose}>
            <EditProduto dialogOpen={this.state} />
          </Dialog>
        </div>

        <Paper className="paper">
          <div className='divformfilter'>
            <form className="formFilter" onSubmit={this.handleSubmit}>
              <TextField
                id="filter"
                label="Tamanho ou codigo"
                type="search"
                className="FiltroTexteField"
                onChange={this.handleChangeText("filter")}
                margin="normal"
              />
              <IconButton aria-label="Filter list" type="submit">
                <SearchIcon />
              </IconButton>
            </form>
            <div className='divCheckBox'>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.masculino}
                      onChange={this.handleChange('masculino')}
                      value="masculino"
                      color="primary"
                    />
                  }
                  label="Masculino"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.feminino}
                      onChange={this.handleChange('feminino')}
                      value="feminino"
                      color="primary"
                    />
                  }
                  label="Feminino"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.unissex}
                      onChange={this.handleChange('unissex')}
                      value="unissex"
                      color="primary"
                    />
                  }
                  label="Unissex"
                />
              </FormGroup>

            </div>

            <form className="formFilterDate" onSubmit={this.handleSubmitDate}>
              <TextField
                id="filterDate"
                label="Data"
                type="search"
                className="FiltroTexteFieldDate"
                onChange={this.handleChangeText("filterDate")}
                margin="normal"
              />
              <IconButton aria-label="Filter list" type="submit">
                <SearchIcon />
              </IconButton>
            </form>


            <CSVLink data={this.state.arrayList}><Assignment /></CSVLink>
          </div>

          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell>Editar</TableCell>
                <TableCell>Código</TableCell>
                <TableCell align="right">Produto</TableCell>
                <TableCell align="right">Tipo</TableCell>
                <TableCell align="right">Estação</TableCell>
                <TableCell align="right">Categoria</TableCell>
                <TableCell align="right">Custo</TableCell>
                <TableCell align="right">Venda</TableCell>
                <TableCell align="right">Promoção</TableCell>
                <TableCell align="right">Quantidade</TableCell>
                <TableCell align="right">Tamanho</TableCell>
                <TableCell align="right">Data de Cadastro</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.arrayList.map(arrayListProdutos => (
                <TableRow key={arrayListProdutos.id}>
                  <TableCell component="th" scope="row">
                    <IconButton
                      onClick={() => this.handleEdit(arrayListProdutos)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {arrayListProdutos.codigo}
                  </TableCell>
                  <TableCell align="right">
                    {arrayListProdutos.produto}
                  </TableCell>
                  <TableCell align="right">{arrayListProdutos.tipo}</TableCell>
                  <TableCell align="right">
                    {arrayListProdutos.estacao}
                  </TableCell>
                  <TableCell align="right">
                    {arrayListProdutos.categoria}
                  </TableCell>
                  <TableCell align="right">{arrayListProdutos.custo}</TableCell>
                  <TableCell align="right">{arrayListProdutos.venda}</TableCell>
                  <TableCell align="right">
                    {arrayListProdutos.promocao}
                  </TableCell>
                  <TableCell align="right">
                    {arrayListProdutos.quantidade}
                  </TableCell>
                  <TableCell align="right">
                    {arrayListProdutos.tamanho}
                  </TableCell>
                  <TableCell align="right">{arrayListProdutos.dataCadastro}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
