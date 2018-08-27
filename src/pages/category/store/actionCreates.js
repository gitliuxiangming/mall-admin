import { request,setUsername,removeUsername } from 'util';
import { message } from 'antd';
import { ADD_CATEGORY } from 'api';
import * as types from './actionTypes.js';

const getAddRequstAction = ()=>{
	return{
		type:types.ADD_REQUEST
	}
}
const getAddDoneAction = ()=>{
	return{
		type:types.ADD_DONE
	}
}

export const GetAddAction = (values)=>{
	return (dispatch)=>{
		dispatch(getAddRequstAction());
        request({
			method: 'post',
			url: ADD_CATEGORY,
			data: values
		})
		.then((result)=>{
			dispatch(getAddDoneAction())
		})
		.catch((err)=>{
			message.error('网络错误,请稍后在试!')
			dispatch(getAddDoneAction())				
		})
	}
}