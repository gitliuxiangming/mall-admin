import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	isFetching:false,
	current:1,
	total:300,
	list:[],
	pageSize:10
})
export default function(state = defaultState,action){
	if (action.type === types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)
		})
	}
	if (action.type === types.PAGE_REQUEST) {
		return state.set("isFetching",true)
	}
	if (action.type === types.PAGE_DONE){
		return state.set("isFetching",false)
	}
	return state;
};