import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { Component } from "react";
import { CSVLink } from "react-csv";
import Assignment from "@material-ui/icons/GetApp";

import { aux } from "../../../models/model";
import api from "../../../services/api.js";
import "./styles.css";

export default class ListReservados extends Component {
    constructor() {
        super();
        this.state = {
            reservado: false,
            vendido: false,
            arrayList: []

        };
    }

    async componentDidMount() {
        let response = await api.get("/vendas");
        this.setState({ arrayList: response.data });

    }

    async filter() {
        let response;
        if (aux.reservado && (aux.vendido === false)) {
            response = await api.get("/vendasReserv");
        }
        else if (aux.vendido && (aux.reservado === false)) {
            response = await api.get("/vendasSale");
        }
        else {
            response = await api.get("/vendas");
        }
        this.setState({ arrayList: response.data });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked }, () => {
            aux[name] = this.state[name];
            this.filter();
        });
    };

    render() {
        return (
            <div>
                <Paper className="paper">
                    <div className="divformfilter">

                        <div className="divCheckBox">
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.reservado}
                                            onChange={this.handleChange("reservado")}
                                            value="reservado"
                                            color="primary"
                                        />
                                    }
                                    label="Reservado"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.vendido}
                                            onChange={this.handleChange("vendido")}
                                            value="vendido"
                                            color="primary"
                                        />
                                    }
                                    label="Vendido"
                                />

                            </FormGroup>
                        </div>
                        <CSVLink data={this.state.arrayList}>
                            <Assignment />
                        </CSVLink>
                    </div>

                    <Table className="table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Cliente</TableCell>
                                <TableCell>Código</TableCell>
                                <TableCell align="right">Produto</TableCell>
                                <TableCell align="right">Categoria</TableCell>
                                <TableCell align="right">Valor Venda</TableCell>
                                <TableCell align="right">Quantidade</TableCell>
                                <TableCell align="right">Tamanho</TableCell>
                                <TableCell align="right">Motivo</TableCell>
                                <TableCell align="right">Data</TableCell>
                                <TableCell align="right">ID Venda</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.arrayList.map(arrayListVendas => (
                                <TableRow key={arrayListVendas.id}>

                                    <TableCell align="right">
                                        {arrayListVendas.nomeCliente}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {arrayListVendas.codigoProduto}
                                    </TableCell>
                                    <TableCell align="right">
                                        {arrayListVendas.nomeProduto}
                                    </TableCell>
                                    <TableCell align="right">{arrayListVendas.categoria}</TableCell>
                                    <TableCell align="right">
                                        {arrayListVendas.venda}
                                    </TableCell>
                                    <TableCell align="right">
                                        {arrayListVendas.quantidade}
                                    </TableCell>
                                    <TableCell align="right">{arrayListVendas.tamanho}</TableCell>

                                    <TableCell align="right">
                                        {arrayListVendas.motivo}
                                    </TableCell>
                                    <TableCell align="right">
                                        {arrayListVendas.dataAtualizacao}
                                    </TableCell>
                                    <TableCell align="right">
                                        {arrayListVendas.idClienteData}
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
