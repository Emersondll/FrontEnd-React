import React, { Component } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { tamanho } from "../../../../models/model";

export default class CheckboxJuvenil extends Component {
  state = {
    t12: false,
    t14: false,
    t16: false,
    t18: false
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
                checked={this.state.t12}
                onChange={this.handleChangeChecked("t12")}
                value="Tamanho 12"
              />
            }
            label="Tamanho 12"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.t14}
                onChange={this.handleChangeChecked("t14")}
                value="Tamanho 14"
              />
            }
            label="Tamanho 14"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.t16}
                onChange={this.handleChangeChecked("t16")}
                value="Tamanho 16"
              />
            }
            label="Tamanho 16"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.t18}
                onChange={this.handleChangeChecked("t18")}
                value="Tamanho 18"
              />
            }
            label="Tamanho 18"
          />
        </FormGroup>
      </div>
    );
  }
}
