import React,{ Component } from 'react';
import Layout from 'common/layout';
import {connect} from 'react-redux';
import { Breadcrumb,Form,Input,Select,Button,InputNumber } from 'antd'
import * as createActions from './store/actionCreates.js'
import CategorySelector from './category-select.js'
const FormItem = Form.Item;
const Option = Select.Option;


class NormalProductSave extends Component{
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
	      	  	sm: { span: 2 },
	    	},
	    	wrapperCol: {
	     	   	xs: { span: 24 },
	     	   	sm: { span: 22 },
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
		          offset: 2,
		       	},
		    },
	    };
		return(
			
			<Layout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>商品管理</Breadcrumb.Item>
						<Breadcrumb.Item>添加商品</Breadcrumb.Item>
					</Breadcrumb>
					<Form style={{ marginTop:30 }}>
						<FormItem
				          {...formItemLayout}
				          label="商品名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '填写商品名称!',
				            }],
				          })(
				            <Input style={{ width: 300 }} placeholder='填写商品名称'/>
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >
				          {getFieldDecorator('description', {
				            rules: [{
				              required: true, message: '填写商品描述!',
				            }],
				          })(
				            <Input style={{ width: 300 }} placeholder='填写商品描述'/>
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="所属分类"
				        >
				          <CategorySelector 
				          		getCategoryId={(pid,id)=>{

				          		}}
				          />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品价格"
				        >
				          {getFieldDecorator('price', {
				            rules: [{
				              required: true, message: '填写商品价格!',
				            }],
				          })(
				            <InputNumber 
				            	initialValue={100}
							    min={0}
							    formatter={value => `${value}元`}
							    parser={value => value.replace('元', '')}
				            />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品库存"
				        >
				          {getFieldDecorator('stoke', {
				            rules: [{
				              required: true, message: '填写商品库存!',
				            }],
				          })(
				            <InputNumber 
				            	initialValue={100}
							    min={0}
							    formatter={value => `${value}件`}
							    parser={value => value.replace('件', '')}
				            />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品图片"
				        >

				          
				        </FormItem>
				         <FormItem
				          {...formItemLayout}
				          label="商品详情"
				        >
				          
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
const ProductSave = Form.create()(NormalProductSave);
export default connect(mapStateToProps,mapDispatchToProps)(ProductSave);