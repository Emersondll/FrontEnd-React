import React, { Component } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { tamanho } from "../../../../models/model";

export default class CheckboxTamanhoUnico extends Component {
  state = {
    tu: false
  };

  handleChangeChecked = name => event => {
    this.setState({ [name]: event.target.checked }, () => {
      tamanho[name] = this.state[name];
    });
  };

  render() {
    return (
      <div>
        <FormGroup row required>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.tu}
                onChange={this.handleChangeChecked("tu")}
                value="Tamanho Unico"
              />
            }
            label="Tamanho Unico"
          />
        </FormGroup>
      </div>
    );
  }
}
