import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';

const urlListarClientes = 'http://localhost:3000/#/cliente/listar';

class ClienteForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      estados: [],
      nome: '',
      email: '',
      cpf: '',
      rg: '',
      dataNascimento: '',
      telefone: '',
      rua: '',
      numero: '',
      cep: '',
      complemento: '',
      cidade: '',
      estado: '',
    };
    this.getUrlParameter();
    this.initilize();
  }

  async initilize() {
    await axios.get('http://localhost:8080/api/estados/listar').then(res => {
      this.setState({
        estados: res.data,
      });
    });
    if (this.getUrlParameter()) {
      await axios
        .get('http://localhost:8080/api/clientes/buscar/' + this.getUrlParameter())
        .then(res => {
          this.setState({
            nome: res.data.nome,
            email: res.data.email,
            cpf: res.data.cpf,
            rg: res.data.rg,
            dataNascimento: res.data.dataNascimento,
            telefone: res.data.telefone,
            rua: res.data.rua,
            numero: res.data.numero,
            cep: res.data.cep,
            complemento: res.data.complemento,
            cidade: res.data.cidade,
            estado: res.data.estado.id,
          });
        });
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  handleChange(e) {}

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getUrlParameter() {
    var url = window.location.toString().split('/');
    var id = url[url.length - 1];
    if (!isNaN(id)) {
      return parseInt(url[url.length - 1]);
    } else {
      return '';
    }
  }

  editar() {
    axios
      .post('http://localhost:8080/api/clientes/salvar', {
        id: this.getUrlParameter(),
        nome: this.state.nome,
        email: this.state.email,
        cpf: this.state.cpf,
        rg: this.state.rg,
        telefone: this.state.telefone,
        dataNascimento: this.state.dataNascimento,
        rua: this.state.rua,
        cep: this.state.cep,
        complemento: this.state.complemento,
        cidade: this.state.cidade,
        numero: this.state.numero,
        estado: { id: this.state.estado },
      })
      .then(res => {
        if (res.status === 200) {
          window.location.href = urlListarClientes;
        }
      })
      .catch(error => {
        this.setState = {
          error: true,
        };
      });
  }

  salvar() {
    axios
      .post('http://localhost:8080/api/clientes/salvar', {
        nome: this.state.nome,
        email: this.state.email,
        cpf: this.state.cpf,
        rg: this.state.rg,
        telefone: this.state.telefone,
        dataNascimento: this.state.dataNascimento,
        rua: this.state.rua,
        cep: this.state.cep,
        complemento: this.state.complemento,
        cidade: this.state.cidade,
        numero: this.state.numero,
        estado: { id: this.state.estado },
      })
      .then(res => {
        if (res.status === 200) {
          window.location.href = urlListarClientes;
        }
      })
      .catch(error => {
        this.setState = {
          error: true,
        };
      });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    if (this.getUrlParameter()) {
      this.editar();
    } else {
      this.salvar();
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <strong>Clientes </strong> - Cadastrar
            </CardHeader>
            <CardBody>
              <Form id="cliente-form" className="form-horizontal" onSubmit={e => this.onSubmit(e)}>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Nome completo*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="nome"
                      value={this.state.nome}
                      onChange={e => this.onChange(e)}
                      required
                      name="nome"
                      placeholder="Nome completo"
                    />
                    <FormText color="muted">Digite o nome completo do cliente.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email-input">Email*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={this.state.email}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText className="help-block">Digite o email.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="cpf-input">CPF*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="cpf"
                      name="cpf"
                      placeholder="CPF"
                      autoComplete="cpf"
                      value={this.state.cpf}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText className="help-block">Digite o CPF.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="rg-input">RG*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="rg"
                      name="rg"
                      placeholder="RG"
                      autoComplete="rg"
                      value={this.state.rg}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText className="help-block">Digite o RG.</FormText>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Data de Nascimento*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="date"
                      id="dataNascimento"
                      name="dataNascimento"
                      placeholder="date"
                      value={this.state.dataNascimento}
                      onChange={e => this.onChange(e)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="telefone-input">Telefone/Celular*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="telefone"
                      id="telefone"
                      name="telefone"
                      placeholder="Telefone"
                      autoComplete="telefone"
                      value={this.state.telefone}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText className="help-block">Digite o telefone.</FormText>
                  </Col>
                </FormGroup>
                <label>
                  <strong>Endereço </strong>
                </label>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Rua*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="rua"
                      required
                      name="rua"
                      placeholder="Rua"
                      value={this.state.rua}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText color="muted">Digite o nome da rua.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Número*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="number"
                      id="numero"
                      required
                      name="numero"
                      placeholder="Número"
                      value={this.state.numero}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText color="muted">Digite o número da rua.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">CEP*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="cep"
                      required
                      name="cep"
                      placeholder="CEP"
                      value={this.state.cep}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText color="muted">Digite o CEP da rua.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Complemento</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="complemento"
                      required
                      name="complemento"
                      placeholder="Complemento"
                      value={this.state.complemento}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText color="muted">Digite algum complemento (opcional).</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Cidade*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="cidade"
                      required
                      name="cidade"
                      value={this.state.cidade}
                      onChange={e => this.onChange(e)}
                      placeholder="Cidade"
                    />
                    <FormText color="muted">Digite a cidade.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Estado*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="estado"
                      onClick={this.handleChange.bind(this)}
                      required
                      id="estado"
                      value={this.state.estado}
                      onChange={e => this.onChange(e)}
                    >
                      <option type="option" value="0">
                        Por favor, selecione um estado:
                      </option>
                      {this.state.estados.map(estado => (
                        <option type="option" value={estado.id}>
                          {estado.estado}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                <Button size="sm" color="success">
                  <i className="fa fa-dot-circle-o" /> Salvar
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default ClienteForm;
