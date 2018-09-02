import React,{ Component } from 'react';
import { Select } from 'antd';
import { request } from 'util';
import { GET_CATEGORIES } from 'api';


const Option = Select.Option;

class CategorySelector extends Component{
	constructor(props){
		super(props);
		this.state ={
			levelOneCategories:[],
			levelOneCategoryId:'',
			levelTwoCategories:[],
			levelTwoCategoryId:'',
			needLoadLevelTwo:false,
			isChanged:false
		}
		this.handleLevelOneChange = this.handleLevelOneChange.bind(this)
		this.handleLevelTwoChange = this.handleLevelTwoChange.bind(this)
	}
	componentDidMount(){
		this.loadLevelOneCategory()
	}
	static getDerivedStateFromProps(props,state){
		const levelOneCategoyIdChanged = props.parentCategoryId !== state.levelOneCategoryId
		const levelTwoCategoyIdChanged = props.categoryId !== state.levelTwoCategoryId
		//如果分类id没有改变，就不更新
		if(!levelOneCategoyIdChanged && !levelTwoCategoyIdChanged){
			return null;
		}

		if(state.isChanged){
			return null;
		}

		if(props.parentCategoryId == 0){//只有一级分类
			return {
				levelOneCategoryId:props.categoryId,
				levelTwoCategoryId:"",
				isChanged:true
			}
		}else{
			return {
				levelOneCategoryId:props.parentCategoryId,
				levelTwoCategoryId:props.categoryId,
				needLoadLevelTwo:true,
				isChanged:true
			}
		}
		return null
		// this.state ={
		// 	levelOneCategories:[],
		// 	levelOneCategoryId:this.props.parentCategoryId,
		// 	levelTwoCategories:[],
		// 	levelTwoCategoryId:this.props.categoryId,
		// }
	}
	componentDidUpdate(){
		if(this.state.needLoadLevelTwo){
			this.loadLevelTwoCategory();
			this.setState({
				needLoadLevelTwo:false	
			})
		}
	}
	loadLevelOneCategory(){
		request({
			method:'get',
			url:GET_CATEGORIES,
			data:{
				pid:0
			}
		})
		.then((result)=>{
			if(result.code == 0){
				this.setState({
					levelOneCategories:result.data
				})
			}
		})
	}
	loadLevelTwoCategory(){
		request({
			method:'get',
			url:GET_CATEGORIES,
			data:{
				pid:this.state.levelOneCategoryId
			}
		})
		.then((result)=>{
			if(result.code == 0){
				this.setState({
					levelTwoCategories:result.data
				})
			}
		})
	}
	//选择一级分类处理事件
	handleLevelOneChange(value){
		this.setState({
			levelOneCategoryId:value,
			levelTwoCategories:[],
			levelTwoCategoryId:'',
		},()=>{
			this.loadLevelTwoCategory()
			this.onValueChange()
		})
	}

	handleLevelTwoChange(value){
		this.setState({
			levelTwoCategoryId:value,
		},()=>{
			this.onValueChange()
		})

	}

	onValueChange(){
		const{levelOneCategoryId,levelTwoCategoryId}=this.state;
		//如果有二级分类
		if(levelTwoCategoryId){
			this.props.getCategoryId(levelOneCategoryId,levelTwoCategoryId)
		}else{
			this.props.getCategoryId(0,levelOneCategoryId)
		}
		
	}

	render() {
		const{levelOneCategories,levelOneCategoryId,levelTwoCategories,levelTwoCategoryId}=this.state;
    	const levelOneOptions = levelOneCategories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
    	const levelTwoOptions = levelTwoCategories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
	    return (
	      <div>
	        <Select 
	       		defaultValue={levelOneCategoryId}
				value={levelOneCategoryId}
	        	style={{ width: 200,marginRight:20 }} 
	        	onChange={this.handleLevelOneChange}
	        >
	          { levelOneOptions	}
	        </Select>
	        {
				levelTwoOptions.length
				? <Select
					defaultValue={levelTwoCategoryId}
					value={levelTwoCategoryId}
					style={{ width: 200 }} 
					onChange={this.handleLevelTwoChange}>
						{levelTwoOptions}
				</Select>
				: null
			}
	      </div>
	    );
  	}
}

export default CategorySelector;