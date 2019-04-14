import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  CustomInput,
  Row,
} from 'reactstrap';
import { format } from 'path';
import { hidden } from 'ansi-colors';

let precoTotal = 0;

class TratarVendaFormAdmin extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      clientes: [],
      produtos: [],
      produtosAdicionados: [],
      idProduto: '',
      cliente: '',
      produtoVenda: [],
      preco: 0.0,
      aprovacao: '',
      quantidade: 0,
      quantidades: [],
      produtoVenda: [],
      isLoading: true,
    };
    this.initialize();
  }

  async initialize() {
    await axios.get('http://localhost:8080/api/produtos/todos').then(res => {
      this.setState({
        produtos: res.data,
      });
    });

    await axios.get('http://localhost:8080/api/clientes/todos').then(res => {
      this.setState({
        clientes: res.data,
        isLoading: false,
      });
    });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  onSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:8080/api/vendas/salvar', {
      clientes: { id: this.state.cliente },
      produtos: this.state.produtoVenda,
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getPreco() {
    var precoTotal = 0;
    this.state.produtosAdicionados.map(
      preco => (precoTotal = precoTotal + preco.preco * preco.quantidade),
    );
    return precoTotal;
  }

  getQtd() {
    var qtdTotal = 0;
    this.state.produtosAdicionados.map(qtd => (qtdTotal = qtdTotal + parseInt(qtd.quantidade)));
    return qtdTotal;
  }

  adicionaProduto(produto) {
    produto.quantidade = this.state.quantidade;
    var produtoVendaAdd = {
      id: { produtoId: produto.id },
      quantidade: produto.quantidade,
    };
    this.state.produtoVenda.push(produtoVendaAdd);
    this.state.produtosAdicionados.push(produto);
    this.setState({
      quantidade: 0,
    });
    this.forceUpdate();
    console.log(this.state.produtosAdicionados);
  }

  render() {
    return (
      <div className="animated fadeIn">
        {this.state.isLoading ? (
          <ReactLoading type={'spin'} />
        ) : (
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Tratar Venda </strong> - Administrador
              </CardHeader>
              <CardBody>
                <Form id="venda" className="form-horizontal" onSubmit={e => this.onSubmit(e)}>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Cliente*</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="select"
                        name="cliente"
                        required
                        id="cliente"
                        value={this.state.cliente}
                        onChange={e => this.onChange(e)}
                      >
                        <option type="option" value="0">
                          Por favor, selecione um cliente:
                        </option>
                        {this.state.clientes.map(cliente => (
                          <option type="option" value={cliente.id}>
                            {cliente.nome}
                          </option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup name="produtos">
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th scope="col">Produto</th>
                          <th scope="col">Descrição do Produto</th>
                          <th scope="col">Preço</th>
                          <th scope="col">Fornecedor</th>
                          <th scope="col">Selecionar Item</th>
                          <th scope="col">Quantidade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.produtos.map(produto => (
                          <tr>
                            <td>{produto.nomeProduto}</td>
                            <td>{produto.descricao}</td>
                            <td>{'R$' + parseFloat(produto.preco).toFixed(2)}</td>
                            <td>{produto.fornecedor.nomeFantasia}</td>
                            <td>
                              <Input
                                type="number"
                                name="quantidade"
                                id="quantidade"
                                value={this.state.produtoVenda.quantidade}
                                onChange={e => this.onChange(e)}
                              />
                            </td>
                            <td>
                              <Button
                                color="primary"
                                onClick={e =>
                                  this.adicionaProduto(
                                    {
                                      id: produto.id,
                                      nome: produto.nomeProduto,
                                      descricao: produto.descricao,
                                      preco: produto.preco,
                                      quantidade: null,
                                    },
                                    e,
                                  )
                                }
                              >
                                Adicionar produto
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Card>
                      <CardHeader>
                        Itens adicionados:
                        <br />
                        {this.state.produtosAdicionados.length === 0 ? (
                          <label>
                            <strong> Você não possui produtos adicionados</strong>
                          </label>
                        ) : (
                          <Table>
                            <thead>
                              <tr>
                                <th scope="col">Código do Produto</th>
                                <th scope="col">Nome do Produto</th>
                                <th scope="col">Preço do Produto</th>
                                <th scope="col">Quantidade</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.produtosAdicionados.map(item => (
                                <tr>
                                  <td>{item.id}</td>
                                  <td>{item.nome}</td>
                                  <td>{'R$' + item.preco.toFixed(2)}</td>
                                  <td>{item.quantidade}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        )}
                      </CardHeader>
                    </Card>
                    <Table>
                      <tr>
                        <td>
                          <strong>Total de itens: {this.getQtd()}</strong>
                        </td>
                        <td>
                          <strong>Total a pagar: R${this.getPreco().toFixed(2)}</strong>
                        </td>
                      </tr>
                    </Table>
                  </FormGroup>
                  <br />
                  <Button type="submit" size="sm" color="success">
                    <i className="fa fa-dot-circle-o" /> Tratar venda
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        )}
      </div>
    );
  }
}

export default TratarVendaFormAdmin;
