import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Money from "@material-ui/icons/AttachMoney";
import React, { Component } from "react";
import { formasPagamento, recebimento } from "../../../models/model";
import api from "../../../services/api.js";
import "./styles.css";

export default class PagamentosRecebidos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nomes: [],
            formasPg: "",
            valor: "",
            value: "",
            open: false,
            nome: "",
            nomeCliente: "",
            idClient: "",

        };
    }

    async componentDidMount() {
        const responseClient = await api.get("/clientes");
        this.setState({ nomes: responseClient.data });
    }

    handleApi = async event => {
        await api
            .post("/PagamentosRecebidos", recebimento)
            .then(function (response) {
                alert("Registro de Pagamento realizado com Sucesso do Produto");
            })
            .catch(function (error) {
                alert(
                    "Erro ao realizar o Registro.\n Procure o administrador " + error
                );
            });
    };

    handleChangeText = name => event => {
        this.setState({ [name]: event.target.value }, () => { });
    };

    handleChangeTextClient = name => event => {
        this.setState({ [name]: event.target.value }, () => { });
        let auxiliar;
        auxiliar = event.target.value.split("-");
        this.setState({ nomeCliente: auxiliar[0] }, () => { });
        this.setState({ idClient: auxiliar[1] }, () => { });
    };


    handleSubmit = event => {
        event.preventDefault();
        let today = new Date();
        recebimento.dataRecebimento = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        recebimento.formaPagamento = this.state.formasPg;
        recebimento.idCliente = this.state.idClient;
        recebimento.nomeCliente = this.state.nomeCliente;
        recebimento.valor = this.state.valor;
        this.handleApi();
    };


    render() {
        return (
            <div>

                <div className="submited">
                    <form className="formSubmit" onSubmit={this.handleSubmit}>
                        <IconButton aria-label="Filter list" type="submit">
                            <Money />
                        </IconButton>
                    </form>
                </div>

                <div className="divMain">

                    <TextField
                        id="valorVenda"
                        label="Valor Venda"
                        margin="normal"
                        type="number"
                        onChange={this.handleChangeText("valor")}
                        required
                    />

                    <TextField
                        className="formasPg"
                        id="formasPg"
                        required
                        select
                        label="Formas de Pagamento"
                        margin="normal"
                        value={this.state.formasPg}
                        onChange={this.handleChangeText("formasPg")}
                    >
                        {formasPagamento.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>

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

                </div>

            </div >
        );
    }
}
