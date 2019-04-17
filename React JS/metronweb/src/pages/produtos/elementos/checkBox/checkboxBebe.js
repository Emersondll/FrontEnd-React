import React, { Component } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { tamanho } from "../../../../models/model";

export default class CheckboxBebe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trn: false,
      tpp: false,
      tp: false,
      tm: false,
      tg: false,
      tgg: false
    };
  }

  handleChangeChecked = name => event => {
    this.setState({ [name]: event.target.checked }, () => {
      tamanho[name] = this.state[name];
    });
  };

  render() {
    return (
      <div className="CheckBoxBebe">
        <FormGroup row required>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.trn}
                onChange={this.handleChangeChecked("trn")}
                value="RN"
              />
            }
            label="RN"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.tpp}
                onChange={this.handleChangeChecked("tpp")}
                value="PP"
              />
            }
            label="PP"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.tp}
                onChange={this.handleChangeChecked("tp")}
                value="P"
              />
            }
            label="P"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.tm}
                onChange={this.handleChangeChecked("tm")}
                value="M"
              />
            }
            label="M"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.tg}
                onChange={this.handleChangeChecked("tg")}
                value="G"
              />
            }
            label="G"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.tgg}
                onChange={this.handleChangeChecked("tgg")}
                value="GG"
              />
            }
            label="GG"
          />
        </FormGroup>
      </div>
    );
  }
}
