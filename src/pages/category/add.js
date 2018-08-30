import React,{ Component } from 'react';
import Layout from 'common/layout';
import {connect} from 'react-redux';
import { Breadcrumb,Form,Input,Select,Button } from 'antd'
import * as createActions from './store/actionCreates.js'
const FormItem = Form.Item;
const Option = Select.Option;


class NormalLoginForm extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount(){
		this.props.getLevelOneCategories();
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err,values) => {
			if(!err){
				this.props.handleAdd(values);
			}
		});
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      	labelCol: {
	       		xs: { span: 24 },
	      	  	sm: { span: 8 },
	    	},
	    	wrapperCol: {
	     	   	xs: { span: 24 },
	     	   	sm: { span: 16 },
	    	},
	    };
	    const tailFormItemLayout = {
		    wrapperCol: {
		        xs: {
		          span: 24,
		          offset: 0,
		        },
		        sm: {
		          span: 16,
		          offset: 8,
		       	},
		    },
	    };
		return(
			
			<Layout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>分类管理</Breadcrumb.Item>
						<Breadcrumb.Item>添加分类</Breadcrumb.Item>
					</Breadcrumb>
					<Form style={{ marginTop:30 }}>
						<FormItem
				          {...formItemLayout}
				          label="分类名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '填写分类名称!',
				            }],
				          })(
				            <Input style={{ width: 300 }} placeholder='填写分类名称'/>
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="分类列表"
				        >
				          {getFieldDecorator('pid', {
				            rules: [ {
				              required: true, message: '选择分类名称!',
				            }],
				          })(
				            <Select initialValue="0" style={{ width: 300 }}>
						      <Option value="0">根分类</Option>
						      {
						      	this.props.levelOneCategories.map((category)=>{
						      		return  <Option key={category.get('_id')} value={category.get('_id')}>{category.get('name')}</Option>
						      	})

						      }
						    </Select>
				          )}
				        </FormItem>
				        <FormItem {...tailFormItemLayout}>
				          <Button 
				          	type="primary" 
				          	onClick={ this.handleSubmit }
				          	loading = {this.props.isAddFetching}
				          >提交</Button>
				        </FormItem>

					</Form>

				</div>
			</Layout>
		)
	}

}

const mapStateToProps = (state)=>{
	return {
		isAddFetching:state.get('category').get('isAddFetching'),
		levelOneCategories:state.get('category').get('levelOneCategories')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		handleAdd:(values)=>{
 			dispatch(createActions.getAddAction(values));
		},
		getLevelOneCategories:()=>{
			dispatch(createActions.getLevelOneCategoriesAction());
		}
	}
}
const CategoryAdd = Form.create()(NormalLoginForm);
export default connect(mapStateToProps,mapDispatchToProps)(CategoryAdd);