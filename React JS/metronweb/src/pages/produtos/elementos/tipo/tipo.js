import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "./styles.css";
import { produto } from "../../../../models/model";

const tipos = [
  {
    value: "Masculino"
  },
  {
    value: "Feminino"
  },
  {
    value: "Unissex"
  }
];

export default class Tipo extends Component {
  state = {
    tipo: ""
  };

  handleChangeTipo = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      produto[name] = this.state[name];
    });
  };

  render() {
    return (
      <div className="tipo">
        <TextField
          className="tipotext"
          id="tipo"
          label="Tipo"
          required
          margin="normal"
          value={this.state.tipo}
          select
          onChange={this.handleChangeTipo("tipo")}
        >
          {tipos.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}
