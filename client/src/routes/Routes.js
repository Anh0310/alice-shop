import React, { lazy, Suspense } from 'react'
import { Switch, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import '../App.css'
import PrivateRoute from '../component/PrivateRoute'
import PublicRoute from '../component/PublicRoute'

// Admin pages
const HomeAdmin = lazy(() => import('../component/admin/Home'))
const UserAdmin = lazy(() => import('../component/admin/User'))
const CategoryAdmin = lazy(() => import('../component/admin/Category'))
const SizeAdmin = lazy(() => import('../component/admin/Size'))
const ProductAdmin = lazy(() => import('../component/admin/Product'))
const AddEditProductAdmin = lazy(() =>
  import('../component/admin/AddEditProduct'),
)
const OrderAdmin = lazy(() => import('../component/admin/Order'))
// Customer pages
const Home = lazy(() => import('../component/customer/Home'))
const Login = lazy(() => import('../component/Login'))
const Register = lazy(() => import('../component/Register'))
const ForgotPassword = lazy(() => import('../component/ForgotPassword'))
const ResetPassword = lazy(() => import('../component/ResetPassword'))
const Cart = lazy(() => import('../component/customer/Cart'))
const Order = lazy(() => import('../component/customer/Order'))
const ProductDetail = lazy(() =>
  import('../component/customer/ProductDetail'),
)
const Shop = lazy(() => import('../component/customer/Shop'))
const NotFound = lazy(() => import('../component/NotFound'))

const routesApp = [
  {
    exact: true,
    path: '/admin/home',
    component: HomeAdmin,
  },
  {
    exact: true,
    path: '/admin/user',
    component: UserAdmin,
  },
  {
    exact: true,
    path: '/admin/category',
    component: CategoryAdmin,
  },
  {
    exact: true,
    path: '/admin/size',
    component: SizeAdmin,
  },
  {
    exact: true,
    path: '/admin/order',
    component: OrderAdmin,
  },
  {
    exact: true,
    path: '/admin/product',
    component: ProductAdmin,
  },
  {
    exact: true,
    path: '/admin/product/new',
    component: AddEditProductAdmin,
  },
  {
    exact: true,
    path: '/admin/product/:id',
    component: AddEditProductAdmin,
  },
  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    exact: true,
    path: '/login',
    component: Login,
    restricted: true,
  },
  {
    exact: true,
    path: '/register',
    component: Register,
    restricted: true,
  },
  {
  	path: '/forgot-password',
  	component: ForgotPassword,
  	restricted: true,
  },
  {
  	path: '/reset-password/:id/:token',
  	component: ResetPassword,
  	restricted: true,
  },
  {
    exact: true,
    path: '/cart',
    component: Cart,
  },
  {
    path: '/shop',
    component: Shop,
  },
  {
    exact: true,
    path: '/product/:id',
    component: ProductDetail,
  },
  {
    exact: true,
    path: '/order',
    component: Order,
  },
  {
    path: '*',
    component: NotFound,
  },
]

const RoutesApp = () => {
  const location = useLocation()
  return (
    <TransitionGroup component={null}>
      <CSSTransition timeout={300} classNames="page" key={location.key}>
        <Suspense fallback={null}>
          <Switch location={location}>
            {routesApp.map((route, index) => {
              const Component = route.component
              return route.path.includes('/admin') ? (
                <PrivateRoute
                  component={Component}
                  exact={route.exact}
                  path={route.path}
                  key={index}
                />
              ) : (
                <PublicRoute
                  component={Component}
                  exact={route.exact}
                  path={route.path}
                  key={index}
                  restricted={route.restricted}
                />
              )
            })}
          </Switch>
        </Suspense>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default RoutesApp
