import React,{ Component } from 'react';
import Layout from 'common/layout'
import { Link } from 'react-router-dom'


class CategoryList extends Component{

	render(){
		return(
			<Layout>
				<Link to="/category/add" >List页面中的add跳转</Link>
			</Layout>
		)
	}

}


export default CategoryList;