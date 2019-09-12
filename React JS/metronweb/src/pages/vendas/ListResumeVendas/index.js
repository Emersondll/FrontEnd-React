import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import api from "../../../services/api.js";
import "./styles.css";



export default class ListResumeVendas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayList: [],
            arrayListRecebimento: [],
            filter: "",
            SomaVenda: "",
            SomaRecebimento: "",
            Diferenca: ""

        };
    }

    handleSoma() {
        let t = 0;
        for (let i = 0; i < this.state.arrayList.length; i++) {
            t += parseFloat(this.state.arrayList[i].soma);
        }
        this.setState({ SomaVenda: t });
    }

    handleSomaRecebimento() {
        let t = 0;
        for (let i = 0; i < this.state.arrayListRecebimento.length; i++) {
            t += parseFloat(this.state.arrayListRecebimento[i].valor);
        }
        this.setState({ SomaRecebimento: t });
    }


    handleChangeText = name => event => {
        this.setState({
            [name]: event.target.value
        }, () => { });
    };

    async componentDidMount() {
        let response = await api.get("/vendasConsolidadas");
        this.setState({ arrayList: response.data });

        let responseRecebimento = await api.get("/PagamentosRecebidos");
        this.setState({ arrayListRecebimento: responseRecebimento.data });
    }


    handleSubmit = event => {

        event.preventDefault();
        this.setState({ SomaVenda: "" });
        this.setState({ SomaRecebimento: "" });
        this.setState({ Diferenca: "" });

        let filter = this.state.filter;
        if (filter.length > 1) {

            this.handleSearchSales();
            this.handleSearchReceiver();
        }
    };

    async handleSearchSales() {
        let filter = this.state.filter;
        let responsefilter;
        responsefilter = await api.get(`/vendasConsolidadasFilter/${filter}`);
        this.setState({ arrayList: responsefilter.data });
        this.handleSoma();
    }


    async handleSearchReceiver() {
        let filter = this.state.filter;
        let responsefilter;
        responsefilter = await api.get(`/PagamentosRecebidos/${filter}`);
        this.setState({ arrayListRecebimento: responsefilter.data });
        this.handleSomaRecebimento();
    }


    render() {
        return (
            <div className="divResumeSearch" >
                <div className="divResumeSearchHead" >
                    <div className="divResumeSearchVendas" >
                        <form className="formFilter"
                            onSubmit={this.handleSubmit} >
                            <TextField id="filter"
                                label="ID CLiente"
                                type="search"
                                className="FiltroTexteField"
                                onChange={this.handleChangeText("filter")}
                                margin="normal" />
                            <IconButton aria-label="Filter list" type="submit">
                                <SearchIcon />
                            </IconButton>
                        </form>
                    </div>

                    <div className="divCenter">

                        <TextField value={this.state.SomaVenda}
                            placeholder="Soma Venda"
                            label="Soma Venda"
                            className="SomaVenda"
                            disabled />

                        <TextField value={this.state.SomaRecebimento}
                            placeholder="Soma Recebimento"
                            label="Soma Recebimento"
                            className="SomaRecebimento"
                            disabled />

                        <TextField value={this.state.SomaVenda - this.state.SomaRecebimento}
                            placeholder="Diferença"
                            label="Diferença"
                            className="Diferenca"
                            disabled />

                    </div>


                </div>
                <div className="divMain" >

                    <div className="divResume">
                        <Table className="tableResume">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">ID CLiente</TableCell>
                                    <TableCell align="right">Nome Cliente</TableCell>
                                    <TableCell align="right">Soma do Valor de Venda</TableCell>
                                    <TableCell align="right">Data de Venda</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.arrayList.map(arrayListResume => (
                                    <TableRow key={arrayListResume.id}>
                                        <TableCell align="right">{arrayListResume.idCliente}</TableCell>
                                        <TableCell align="right">{arrayListResume.nome}</TableCell>
                                        <TableCell align="right">{arrayListResume.soma}</TableCell>
                                        <TableCell align="right">{arrayListResume.evento}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="divDashBoard">
                        <Table className="table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">ID CLiente</TableCell>
                                    <TableCell align="right">Nome Cliente</TableCell>
                                    <TableCell align="right">Valor Recebido</TableCell>
                                    <TableCell align="right">Data de Recebimento</TableCell>
                                    <TableCell align="right">Forma de Recebimento</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.arrayListRecebimento.map(arrayListRecebimento => (
                                    <TableRow key={arrayListRecebimento.id}>
                                        <TableCell align="right">{arrayListRecebimento.idCliente}</TableCell>
                                        <TableCell align="right">{arrayListRecebimento.nomeCliente}</TableCell>
                                        <TableCell align="right">{arrayListRecebimento.valor}</TableCell>
                                        <TableCell align="right">{arrayListRecebimento.dataRecebimento}</TableCell>
                                        <TableCell align="right">{arrayListRecebimento.formaPagamento}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div >
        );
    }
}