import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";


import api from "../../../services/api";
import { cliente } from "../../../models/model";
import "./styles.css";


export default class Cadastrar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            nome: '',
            endereco: '',
            numero: 0,
            cidade: '',
            bairro: '',
            cep: '',
            obs: ''
        }
    };


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
        this.setState({ [name]: event.target.value }, () => {
            cliente[name] = this.state[name];

        });

    };


    render() {
        return (
            <div className="div-cad-clientes">
                <div className="div-clientes">
                    <form className='form-cad-clientes' autoComplete="off" onSubmit={this.handleSubmit}>

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
                        <br />
                        <TextField
                            id="cep"
                            label="Cep"
                            margin="normal"
                            onChange={this.handleChangeText("cep")}

                        />
                        <br />
                        <br />
                        <TextField
                            id="obs"
                            label="Observações"
                            margin="normal"
                            onChange={this.handleChangeText("obs")}
                            required
                        />

                        <p />
                        <Button variant="contained" color="primary" type="submit" className="btn-salvar">
                            Salvar
                    </Button>
                    </form>
                </div>
                <div className="div-clientes">
                    Dashboard2
            </div>
            </div>);
    }
}
