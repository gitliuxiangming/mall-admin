// import React, { Component } from 'react';
import React, { Component } from 'react';
import Login from 'pages/login';
import Home from 'pages/home';
import { getUserName  } from 'util';
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
					getUserName ()
					?(<Component {...props} />)
					:(<Redirect to='/login' />)
				)}
			/>
		)
		const LoginRouter  = ({ component: Component, ...rest })=>{
			if(getUserName()){
				return <Redirect to="/" />
			}else{
				return <Route {...rest} component={Component} />
			}
		}
		return (
			<Router>
				<div className="App">
					<ProtectRoute exact path='/' component={ Home } />
					<LoginRouter  path='/login' component={ Login } />
					
				</div>
			</Router>
		);
	}	
}

export default App;
