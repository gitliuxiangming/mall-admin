// import { combineReducers } from 'redux';
//redux-immutable中的combineReducers方法成的store中的state数据是immutable格式的
import { combineReducers } from 'redux-immutable';

import { reducer as loginReducer } from '../pages/login/store/';

export default combineReducers({ 
	login:loginReducer
});