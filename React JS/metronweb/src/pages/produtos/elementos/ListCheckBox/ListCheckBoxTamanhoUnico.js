import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMore from '@material-ui/icons/ExpandMore';

import CheckboxTamanhoUnico from "../../elementos/checkBox/checkboxTamanhoUnico";

export default class ListCheckBoxTamanhoUnico extends Component {
  render() {
    return (
      <div className="painelBebe">
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
            <Typography className="TypographyBebe">
              Selecione Tamanho Único
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CheckboxTamanhoUnico />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
