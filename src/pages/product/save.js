import React,{ Component } from 'react';
import Layout from 'common/layout';
import {connect} from 'react-redux';
import { Breadcrumb,Form,Input,Select,Button,InputNumber } from 'antd'
import * as createActions from './store/actionCreates.js'
import CategorySelector from './category-select.js'
import PicturesWall from 'common/upload-image/upload-image.js'
import { UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAIL_IMAGE } from 'api';
import RichEditor from 'common/rich-editor';
const FormItem = Form.Item;
const Option = Select.Option;


class NormalProductSave extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state={
			ProductId:this.props.match.params.ProductId,
		}
	}
	componentDidMount(){
		if(this.state.ProductId){
			this.props.handleEditProduct(this.state.ProductId)
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
			stock
		} = this.props;
		let fileList = [];
		if(filePath){
			fileList = filePath.split(',').map((img,index)=>({
				uid:index,
				status:"done",
				url:img,
				response:img
			}))
			// console.log('filePath:::',filePath)

		}
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
						<Breadcrumb.Item>
							{
								this.state.ProductId
								?	'编辑商品'
								:	'添加商品'
							}
						</Breadcrumb.Item>
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
				            initialValue:name
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
				            initialValue:description
				          })(
				            <Input style={{ width: 300 }} placeholder='填写商品描述'/>
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="所属分类"
				          required={true}
				          validateStatus={this.props.categoryIdValidateStatus}
				          help={this.props.categoryIdHelp}
				        >
				          <CategorySelector 
				          		parentCategoryId={parentCategoryId}
				          		categoryId={categoryId}
				          		getCategoryId={(parentCategoryId,categoryId)=>{
				          			this.props.handleCategory(parentCategoryId,categoryId)
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
				            initialValue:price
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
				            initialValue:stock
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
				          required={true}
				          validateStatus={this.props.imagesIdValidateStatus}
				          help={this.props.imagesIdHelp}
				        >
				        	<PicturesWall 
				        		action={UPLOAD_PRODUCT_IMAGE}
				        		imageMax={3}
				        		fileList={fileList}
				        		getFileList={
				        			(fileList)=>{
				        				this.props.handleImage(fileList)
				        			}
				        		}
				        	/>
				          
				        </FormItem>
				         <FormItem
				          {...formItemLayout}
				          label="商品详情"
				        >
				          <RichEditor 
				          	action={UPLOAD_PRODUCT_DETAIL_IMAGE}
				          	getRichEditorValue={(value)=>{
				          		this.props.handleDetail(value)
				          	}}
				          	detail={value}
				          />
				        </FormItem>
				        <FormItem {...tailFormItemLayout}>
				          <Button 
				          	type="primary" 
				          	onClick={ this.handleSubmit }
				          	loading = {this.props.isAddFetching}
				          >
				          	提交
				          </Button>
				        </FormItem>
					</Form>

				</div>
			</Layout>
		)
	}

}

const mapStateToProps = (state)=>{
	return {
		categoryIdValidateStatus:state.get('product').get('categoryIdValidateStatus'),
		categoryIdHelp:state.get('product').get('categoryIdHelp'),
		iamgesIdValidateStatus:state.get('product').get('iamgesIdValidateStatus'),
		imagesIdHelp:state.get('product').get('imagesIdHelp'),
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
		handleCategory:(parentCategoryId,categoryId)=>{
			dispatch(createActions.getSetCategoryAction(parentCategoryId,categoryId));
		},
		handleImage:(fileList)=>{
			dispatch(createActions.getSetImageAction(fileList));
		},
		handleDetail:(value)=>{
			dispatch(createActions.getSetDetailAction(value));
		},
		handleSave:(err,values)=>{
 			dispatch(createActions.getSaveAction(err,values));
		},
		handleEditProduct:(ProductId)=>{
 			dispatch(createActions.getEditProductAction(ProductId));
		}
	}
}
const ProductSave = Form.create()(NormalProductSave);
export default connect(mapStateToProps,mapDispatchToProps)(ProductSave);