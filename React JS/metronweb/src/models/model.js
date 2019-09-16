export const produto = {
  codigo: "",
  produto: "",
  tipo: "",
  estacao: "",
  categoria: "",
  custo: 0,
  promocao: 0,
  venda: 0,
  quantidade: 1,
  tamanho: "",
  id: ''
};

export const tamanho = {
  trn: false,
  tpp: false,
  tp: false,
  tm: false,
  tg: false,
  tgg: false,
  t1: false,
  t2: false,
  t3: false,
  t4: false,
  t5: false,
  t6: false,
  t7: false,
  t8: false,
  t10: false,
  t12: false,
  t14: false,
  t16: false,
  t18: false,
  tu: false
};

export const cliente = {
  id: '',
  nome: '',
  endereco: '',
  numero: 0,
  cidade: 'ARARAQUARA',
  bairro: '',
  telefone: '',
  email: ''
};

export const venda = {
  idProduto: '',
  codigoProduto: '',
  nomeProduto: '',
  categoria: '',
  custo: '',
  promocao: '',
  venda: '',
  quantidade: '',
  tamanho: '',
  idCliente: '',
  nomeCliente: '',
  motivo: '',
  dataAtualizacao: '',
  idClienteData: ''
}

export const aux = {
  vendido: false,
  reservado: false
}

export const recebimento = {
  dataRecebimento: '',
  formaPagamento: '',
  idCliente: '',
  nomeCliente: '',
  valor: ''

}

export const formasPagamento = [
  {
    value: "Dinheiro"
  },
  {
    value: "Cartão Débito"
  },
  {
    value: "Deposito Bancário"
  }
]

