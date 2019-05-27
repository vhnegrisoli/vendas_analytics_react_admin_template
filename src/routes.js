import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const HistoricoVenda = React.lazy(() => import('./views/HistoricoVenda/HistoricoVenda'));
const ClienteForm = React.lazy(() => import('./views/Cliente/Cadastrar/ClienteForm'));
const ClienteList = React.lazy(() => import('./views/Cliente/Listar/ClienteList'));
const ProdutoForm = React.lazy(() => import('./views/Produto/Cadastrar/ProdutoForm'));
const ProdutoList = React.lazy(() => import('./views/Produto/Listar/ProdutoList'));
const CategoriaForm = React.lazy(() => import('./views/Categoria/Cadastrar/CategoriaForm'));
const CategoriaList = React.lazy(() => import('./views/Categoria/Listar/CategoriaList'));
const FornecedorForm = React.lazy(() => import('./views/Fornecedor/Cadastrar/FornecedorForm'));
const FornecedorList = React.lazy(() => import('./views/Fornecedor/Listar/FornecedorList'));
const UsuarioForm = React.lazy(() => import('./views/Usuario/Cadastrar/UsuarioForm'));
const UsuarioList = React.lazy(() => import('./views/Usuario/Listar/UsuarioList'));
const ExportarCsv = React.lazy(() => import('./views/ExportarRelatorioCsv/ExportarCsv'));
const TratarVendaFormAdmin = React.lazy(() =>
  import('./views/TratarVenda/Tratar/TratarVendaAdminForm'),
);
const AprovarVendaForm = React.lazy(() => import('./views/TratarVenda/Aprovar/AprovarVendaForm'));
const DetalharVendaForm = React.lazy(() =>
  import('./views/TratarVenda/Detalhar/DetalharVendaForm'),
);
const Custom = React.lazy(() => import('./views/Personalizados/Custom'));
const RelatoriosPowerBi = React.lazy(() => import('./views/RelatoriosPowerBi/RelatoriosPowerBi'));

const Login = React.lazy(() => import('./views/Pages/Login/Login'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', name: 'Users', component: Users },
  { path: '/historicovenda', name: 'Histórico de Vendas', component: HistoricoVenda },
  { path: '/vendedores/cadastrar', name: ' Cadastrar Vendedor', component: ClienteForm },
  { path: '/vendedores/listar', name: 'Listar Vendedores', component: ClienteList },
  { path: '/produtos/cadastrar', name: 'Cadastrar Produto', component: ProdutoForm },
  { path: '/produtos/listar', name: 'Listar Produtos', component: ProdutoList },
  { path: '/categorias/cadastrar', name: 'Cadastrar Categoria', component: CategoriaForm },
  { path: '/categorias/listar', name: 'Listar Categorias', component: CategoriaList },
  { path: '/fornecedores/cadastrar', name: 'Cadastrar Fornecedor', component: FornecedorForm },
  { path: '/fornecedores/listar', name: 'Listar Fornecedores', component: FornecedorList },
  { path: '/usuarios/cadastrar', name: 'Cadastrar Usuário', component: UsuarioForm },
  { path: '/usuarios/listar', name: 'Listar Usuários', component: UsuarioList },
  { path: '/exportar', name: 'Exportar Relatório', component: ExportarCsv },
  { path: '/tratar-venda', name: 'Tratar Venda', component: TratarVendaFormAdmin },
  { path: '/aprovar-venda', name: 'Aprovar Vendas', component: AprovarVendaForm },
  { path: '/detalhar-venda', name: 'Detalhar Vendas', component: DetalharVendaForm },
  { path: '/relatorios-personalizados', name: 'Relatórios Personalizados', component: Custom },
  {
    path: '/relatorios-power-bi',
    name: 'Relatoriosdo Microsoft Power BI',
    component: RelatoriosPowerBi,
  },
  { path: 'login', name: 'Login', component: Login },
];

export default routes;
