import { request,setUsername,removeUsername } from 'util';
import { message } from 'antd';
import { ADMIN_LOGIN } from 'api';
import * as types from './actionTypes.js';

const getLoginRequstAction = ()=>{
	return{
		type:types.LOGIN_REQUEST
	}
}
const getLoginDoneAction = ()=>{
	return{
		type:types.LOGIN_DONE
	}
}

export const GetInitDataActionFn = (values)=>{
	return (dispatch)=>{
		dispatch(getLoginRequstAction());
        request({
			method: 'post',
			url: ADMIN_LOGIN,
			data: values
		})
		.then((result)=>{
			//登录成功	
			if(result.code == 0){
				//存储用户信息在浏览器
				setUsername(result.data.username);
				window.location.href = '/';
			}else if(data.code == 1){
				message.error(data.mesages)
			}
			dispatch(getLoginDoneAction());
		})
		.catch((err)=>{
			message.error('网络错误,请稍后在试!')
			dispatch(getLoginDoneAction())				
		})
	}
}