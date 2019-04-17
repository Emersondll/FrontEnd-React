import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "./styles.css";
import { produto } from "../../../../models/model";

const estacoes = [
  {
    value: "Verão"
  },
  {
    value: "Meia Estação"
  },
  {
    value: "Inverno"
  }
];

export default class Estacao extends Component {
  state = {
    estacao: ""
  };
  //https://translate.googleusercontent.com/translate_c?depth=1&hl=pt-BR&rurl=translate.google.com.br&sl=en&sp=nmt4&tl=pt-BR&u=https://stackoverflow.com/questions/41278385/setstate-doesnt-update-the-state-immediately/41278440&xid=17259,15700023,15700186,15700191,15700248,15700253&usg=ALkJrhg40SwBDLmWmG0gfMWDN4YlEkQ8jQ#41278440
  handleChangeEstacao = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      produto[name] = this.state[name];
    });
  };

  render() {
    return (
      <div className="estacao">
        <TextField
          className="estacaotext"
          id="estacao"
          select
          label="Estação"
          margin="normal"
          value={this.state.estacao}
          onChange={this.handleChangeEstacao("estacao")}
        >
          {estacoes.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}
