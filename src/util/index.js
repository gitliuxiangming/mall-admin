import axios from 'axios';

export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		axios({
			method: options.method || 'get',
			url: options.url || '',
			data: options.data || null
		})
		.then(result=>{
			let data = result.data;
			if(data.code == 10){
				reject(err);
				window.location.href = '/login';
			}
			resolve(data)

		})
		.catch(err=>{
			reject(err)
		})
	})
}


export const setUsername = (username)=>{
	return window.localStorage.setItem('username',username)
}

export const getUserName = ()=>{
	return window.localStorage.getItem('username')
}

export const removeUsername = ()=>{
	return window.localStorage.removeItem('username')
}