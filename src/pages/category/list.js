import React,{ Component } from 'react';
import Layout from 'common/layout'
import { Link } from 'react-router-dom'
import { Breadcrumb,Form,InputNumber,Select,Button,Table,Divider,Modal,Input } from 'antd'
import { connect } from 'react-redux'
import * as createActions from './store/actionCreates.js'





class NormalCategoryList extends Component{

	constructor(props){
		super(props);
		this.state = {
			pid:this.props.match.params.pid || 0
		}
	}

	componentDidMount(){
		//第一个参数是父级ID,第二个参数是页码
		this.props.handlePage(this.state.pid,1);
	}

	componentDidUpdate(preProps,PreState){
		let oldPath = preProps.location.pathname;
		let newPath = this.props.location.pathname;
		if(oldPath!=newPath){
			let newPid = this.props.match.params.pid || 0;
			this.setState(
				{pid:newPid
			},()=>{
				this.props.handlePage(newPid,1);
			})
		}
	}

	render(){
		const columns = [{
			  title: 'id',
			  dataIndex: 'id',
			  key: 'id',
			},
			{
			  title: '分类名称',
			  dataIndex: 'name',
			  key: 'name',
			},
			{
			  title: '排序',
			  dataIndex: 'order',
			  key: 'order',
			  render:(text,record)=>(
			  	<InputNumber defaultValue={record.order} />
			  )
			},
			{
			  title:'操作',
			  key:'action',
			  render:(text,record)=>(
			  	<span>
			  		<a
			  		    href='jacascript:;'
			  		    onClick={()=>{
			  		    	this.props.showUpdateModal(record.id,record.name)
			  		    }}
			  		>
			  		 	更新名称
			  		</a>
			  		{
			  			record.pid == 0
			  			?(
			  				<span>
			  					<Divider type='vertical' />
			  					<Link to={"/category/"+record.id}>查看分类</Link>
			  				</span>
			  			)
			  			:null
			  		}
			  	</span>
			  )
			}
			
		];
		const pid = this.state.pid
		const data = this.props.list.map((category)=>{
			// console.log(user)
			return {
				key:category.get('_id'),
				id:category.get('_id'),
				name:category.get('name'),
				order:category.get('order'),
				pid:category.get('pid'),
			}
		}).toJS();
		return(
			<Layout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>分类管理</Breadcrumb.Item>
						<Breadcrumb.Item>分类列表</Breadcrumb.Item>
					</Breadcrumb>
					<div style={{ marginTop:20,float:'left' }} >
						<h4>父类ID:{pid}</h4>
					</div>
					<Link to="/category/add" className='clearfix'>
						<Button type="primary" style={{ float:'right' }}>新增分类</Button>
					</Link>
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
							this.props.handleList(pid,pagination.current);
						}}
						loading = {
							{
								spinning:this.props.isPageFetching,
								tip:'正在加载数据......'
							}	
						}
					/>
					<Modal
			          title="修改分类名称"
			          visible={this.props.updateModalVisible}
			          onOk={this.props.handleUpdateName}
			          onCancel={this.props.handleCancelName}
			        >
			          <Input placeholder={this.updateName} />
			        </Modal>
				</div>
			</Layout>
			
					
		)
	}

}


const mapStateToProps = (state)=>{
	return {
		isPageFetching:state.get('category').get('isPageFetching'),
		current:state.get('category').get('current'),
		total:state.get('category').get('total'),
		pageSize:state.get('category').get('pageSize'),
		list:state.get('category').get('list'),
		updateModalVisible:state.get('category').get('updateModalVisible'),
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		handlePage:(pid,page)=>{
 			dispatch(createActions.getPageAction(pid,page));
		},
		showUpdateModal:(updateId,updateName)=>{
			dispatch(createActions.getShowUpdateModalAction(updateId,updateName));
		},
		handleUpdateName:(updateId,updateName)=>{
			dispatch(createActions.getChangeUpdateModalAction(updateId,updateName));
		},
		handleCancelName:()=>{
			dispatch(createActions.getHideUpdateModalAction());
		}
		
	}
}
const CategoryList = Form.create()(NormalCategoryList);
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);

