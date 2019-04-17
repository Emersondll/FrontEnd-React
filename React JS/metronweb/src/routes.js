import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./main";
import Produtos from "./pages/produtos";
import Clientes from "./pages/clientes";
import Vendas from "./pages/vendas";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/produtos" component={Produtos} />
      <Route path="/clientes" component={Clientes} />
      <Route path="/vendas" component={Vendas} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
