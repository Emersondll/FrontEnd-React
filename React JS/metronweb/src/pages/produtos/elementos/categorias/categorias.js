import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "./styles.css";
import { produto } from "../../../../models/model";

const categorias = [
  {
    value: "Blusa de Frio"
  },
  {
    value: "Blusinha"
  },
  {
    value: "Calça de Moleton e Cotton"
  },
  {
    value: "Calça jeans"
  },
  {
    value: "Camiseta"
  },
  {
    value: "Conjunto"
  },
  {
    value: "Macaquinho"
  },
  {
    value: "Shorts e Bermudas"
  },
  {
    value: "Camisa"
  },
  {
    value: "Camisa Polo"
  },
  {
    value: "Saia"
  },
  {
    value: "Vestido"
  },
  {
    value: "Body"
  },
  {
    value: "Jardineira"
  },
  {
    value: "Macacão"
  },
  {
    value: "Pijama"
  },
  {
    value: "Laços"
  },
  {
    value: "Gravata"
  },
  {
    value: "Bones e Chápeus"
  },
  {
    value: "Toucas e Gorros"
  },
  {
    value: "Suspensórios e Cintos "
  },
  {
    value: "Meias"
  },
  {
    value: "Babadores"
  },
  {
    value: "Extensores de Body"
  },
  {
    value: "Mantas"
  },
  {
    value: "Sapatos"
  },
  {
    value: "Moda praia"
  }
];

export default class Categorias extends Component {
  state = {
    categoria: ""
  };

  handleChangeCategoria = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      produto[name] = this.state[name];
    });
  };

  render() {
    return (
      <div className="categoria">
          <TextField
            className="categoriatext"
            id="tipo"
            label="Categoria"
            required
            margin="normal"
            value={this.state.categoria}
            select
            onChange={this.handleChangeCategoria("categoria")}
          >
            {categorias.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
      </div>
    );
  }
}
