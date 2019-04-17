import React, { Component } from "react";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMore from '@material-ui/icons/ExpandMore';

import CheckBoxBebe from "../../elementos/checkBox/checkboxBebe";

export default class ListCheckBoxBebe extends Component {
  render() {
    return (
      <div className="ListCheckBoxBebe">
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
            <Typography className="TypographyBebe">
              Selecione Tamanho Bebê
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CheckBoxBebe />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
