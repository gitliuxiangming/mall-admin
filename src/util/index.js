import axios from 'axios';


export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		axios({
			method: options.method || 'get',
			url: options.url || '',
			data: options.data || null,
			 withCredentials:true
		})
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