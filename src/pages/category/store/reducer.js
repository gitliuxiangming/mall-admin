import { fromJS } from 'immutable';
import * as types from './actionTypes.js';

//用fromJS包装一个immutable对象
const defaultState = fromJS({
	isAddFetching:false,
	levelOneCategories:[],
	isPageFetching:false,
	current:1,
	total:0,
	list:[],
	pageSize:10,
	updateModalVisible:false
})

export default (state=defaultState,action)=>{
	if(action.type === types.ADD_REQUEST){
		return state.set('isAddFetching',true)
	}
	if(action.type === types.ADD_DINE){
		return state.set('isAddFetching',false)
	}
	if(action.type === types.SET_LEVEL_ONE_CATEGORIES){
		return state.set('levelOneCategories',fromJS(action.payload))
	}
	if (action.type === types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)
		})
	}
	if (action.type === types.PAGE_REQUEST) {
		return state.set("isPageFetching",true)
	}
	if (action.type === types.PAGE_DONE){
		return state.set("isPageFetching",false)
	}
	if (action.type === types.SHOW_UPDATE_MODAL){
		return state.merge({
			"updateModalVisible":true,
			updateId:action.payload.updateId,
			updateName:action.payload.updateName
		})
	}
	if (action.type === types.HIDE_UPDATE_MODAL){
		return state.set("updateModalVisible",false)				
	}
	if (action.type === types.CHANGE_UPDATE_MODAL){
		return state.merge({
			"updateModalVisible":true,
			updateId:action.payload.updateId,
			updateName:action.payload.updateName
		})
	}
	return state;
}