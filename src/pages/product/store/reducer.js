import { fromJS } from 'immutable';
import * as types from './actionTypes.js';

//用fromJS包装一个immutable对象
const defaultState = fromJS({
	parentCategoryId:'',
	categoryId:'',
	filePath:'',
	value:'',
	categoryIdHelp:'',
	categoryIdValidateStatus:'',
	isAddFetching:false,
	isPageFetching:false,
	current:1,
	total:0,
	list:[],
	pageSize:10,
	name:'',
	description:'',
	price:'',
	stock:'',
	keyword:''
})

export default (state=defaultState,action)=>{
	if(action.type === types.SET_CATEGORY){
		return state.merge({
			parentCategoryId:action.payload.parentCategoryId,
			categoryId:action.payload.categoryId,
			categoryIdHelp:'',
			categoryIdValidateStatus:'',
		})
	}
	if(action.type === types.SET_IMAGE){
		return state.merge({
			filePath:action.payload.filePath
		})
	}
	if(action.type === types.SET_DETAIL){
		return state.merge({
			value:action.payload.value
		})
	}
	if(action.type === types.SAVE_REQUEST){
		return state.set('isAddFetching',true)
	}
	if(action.type === types.SAVE_DONE){
		return state.set('isAddFetching',false)
	}
	if (action.type === types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list),
			keyword:action.payload.keyword,
		})
	}
	if (action.type === types.PAGE_REQUEST) {
		return state.set("isPageFetching",true)
	}
	if (action.type === types.PAGE_DONE){
		return state.set("isPageFetching",false)
	}

	if (action.type === types.SET_CATEGORY_ERROR){
		return state.merge({
			categoryIdHelp:'请选择分类',
			categoryIdValidateStatus:'error',
		})
	}
	
	if (action.type === types.GET_DETAIL_ALL){
		return state.merge({
			parentCategoryId:action.payload.category.pid,
			categoryId:action.payload.category._id,
			filePath:action.payload.filePath,
			value:action.payload.value,
			name:action.payload.name,
			description:action.payload.description,
			price:action.payload.price,
			stock:action.payload.stoke,
		})
	}









	return state;
}