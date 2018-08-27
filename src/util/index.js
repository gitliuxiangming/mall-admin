import axios from 'axios';


export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		const params = {
			method: options.method || 'get',
			url: options.url || '',
			withCredentials: true
		}
		switch (params.method.toUpperCase()){
			case 'GET':
			case 'DELETE':
				params.params = options.data;
				break;
			default:
				params.data = options.data
		}

		axios(params)
		.then(result=>{
			let data = result.data;
			if(data.code == 10){
				removeUsername()
				window.location.href = '/login';
				reject(err);
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

export const getUsername = ()=>{
	return window.localStorage.getItem('username')
}

export const removeUsername = ()=>{
	return window.localStorage.removeItem('username')
}