// import { combineReducers } from 'redux';
//redux-immutable中的combineReducers方法成的store中的state数据是immutable格式的
import { combineReducers } from 'redux-immutable';

import { reducer as loginReducer } from '../pages/login/store/';
import { reducer as homeReducer } from '../pages/home/store/';
import { reducer as userReducer } from '../pages/user/store/';
import { reducer as categoryReducer } from '../pages/category/store/';

export default combineReducers({ 
	login:loginReducer,
	home:homeReducer,
	user:userReducer,
	category:categoryReducer,
});