import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { Favorite, ShoppingCart } from '@material-ui/icons';
import Assignment from "@material-ui/icons/GetApp";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import { CSVLink } from "react-csv";
import { cliente, produto, venda } from "../../../models/model";
import api from "../../../services/api.js";
import "./styles.css";


export default class listProdutosVenda extends Component {
  constructor(props) {
    super(props);
    const today = new Date(),
      date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    const todayH = new Date(),
      hour = todayH.getHours() + ':' + todayH.getMinutes();

    this.state = {
      masculino: "",
      feminino: "",
      unissex: "",
      arrayList: [],
      nomes: [],
      carregamento: false,
      filter: "",
      filterDate: "",
      open: false,
      nome: "",
      idClient: "",
      date: date,
      hours: hour,

    };
  }

  async componentDidMount() {
    // carrega os elementos quando a tela o metodo render é concluido
    const response = await api.get("/produtoDisponivel");
    this.setState({ arrayList: response.data });

    const responseClient = await api.get("/clientes");
    this.setState({ nomes: responseClient.data });
  }

  handleChangeText = name => event => {
    this.setState({ [name]: event.target.value }, () => { });
  };

  handleChangeTextClient = name => event => {
    this.setState({ [name]: event.target.value }, () => { });
    let auxiliar;
    auxiliar = event.target.value.split("-");
    cliente.nome = auxiliar[0];
    cliente.id = auxiliar[1];
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
    let responsefilter;

    if (this.state.masculino) {
      genero = "Masculino";
    }
    if (this.state.feminino) {
      if (genero !== null) {
        genero = genero + ",Feminino";
      } else {
        genero = "Feminino";
      }
    }
    if (this.state.unissex) {
      if (genero !== null) {
        genero = genero + ",Unissex";
      } else {
        genero = "Unissex";
      }
    }
    if (genero === null) {
      genero = "Masculino,Feminino,Unissex";
    }

    /* Validar qual Endpoint chamar*/
    if (filter === "") {

      responsefilter = await api.get(`/produtoDisponivel/type/${genero}`);
    } else {

      responsefilter = await api.get(`/produtoDisponivel/${filter}/${genero}`);
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


  handleReserv = async event => {
    if (this.state.nome !== "") {
      await api
        .post("/venda", venda)
        .then(function (response) {
          alert("Produto Reservado!");

        })
        .catch(function (error) {
          alert("Erro ao Reservar.\n Procure o administrador: " + error);
        });
    } else {
      alert("Cliente Não Selecionado");
    }
  };

  setReserv(arrayListProdutos) {
    let today = new Date();
    venda.idProduto = arrayListProdutos.id;
    venda.codigoProduto = arrayListProdutos.codigo;
    venda.nomeProduto = arrayListProdutos.produto;
    venda.categoria = arrayListProdutos.categoria;
    venda.custo = arrayListProdutos.custo;
    venda.promocao = arrayListProdutos.promocao;
    if (arrayListProdutos.promocao !== 0 && arrayListProdutos.promocao !== '' && arrayListProdutos.promocao !== '0' && arrayListProdutos.promocao !== null) {
      venda.venda = arrayListProdutos.promocao;
    } else {
      venda.venda = arrayListProdutos.venda;
    }

    venda.quantidade = 1;//arrayListProdutos.quantidade;
    venda.tamanho = arrayListProdutos.tamanho;
    venda.idCliente = cliente.id;
    venda.nomeCliente = cliente.nome;
    venda.motivo = 'Reservado';
    venda.dataAtualizacao = this.state.date;
    venda.idClienteData = cliente.id.concat(today.getDate()).concat(today.getMonth() + 1).concat(today.getFullYear());
    this.handleReserv();
  }

  setSales(arrayListProdutos) {
    // Produto
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
    // Venda
    let today = new Date();
    venda.idProduto = arrayListProdutos.id;
    venda.codigoProduto = arrayListProdutos.codigo;
    venda.nomeProduto = arrayListProdutos.produto;
    venda.categoria = arrayListProdutos.categoria;
    venda.custo = arrayListProdutos.custo;
    venda.promocao = arrayListProdutos.promocao;
    if (arrayListProdutos.promocao !== 0 && arrayListProdutos.promocao !== '' && arrayListProdutos.promocao !== '0' && arrayListProdutos.promocao !== null) {
      venda.venda = arrayListProdutos.promocao;
    } else {
      venda.venda = arrayListProdutos.venda;
    }

    venda.quantidade = 1;//arrayListProdutos.quantidade;
    venda.tamanho = arrayListProdutos.tamanho;
    venda.idCliente = cliente.id;
    venda.nomeCliente = cliente.nome;
    venda.motivo = 'Venda';
    venda.dataAtualizacao = this.state.date;
    venda.idClienteData = cliente.id.concat(today.getDate()).concat(today.getMonth() + 1).concat(today.getFullYear());
    this.handleSales();

  }

  handleSales = async event => {

    if (this.state.nome !== "") {

      await api
        .post("/venda", venda)
        .then(function (response) {
          alert("Produto Vendido!");
          --produto.quantidade;

          api
            .put("/produto", produto)
            .then(function (response) {
              alert("Atualizado com Sucesso o Produto!");
            })
            .catch(function (error) {
              alert("Erro ao Atualizar após a venda.\n Procure o administrador: " + error);
            });

        })
        .catch(function (error) {
          alert("Erro ao Vender.\n Procure o administrador: " + error);
        });
    } else {
      alert("Cliente Não Selecionado");
    }
  };


  render() {
    return (
      <div>

        <Paper className="paper">
          <div className="divformfilter">
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
            <div className="divCheckBox">
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.masculino}
                      onChange={this.handleChange("masculino")}
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
                      onChange={this.handleChange("feminino")}
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
                      onChange={this.handleChange("unissex")}
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

            <TextField
              className="textListClient"
              id="nome"
              label="Nome Cliente"
              required
              margin="normal"
              value={this.state.nome}
              select
              onChange={this.handleChangeTextClient("nome")}
            >
              {this.state.nomes.map(arraylistClient => (
                <MenuItem
                  key={arraylistClient.nome}
                  value={arraylistClient.nome + "-" + arraylistClient.id}
                >
                  {arraylistClient.nome}
                </MenuItem>
              ))}
            </TextField>

            <CSVLink
              data={this.state.arrayList}
              filename={'Lista de Produtos Disponiveis_' + this.state.date + "--" + this.state.hours + '.csv'}
              separator={";"} >
              <Assignment />
            </CSVLink>
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
                  <TableCell >
                    <IconButton
                      onClick={() => this.setSales(arrayListProdutos)}
                    >
                      <ShoppingCart />
                    </IconButton>

                    <IconButton
                      onClick={() => this.setReserv(arrayListProdutos)}
                    >
                      <Favorite />
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
                  <TableCell align="right">
                    {arrayListProdutos.dataCadastro}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
