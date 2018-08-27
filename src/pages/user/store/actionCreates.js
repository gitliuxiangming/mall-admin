import * as types from './actionTypes.js';
import {  request } from 'util';
import {  GET_USERS } from 'api';
import {  message } from 'antd';


export const getPageRequestAction = ()=>{
	return {
		type:types.PAGE_REQUEST
	}
}
export const getPageDoneAction = ()=>{
	return {
		type:types.PAGE_DONE
	}
}
export const getSetPageAction = (payload)=>{
	return {
		type:types.SET_PAGE,
		payload
	}
}
export const getPageAction = (page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction());
		request({
			url: GET_USERS,
			data:{
				page:page
			}
		})
		.then((result) => {
			if (result.code === 0) {
				dispatch(getSetPageAction(result.data));
				dispatch(getPageDoneAction());
			}else{
				message.error('获取数据失败')
			}
			dispatch(getPageDoneAction());
		})
		.catch(function (err) {
			message.error('服务器错误')
			const action = getPageDoneAction();
			dispatch(action);
		});
	}
}