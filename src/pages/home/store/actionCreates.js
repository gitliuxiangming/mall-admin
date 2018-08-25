import { request,setUsername,removeUsername } from 'util';
import { message } from 'antd';
import { ADMIN_COUNT } from 'api';
import * as types from './actionTypes.js';


const setCountAction = (payload)=>{
	return{
		type:types.SET_COUNT,
		payload
	}
}

export const GetCountAction = ()=>{
	return (dispatch)=>{
        request({
			url: ADMIN_COUNT,
		})
		.then((result)=>{
			//获取数据成功	
			if(result.code == 0){
				console.log(result)
				dispatch(setCountAction(result.data));
				
			}else if(result.code == 1){
				message.error('获取统计数据失败')
			}
		})
		.catch((err)=>{
			message.error('获取统计数据网络错误,请稍后在试!')
		})
	}
}