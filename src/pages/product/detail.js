import React,{ Component } from 'react';
import Layout from 'common/layout';
import {connect} from 'react-redux';
import { Breadcrumb,Form,Input,Select,Button,InputNumber } from 'antd'
import * as createActions from './store/actionCreates.js'
import CategorySelector from './category-select.js'
import PicturesWall from 'common/upload-image/upload-image.js'
import { UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAIL_IMAGE } from 'api';
import RichEditor from 'common/rich-editor';

import './detail.css'
const FormItem = Form.Item;
const Option = Select.Option;


class NormalProductDetail extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state={
			ProductId:this.props.match.params.ProductId,
		}
	}
	componentDidMount(){
		if(this.state.ProductId){
			this.props.handleProductDetail(this.state.ProductId)
		}
	}
	
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err,values) => {
			values.id = this.state.ProductId
			this.props.handleSave(err,values);
		});
	}
	render(){
		const {
			parentCategoryId,
			categoryId,
			filePath,
			value,
			name,
			description,
			price,
			stock,
			detail
		} = this.props;
		let imgBox = '';
		if (filePath) {
			imgBox = filePath.split(',').map((img,index)=>(
				<li key={index}>
					<img src={img} />
				</li>
			))}
		/*
		let fileList = [];
		if(filePath){
			fileList = filePath.split(',').map((img,index)=>(
				<li key={index}>
					<img src={img} />
				</li>
			))
			// console.log('filePath:::',filePath)

		}
		*/

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
				<Breadcrumb>
					<Breadcrumb.Item>商品管理</Breadcrumb.Item>
					<Breadcrumb.Item>查看商品</Breadcrumb.Item>
				</Breadcrumb>
				<Form onSubmit={this.handleSubmit}>
					<FormItem
						{...formItemLayout}
						label="商品名称"
					>
						<Input value={name} disabled={true} />
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品描述"
					>
						<Input value={description} disabled={true} />
					</FormItem>
					<FormItem
						{...formItemLayout}
						required={true}
						label="所属分类"
						validateStatus={this.props.categoryIdValidateStatus}
						help={this.props.categoryIdHelp}
					>
						<CategorySelector 
							parentCategoryId={parentCategoryId}
							categoryId={categoryId}
							boolean={true}
							getCategoryId={(parentCategoryId,categoryId)=>{
								this.props.handleCategory(parentCategoryId,categoryId)
							}}
						/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品价格"
					>
						<InputNumber 
							value={price}
							min={0}
							formatter={value => `${value}元`}
							parser={value => value.replace('元', '')}
							disabled={true}
						/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品库存"
					>
						<InputNumber 
							disabled={true}
							value={stock}
							min={0}
							formatter={value => `${value}件`}
							parser={value => value.replace('件', '')}
						/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品图片"
					>
						<ul className='imgBox'>
							{imgBox}
						</ul>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品详情"
					>
						<div dangerouslySetInnerHTML={{__html:value}}></div>
					</FormItem>
				</Form>
			</Layout>

		)
	}

}

const mapStateToProps = (state)=>{
	return {
		categoryIdValidateStatus:state.get('product').get('categoryIdValidateStatus'),
		categoryIdHelp:state.get('product').get('categoryIdHelp'),
		parentCategoryId:state.get('product').get('parentCategoryId'),
		categoryId:state.get('product').get('categoryId'),
		filePath:state.get('product').get('filePath'),
		value:state.get('product').get('value'),
		name:state.get('product').get('name'),
		description:state.get('product').get('description'),
		price:state.get('product').get('price'),
		stock:state.get('product').get('stock'),


	}
}


const mapDispatchToProps = (dispatch)=>{
	return{
		handleProductDetail:(productId)=>{
			dispatch(createActions.getEditProductAction(productId))
		}
	}
}
const ProductDetail = Form.create()(NormalProductDetail);
export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);