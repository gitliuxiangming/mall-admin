import React,{ Component } from 'react';
import { Switch,Route } from 'react-router-dom'
import CategoryList from './list.js'
import CategoryAdd from './add.js'

class Category extends Component{

	render(){
		return(
			<Switch>
				<Route exact path="/category"  component={ CategoryList } />
				<Route path="/category/add"  component={ CategoryAdd } />
			</Switch>
		)
	}

}


export default Category;