import React, { Component } from 'react';
// import logo from './logo.svg';
import {Route,Switch} from 'react-router-dom'
import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import asyncComponent from './hoc/asyncComponent'

const AsyncBurgerBuilder = asyncComponent(() => {
  return import('./containers/BurgerBuilder/BurgerBuilder');
})
class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={AsyncBurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
