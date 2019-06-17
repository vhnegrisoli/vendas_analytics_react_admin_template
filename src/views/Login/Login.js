import React, { Component } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { withGlobalState } from 'react-globally';
import logo from '../../assets/img/brand/logo1.svg';
import { bake_cookie, delete_cookie } from 'sfcookies';

const getTokenUrl = 'http://localhost:8080/oauth/token';
const getAuthenticatedUser = 'http://localhost:8080/api/autenticacao/usuario-logado';

const cookie_key = 'token';
const cookie_key_role = 'permissao';
const cookie_key_user = 'user';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      senha: '',
      isSucess: true,
      successData: '',
      errors: [],
      token: '',
      successMessage: false,
    };
    delete_cookie(cookie_key);
    delete_cookie(cookie_key_role);
    delete_cookie(cookie_key_user);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  async login() {
    const form = new FormData();
    form.append('client_id', 'vendas_analytics-client');
    form.append('client_secret', 'vendas_analytics-secret');
    form.append('username', this.state.email);
    form.append('password', this.state.senha);
    form.append('grant_type', 'password');
    const Authorization = `Basic dmVuZGFzX2FuYWx5dGljcy1jbGllbnQ6dmVuZGFzX2FuYWx5dGljcy1zZWNyZXQ=`;
    const Content_Type = `application/x-www-form-urlencoded`;
    const urlHome = 'http://localhost:3000/#/dashboard';
    var token = '';
    var status = 0;
    var permissao = '';
    var user = '';
    await axios
      .post(getTokenUrl, form, {
        Headers: {
          Authorization,
          Content_Type,
        },
      })
      .then(res => {
        this.setState({
          isSucess: true,
          isLoading: false,
          successMessage: true,
        });
        status = res.status;
        if (res.status === 200) {
          token = res.data.access_token;
        }
      })
      .catch(error => {
        this.setState({
          isSucess: false,
          isLoading: false,
        });
        this.forceUpdate();
      });

    await axios
      .get(getAuthenticatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        this.props.setGlobalState({
          token: token,
          user: {
            nome: res.data.nome,
            permissao: res.data.permissao.permissao,
          },
        });
        permissao = res.data.permissao.permissao;
        user = res.data.nome;
      });
    if (status === 200) {
      this.setCookie(token, permissao, user);
      window.location.href = urlHome;
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.forceUpdate();
    this.login();
  }

  setCookie(token, permissao, user) {
    bake_cookie(cookie_key, token);
    bake_cookie(cookie_key_role, permissao);
    bake_cookie(cookie_key_user, user);
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={e => this.onSubmit(e)}>
                      <h1>Login</h1>
                      <p className="text-muted">Entre com sua conta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Digite seu email"
                          required
                          onChange={e => this.onChange(e)}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="senha"
                          placeholder="Digite sua senha"
                          required
                          onChange={e => this.onChange(e)}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary">Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  {this.state.isLoading && this.state.isSucess && (
                    <Alert color="warning">
                      <div>
                        <ReactLoading type={'spin'} />
                        <Label>Verificando seu usuário e senha...</Label>
                      </div>
                    </Alert>
                  )}
                  {!this.state.isLoading && !this.state.isSucess && (
                    <Alert color="danger">
                      <div>
                        <Label>Usuário ou senha inválidos.</Label>
                      </div>
                    </Alert>
                  )}
                  {!this.state.isLoading && !this.state.isSucess && this.state.successMessage && (
                    <Alert color="success">
                      <div>
                        <Label>Autenticação concluída, aguarde...</Label>
                      </div>
                    </Alert>
                  )}
                </Card>
                <Card className="text-white bg py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <img src={logo} width="90%" height="90%" />
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withGlobalState(Login);
