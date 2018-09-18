import { request,setUsername,removeUsername } from 'util';
import { message } from 'antd';
import { 
	SEARCH_ORDERS,
	GET_ORDERS,
	GET_ORDER_DETAIL,
	DELIVER_GOODS
} from 'api';
import * as types from './actionTypes.js';


//生成action
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

export const setOrderDetail = (payload)=>{
	return {
		type:types.SET_ORDER_DETAIL,
		payload
	}
}
export const getOrderDetailAction = (orderNo)=>{
	return (dispatch)=>{
		request({
			url: GET_ORDER_DETAIL,
			data:{
				orderNo:orderNo
			}
		})
		.then((result) => {
			if (result.code == 0) {
				dispatch(setOrderDetail(result.data));
			}else{
				message.error('获取数据失败')
			}
			dispatch(getPageDoneAction());
		})
		.catch(function (err) {
			message.error('服务器错误，挂载中')
			const action = getPageDoneAction();
			dispatch(action);
		});
	}
}

export const getPageAction = (page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction());
		request({
			url: GET_ORDERS,
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
			message.error('服务器错误，挂载中')
			const action = getPageDoneAction();
			dispatch(action);
		});
	}
}

export const getSearchAction = (keyword,page)=>{
	return (dispatch)=>{
		request({
			method:'get',
			url: SEARCH_ORDERS,
			data:{
				keyword,
				page
			}
		})
		.then((result) => {
			if (result.code === 0) {
				dispatch(getSetPageAction(result.data));
			}else{
				message.error(result.message)
			}
		})
		.catch(function (err) {
			message.error('获取数据失败')
		});
	}
}
//发货按钮处理
export const handleDeliverAction=(orderNo)=>{

    return (dispatch,getState)=>{
              
               request({
					method:'put',
					url: DELIVER_GOODS,
					data:{
						orderNo:orderNo
					}
				})
                .then((result)=>{
                 	console.log('sdsaskldflasjdklfjasklfasdfs',result)
                    if(result.code == 0){
                        dispatch(getSetPageAction(result.data))
                       
                    }
                    else if(result.code == 1){
                    message.error('网络错误，请稍后重试');
                       
                    }
                })
                .catch(e=>{
                    console.log(e)
                })

           }
}
