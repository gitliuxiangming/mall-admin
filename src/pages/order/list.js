import React,{ Component } from 'react';
import Layout from 'common/layout'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Breadcrumb,Form,InputNumber,Select,Button,Table,Divider,Modal,Input,Switch,Icon } from 'antd';
const Search = Input.Search;
import { connect } from 'react-redux'
import * as createActions from './store/actionCreates.js'





class NormalOrderList extends Component{

	constructor(props){
		super(props);
		
	}

	componentDidMount(){
		this.props.handlePage(1);
	}

	

	render(){
		const columns = [{
			  title: '订单号',
			  dataIndex: 'orderNo',
			  key: 'orderNo',
			  width:250,
			  render:(orderNo)=>{
				  if(keyword){
					  let reg = new RegExp('('+keyword+')',"ig");
					  let html = orderNo.replace(reg,'<b style="color:orange">$1</b>')
					  return <span dangerouslySetInnerHTML = {{__html:html}}></span>
				  }else{
					  return orderNo;
				  }
			  }
			},
			{
			  title: '收件人',
			  dataIndex: 'name',
			  key: 'name',
			  width:250,
			 
			},
			{
			  title: '订单状态',
			  dataIndex: 'statusDesc',
			  key: 'statusDesc',
			},
			{
			  title: '订单金额',
			  dataIndex: 'payment',
			  key: 'payment',
			},
			{
			  title: '创建时间',
			  dataIndex: 'createdAt',
			  key: 'createdAt',
			},
			{
			  title:'操作',
			  key:'action',
			  render:(text,record)=>(
			  	<span>
			  		<Divider type="vertical" />
			  		<Link to={"/order/detail/"+record.orderNo}>
			  		 	查看
			  		</Link>
			  	</span>
			  )
			}
			
		];
		const data = this.props.list.map((order)=>{
			return {
				key:order.get('orderNo'),
				orderNo:order.get('orderNo'),
				name:order.get('shipping').get('name'),
				statusDesc:order.get('statusDesc'),
				payment:"￥"+order.get('payment'),
				createdAt:moment(order.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
			}
		}).toJS();
		const { keyword } = this.props;
		return(
			<Layout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>订单管理</Breadcrumb.Item>
						<Breadcrumb.Item>订单列表</Breadcrumb.Item>
					</Breadcrumb>
					<Search
						style={{ width: 300 }}
						placeholder='输入订单号'
						enterButton
						onSearch={value=>{
							this.props.handleSearch(value,1)
						}}
					/>
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
							if(keyword){
								this.props.handleSearch(keyword,pagination.current)
							}else{
								this.props.handlePage(pagination.current);
							}
							
						}}
						loading = {
							{
								spinning:this.props.isPageFetching,
								tip:'正在加载数据......'
							}	
						}
					/>
				</div>
			</Layout>
			
					
		)
	}

}


const mapStateToProps = (state)=>{
	return {
		isPageFetching:state.get('order').get('isPageFetching'),
		current:state.get('order').get('current'),
		total:state.get('order').get('total'),
		pageSize:state.get('order').get('pageSize'),
		list:state.get('order').get('list'),
		keyword:state.get('order').get('keyword')
	}
}
const mapDispatchToProps = (dispatch)=>{

	return{
		handlePage:(page)=>{
 			dispatch(createActions.getPageAction(page));
		},
		handleSearch:(keyword,page)=>{
			dispatch(createActions.getSearchAction(keyword,page));
		}
		
		
	}
}
const OrderList = Form.create()(NormalOrderList);
export default connect(mapStateToProps,mapDispatchToProps)(OrderList);

