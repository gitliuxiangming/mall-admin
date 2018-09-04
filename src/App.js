// import React, { Component } from 'react';
import React, { Component } from 'react';
import Login from 'pages/login';
import Home from 'pages/home';
import User from 'pages/user';
import Category from 'pages/category';
import Product from 'pages/product';
import ErrorPage from 'pages/errorpage';
import { getUsername  } from 'util';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
// import store from './store';
import './App.css';


class App extends Component {
	
	render() {
		const ProtectRoute = ({ component: Component, ...rest })=>(
			<Route 
				{...rest} 
				render={props=>(
					getUsername ()
					?(<Component {...props} />)
					:(<Redirect to='/login' />)
				)}
			/>
		)
		const LoginRoute = ({ component: Component, ...rest })=>{
			if(getUsername()){
				return <Redirect to="/" />
			}else{
				return <Route {...rest} component={Component} />
			}
		}
		return (
			<Router forceRefresh={true}>
				<div className="App">
					<Switch>
						<ProtectRoute exact path='/' component={ Home } />
						<ProtectRoute  path='/user' component={ User } />
						<ProtectRoute  path='/category' component={ Category } />
						<ProtectRoute  path='/product' component={ Product } />
						<LoginRoute  path='/login' component={ Login } />
						<Route component={ ErrorPage } />
					</Switch>
				</div>
			</Router>
		);
	}	
}

export default App;
