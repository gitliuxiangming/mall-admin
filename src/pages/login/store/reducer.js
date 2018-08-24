import { fromJS } from 'immutable';
import * as types from './actionTypes.js';

//用fromJS包装一个immutable对象
const defaultState = fromJS({
	isFetching:true
})

export default (state=defaultState,action)=>{
	if(action.type === types.LOGIN_REQUEST){
		return state.set('isFetching',true)
	}

	if(action.type === types.LOGIN_DINE){
		return state.set('isFetching',false)
	}
	return state;
}