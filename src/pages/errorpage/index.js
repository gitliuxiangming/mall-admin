import React,{ Component } from 'react';
import { Alert } from 'antd';
import { Link } from 'react-router-dom';
import './index.css'


class ErrorPage extends Component{

	render(){
		return(
			<div className="Error">
				<Alert message="页面不存在" type="error" className="err-message" />
				<Link to="/">返回首页</Link>
			</div>
		)
	}

}


export default ErrorPage;