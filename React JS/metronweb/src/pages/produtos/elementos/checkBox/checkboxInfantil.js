import React, { Component } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { tamanho } from "../../../../models/model";

export default class CheckboxInfantil extends Component {
  state = {
    t1: false,
    t2: false,
    t3: false,
    t4: false,
    t5: false,
    t6: false,
    t7: false,
    t8: false,
    t9: false,
    t10: false
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
                checked={this.state.t1}
                onChange={this.handleChangeChecked("t1")}
                value="Tamanho 1"
              />
            }
            label="Tamanho 1"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.t2}
                onChange={this.handleChangeChecked("t2")}
                value="Tamanho 2"
              />
            }
            label="Tamanho 2"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.t3}
                onChange={this.handleChangeChecked("t3")}
                value="Tamanho 3"
              />
            }
            label="Tamanho 3"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.t4}
                onChange={this.handleChangeChecked("t4")}
                value="Tamanho 4"
              />
            }
            label="Tamanho 4"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.t5}
                onChange={this.handleChangeChecked("t5")}
                value="Tamanho 5"
              />
            }
            label="Tamanho 5"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.t6}
                onChange={this.handleChangeChecked("t6")}
                value="Tamanho 6"
              />
            }
            label="Tamanho 6"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.t7}
                onChange={this.handleChangeChecked("t7")}
                value="Tamanho 7"
              />
            }
            label="Tamanho 7"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.t8}
                onChange={this.handleChangeChecked("t8")}
                value="Tamanho 8"
              />
            }
            label="Tamanho 8"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.t10}
                onChange={this.handleChangeChecked("t10")}
                value="Tamanho 10"
              />
            }
            label="Tamanho 10"
          />
        </FormGroup>
      </div>
    );
  }
}
