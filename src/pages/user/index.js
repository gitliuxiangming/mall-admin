import React,{ Component } from 'react';
import Layout from 'common/layout';
import { Table,Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import * as createActions from './store/actionCreates.js';
import moment from 'moment';
import './index.css'
 

 const columns = [{
	  title: '用户名',
	  dataIndex: 'username',
	  key: 'username',
	},
	{
	  title: '是否管理员',
	  dataIndex: 'isAdmin',
	  key: 'isAdmin',
	  render:isAdmin=>(isAdmin?'是':'否')
	},
	{
	    title: '手机',
	    dataIndex: 'phone',
	    key: 'phone',
	},
	{
	    title: '邮箱',
	    dataIndex: 'email',
	    key: 'email',
	},
	{
	    title: '注册时间',
	    dataIndex: 'createdAt',
	    key: 'createdAt',
	}
]




class User extends Component{

	componentDidMount(){

		this.props.handlePage(1)
	}
	render(){
		const data = this.props.list.map((user)=>{
			// console.log(user)
			return {
				key:user.get('_id'),
				username:user.get('username'),
				isAdmin:user.get('isAdmin'),
				email:user.get('email'),
				phone:user.get('phone'),
				createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
			}
		}).toJS();

		return(
			<div>
				<Layout>
				<Breadcrumb>
					<Breadcrumb.Item>用户管理</Breadcrumb.Item>
					<Breadcrumb.Item>用户列表</Breadcrumb.Item>
				</Breadcrumb>
				<Table 
						dataSource={data} 
						columns={columns} 
						pagination={
							{
								current:this.props.current,
								defaultCurrent:this.props.defaultCurrent,
								total:this.props.total,
								pageSize:this.props.pageSize
							}
						}
						onChange = {(pagination)=>{
							this.props.handlePage(pagination.current);
						}}
						loading = {
							{
								spinning:this.props.isFetching,
								tip:'正在加载数据......'
							}	
						}
					/>
				</Layout>
			</div>
		)
	}

}

const mapStateToProps = (state)=>{
	return {
		isFetching:state.get('user').get('isFetching'),
		current:state.get('user').get('current'),
		total:state.get('user').get('total'),
		pageSize:state.get('user').get('pageSize'),
		list:state.get('user').get('list')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		handlePage:(values)=>{
			const action =createActions.getPageAction(values);
			dispatch(action);
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(User);
