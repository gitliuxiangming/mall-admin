import React,{ Component } from 'react';
import { Switch,Route } from 'react-router-dom'
import ProductSave from './save.js'
import ProductList from './list.js'

class Product extends Component{

	render(){
		return(
			<Switch>
				<Route path="/product/save/:ProductId?"  component={ ProductSave } />
				<Route path="/product/"  component={ ProductList } />
			</Switch>
		)
	}

}


export default Product;