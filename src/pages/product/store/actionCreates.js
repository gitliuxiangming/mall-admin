import { request,setUsername,removeUsername } from 'util';
import { message } from 'antd';
import { ADD_PRODUCT } from 'api';
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
		console.log('拿不到ID',categoryId)
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
			console.log(result)
			/*
			if(result.code == 0){
				if(result.data){
					dispatch(setLevelOneCategories(result.data))			
				}else{
					message.success('添加分类成功');					
				}
				window.location.href = '/category';
			}else{
				message.error('已存在!')
			}
			*/

		})
		.catch((err)=>{
			message.error('网络错误,请稍后在试!')
			dispatch(getSaveDoneAction())				
		})
	}
}



export const getPageAction = (pid,page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction());
		request({
			url: GET_CATEGORIES,
			data:{
				pid:pid,
				page:page
			}
		})
		.then((result) => {
			if (result.code == 0) {
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
