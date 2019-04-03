import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import ReactLoading from 'react-loading';
import {
  ButtonDropdown,
  ButtonGroup,
  Card,
  CardBody,
  CardTitle,
  Col,
  Dropdown,
  Row,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary');
const brandSuccess = getStyle('--success');
const brandInfo = getStyle('--info');
const brandWarning = getStyle('--warning');
const brandDanger = getStyle('--danger');

let qtdClientesArr = [];
let qtdClientes = 0;
let qtdProdutosArr = [];
let qtdProdutos = 0;
let qtdVendasConcretizadasArr = [];
let qtdVendasConcretizadas = 0;
let qtdVendasNaoRealizadasArr = [];
let qtdVendasNaoRealizadas = 0;
let clientes = [];
let clientesMeses = [];

// Card Chart 1
const cardChartData1 = {
  labels: clientesMeses,
  datasets: [
    {
      label: 'Quantidade de Clientes',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: clientes,
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 2

let cardChartData2 = {
  labels: clientesMeses,
  datasets: [
    {
      label: 'Quantidade de Clientes',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: clientes,
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      },
    ],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
};

// Main Chart

let mesesGrafico1 = [];
let lucrosGrafico1 = [];
let quantidadesGrafico1 = [];
let mediasGrafico1 = [];

const mainChart = {
  labels: mesesGrafico1,
  datasets: [
    {
      label: 'Quantidade de Vendas',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 4,
      data: quantidadesGrafico1,
    },
  ],
};

const mainChart2 = {
  labels: mesesGrafico1,
  datasets: [
    {
      label: 'Média de vendas mensal',
      backgroundColor: brandSuccess,
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: mediasGrafico1,
    },
  ],
};

const mainChart3 = {
  labels: mesesGrafico1,
  datasets: [
    {
      label: 'Lucro total por meses',
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#E6f9FF',
        '#ffd1b3',
        '#ffff99',
        '#1aff1a',
        '#004080',
        '#ffb3b3',
        '#b3ffb3',
        '#ccffdd',
        '#990000',
      ],
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: quantidadesGrafico1,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
      },
    },
  },
  maintainAspectRatio: false,
  legend: {
    display: true,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 10,
          stepSize: Math.ceil(100 / 5),
          max: 50,
        },
      },
    ],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

const mainChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
      },
    },
  },
  maintainAspectRatio: false,
  legend: {
    display: true,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 10,
          stepSize: Math.ceil(10000 / 5),
          max: 10000,
        },
      },
    ],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.initialize();
    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.state = {
      isLoading: true,
      dropdownOpen: false,
      radioSelected: 2,
      qtdClientes: 0,
      qtdProdutos: 0,
      qtdVendasNaoRealizadas: 0,
      qtdVendasConcretizadas: 0,
    };
  }

  async initialize() {
    //VIEWS DO BANCO DE DADOS
    await axios.get('http://localhost:8080/api/dashboard/vendas-por-periodo').then(res => {
      for (var i = 0; i < res.data.length; i++) {
        mesesGrafico1[i] = res.data[i].meses;
        lucrosGrafico1[i] = res.data[i].lucro;
        mediasGrafico1[i] = res.data[i].media;
        quantidadesGrafico1[i] = res.data[i].quantidade;
      }
    });
    clientes = [0];
    await axios.get('http://localhost:8080/api/dashboard/card1/vendas-por-cliente').then(res => {
      for (var i = 0; i < res.data.length; i++) {
        clientes[i] = res.data[i].clientes;
        clientesMeses[i] = res.data[i].meses;
      }
    });

    //VALORES SOMATÓRIOS NOS CARDS
    await axios.get('http://localhost:8080/api/clientes/todos').then(res => {
      for (var i = 0; i < res.data.length; i++) {
        qtdClientesArr[i] = res.data[i].id;
      }
    });
    qtdClientes = qtdClientesArr.length;

    await axios.get('http://localhost:8080/api/produtos/todos').then(res => {
      for (var i = 0; i < res.data.length; i++) {
        qtdProdutosArr[i] = res.data[i].id;
      }
    });
    qtdProdutos = qtdProdutosArr.length;

    await axios.get('http://localhost:8080/api/vendas/vendas-realizadas').then(res => {
      for (var i = 0; i < res.data.length; i++) {
        qtdVendasConcretizadasArr[i] = res.data[i].id;
      }
    });
    qtdVendasConcretizadas = qtdVendasConcretizadasArr.length;

    await axios.get('http://localhost:8080/api/vendas/vendas-nao-realizadas').then(res => {
      for (var i = 0; i < res.data.length; i++) {
        qtdVendasNaoRealizadasArr[i] = res.data[i].id;
      }
    });
    qtdVendasNaoRealizadas = qtdVendasNaoRealizadasArr.length;
    this.setState({
      qtdClientes: qtdClientesArr.length,
      qtdProdutos: qtdProdutosArr.length,
      qtdVendasConcretizadas: qtdVendasConcretizadasArr.length,
      qtdVendasNaoRealizadas: qtdVendasNaoRealizadasArr.length,
      isLoading: false,
    });
    this.forceUpdate();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  {this.state.isLoading && <ReactLoading type={'spin'} />}
                  <ButtonDropdown
                    id="card1"
                    isOpen={this.state.card1}
                    toggle={() => {
                      this.setState({ card1: !this.state.card1 });
                    }}
                  />
                </ButtonGroup>
                <div className="text-value">{this.state.qtdClientes}</div>
                <div>Clientes ativos</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={cardChartData2} options={cardChartOpts2} height={70} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  {this.state.isLoading && <ReactLoading type={'spin'} />}
                  <Dropdown
                    id="card2"
                    isOpen={this.state.card2}
                    toggle={() => {
                      this.setState({ card2: !this.state.card2 });
                    }}
                  />
                </ButtonGroup>
                <div className="text-value">{this.state.qtdProdutos}</div>
                <div>Produtos cadastrados</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={cardChartData1} options={cardChartOpts1} height={70} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  {this.state.isLoading && <ReactLoading type={'spin'} />}
                  <Dropdown
                    id="card3"
                    isOpen={this.state.card3}
                    toggle={() => {
                      this.setState({ card3: !this.state.card3 });
                    }}
                  />
                </ButtonGroup>
                <div className="text-value">{this.state.qtdVendasConcretizadas}</div>
                <div>Vendas concretizadas</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  {this.state.isLoading && <ReactLoading type={'spin'} />}
                  <ButtonDropdown
                    id="card4"
                    isOpen={this.state.card4}
                    toggle={() => {
                      this.setState({ card4: !this.state.card4 });
                    }}
                  />
                </ButtonGroup>
                <div className="text-value">{this.state.qtdVendasNaoRealizadas}</div>
                <div>Vendas rejeitadas</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
              </div>
            </Card>
          </Col>
        </Row>
        {this.state.isLoading ? (
          <ReactLoading type={'bars'} />
        ) : (
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    <Col sm="5">
                      <CardTitle className="mb-0">Vendas totais por período</CardTitle>
                    </Col>
                    <Col sm="7" className="d-none d-sm-inline-block" />
                  </Row>
                  <div
                    className="chart-wrapper"
                    style={{ height: 300 + 'px', marginTop: 40 + 'px' }}
                  >
                    <Line data={mainChart} options={mainChartOpts} height={300} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
        {this.state.isLoading ? (
          <ReactLoading type={'bars'} />
        ) : (
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    <Col sm="5">
                      <CardTitle className="mb-0">Média de vendas por meses</CardTitle>
                    </Col>
                    <Col sm="7" className="d-none d-sm-inline-block" />
                  </Row>
                  <div
                    className="chart-wrapper"
                    style={{ height: 300 + 'px', marginTop: 40 + 'px' }}
                  >
                    <Bar data={mainChart2} options={mainChartOpts2} height={300} />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    <Col sm="5">
                      <CardTitle className="mb-0">Lucro total por meses</CardTitle>
                    </Col>
                    <Col sm="7" className="d-none d-sm-inline-block" />
                  </Row>
                  <div
                    className="chart-wrapper"
                    style={{ height: 300 + 'px', marginTop: 40 + 'px' }}
                  >
                    <Pie data={mainChart3} options={mainChartOpts2} height={300} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default Dashboard;
