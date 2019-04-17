import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMore from '@material-ui/icons/ExpandMore';

import CheckboxJuvenil from "../../elementos/checkBox/checkboxJuvenil";

export default class ListCheckBoxJuvenil extends Component {
  render() {
    return (
      <div className="painelBebe">
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
            <Typography className="TypographyBebe">
              Selecione Tamanho Juvenil
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CheckboxJuvenil />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
