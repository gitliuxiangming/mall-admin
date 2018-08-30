import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import Layout from 'common/layout'

class ProductList extends Component{

	render(){
		return(
			<Layout>
				<div>
					<Link to='/product/save' >to save</Link>
				</div>
			</Layout>
		)
	}

}


export default ProductList;