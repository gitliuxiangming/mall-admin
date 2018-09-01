import React,{ Component } from 'react';
import Layout from 'common/layout'
import { Link } from 'react-router-dom'
import { Breadcrumb,Form,InputNumber,Select,Button,Table,Divider,Modal,Input,Switch,Icon } from 'antd'
import { connect } from 'react-redux'
import * as createActions from './store/actionCreates.js'





class NormalproductList extends Component{

	constructor(props){
		super(props);
		
	}

	componentDidMount(){
		this.props.handlePage(1);
	}

	

	render(){
		const columns = [{
			  title: 'id',
			  dataIndex: 'id',
			  key: 'id',
			},
			{
			  title: '商品名称',
			  dataIndex: 'name',
			  key: 'name',
			},
			{
			  title: '商品状态',
			  dataIndex: 'status',
			  key: 'status',
			  render:(state,record)=>{
			  	return(
			  		<span>
			  			<Switch 
				  			checkedChildren="在售" 
				  			unCheckedChildren="下架" 
				  			defaultChecked={ record.status == '0' ? true : false}
				  			onChange={(checked)=>{
				  				this.props.handleStatus(record.id, checked ? 0 : 1 )
				  			}} 
			  			/>
			  		</span>
			  	)
			  }
			},
			{
			  title: '排序',
			  dataIndex: 'order',
			  key: 'order',
			  render:(text,record)=>{
			  	return <InputNumber
				  	  	defaultValue={record.order} 
				  	 	onBlur={(e)=>{
		        	  		this.props.handleOrder(record.id,e.target.value)
		        	 	}} 
			  	/>
			  }
			},
			{
			  title:'操作',
			  key:'action',
			  render:(text,record)=>(
			  	<span>
			  		<Link to={"/product/save/"+record.id}>
			  		 	编辑
			  		</Link>
			  		<Divider type="vertical" />
			  		<Link to={"/product/detail/"+record.id}>
			  		 	查看
			  		</Link>
			  	</span>
			  )
			}
			
		];
		const data = this.props.list.map((product)=>{
			// console.log(user)
			return {
				key:product.get('_id'),
				id:product.get('_id'),
				name:product.get('name'),
				order:product.get('order'),
				status:product.get('status'),
			}
		}).toJS();
		return(
			<Layout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>商品管理</Breadcrumb.Item>
						<Breadcrumb.Item>商品列表</Breadcrumb.Item>
					</Breadcrumb>
					<div className='clearfix catebtn'>
						<Link to="/product/save" style={{float:'right'}}>
							<Button type="primary">新增分类</Button>
						</Link>
					</div>
					
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
		isPageFetching:state.get('product').get('isPageFetching'),
		current:state.get('product').get('current'),
		total:state.get('product').get('total'),
		pageSize:state.get('product').get('pageSize'),
		list:state.get('product').get('list'),
	}
}
const mapDispatchToProps = (dispatch)=>{

	return{
		handlePage:(page)=>{
 			dispatch(createActions.getPageAction(page));
		},
		handleOrder:(id,newOrder)=>{			
			dispatch(createActions.getChangeOrderAction(id,newOrder));
		},
		handleStatus:(id,newStatus)=>{
			dispatch(createActions.getChangeStatusAction(id,newStatus));
		}
		
		
	}
}
const productList = Form.create()(NormalproductList);
export default connect(mapStateToProps,mapDispatchToProps)(productList);

