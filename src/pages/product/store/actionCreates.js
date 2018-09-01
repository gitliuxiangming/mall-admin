import { request,setUsername,removeUsername } from 'util';
import { message } from 'antd';
import { ADD_PRODUCT,GET_PRODUCT,CHANGE_PRODUCT_ORDER,CHANGE_PRODUCT_STATUS } from 'api';
import * as types from './actionTypes.js';


export const getSetCategoryAction = (parentCategoryId,categoryId)=>{
	return{
		type:types.SET_CATEGORY,
		payload:{
			parentCategoryId,
			categoryId
		}
	}
}


export const getSetImageAction = (filePath)=>{
	return{
		type:types.SET_IMAGE,
		payload:{
			filePath
		}
	}
}

export const getSetDetailAction = (value)=>{
	return{
		type:types.SET_DETAIL,
		payload:{
			value
		}
	}
}


//生成action
export const getSaveRequstAction = ()=>{
	return{
		type:types.SAVE_REQUEST
	}
}
export const getSaveDoneAction = ()=>{
	return{
		type:types.SAVE_DONE
	}
}
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

export const setCategoryError = (payload)=>{
	return {
		type:types.SET_CATEGORY_ERROR,
		payload
	}
}














//方法
export const getSaveAction = (err,values)=>{
	return (dispatch,getState)=>{
		const state=getState().get('product');
		const categoryId=state.get('categoryId');
		if(!categoryId){
			dispatch(setCategoryError())
			return;
		}
		if(err){
			return;
		}
        request({
			method: 'post',
			url: ADD_PRODUCT,
			data: {
				...values,
				category:categoryId,
				value:state.get('value'),
				filePath:state.get('filePath')
			}
		})
		.then((result)=>{
			if(result.code == 0){
				message.success(result.message);
				window.location.href = '/product';
			}else{
				message.error('已存在!')
			}
		})
		.catch((err)=>{
			message.error('网络错误,请稍后在试!')
			dispatch(getSaveDoneAction())				
		})
	}
}



export const getPageAction = (page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction());
		request({
			url: GET_PRODUCT,
			data:{
				page:page
			}
		})
		.then((result) => {
			if (result.code == 0) {
				dispatch(getSetPageAction(result.data));
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

export const getChangeOrderAction = (id,newOrder)=>{
	return (dispatch,getState)=>{
		const state=getState().get('product')
		request({
			method:'put',
			url: CHANGE_PRODUCT_ORDER,
			data:{
				id:id,
				order:newOrder,
				page:state.get('current')
			}
		})
		.then((result) => {
			if (result.code == 0) {
				dispatch(getSetPageAction(result.data));
			}else{
				message.error(result.message)
			}
		})
		.catch(function (err) {
			message.error('服务器错误')
		});
	}
}


export const getChangeStatusAction = (id,newStatus)=>{
	return (dispatch,getState)=>{
		const state=getState().get('product')
		request({
			method:'put',
			url: CHANGE_PRODUCT_STATUS,
			data:{
				id:id,
				status:newStatus,
				page:state.get('current')
			}
		})
		.then((result) => {
			if (result.code == 0) {
				message.success(result.message)
			}else{
				dispatch(getSetPageAction(result.data));
				message.error(result.message)
			}
			
		})
		.catch(function (err) {
			message.error('服务器错误')
		});
	}
}