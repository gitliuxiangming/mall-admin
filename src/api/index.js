const SERVER = 'http://127.0.0.1:3000/';

export const ADMIN_LOGIN = SERVER+'admin/login';
export const ADMIN_COUNT = SERVER+'admin/count';
export const GET_USERS = SERVER+'admin/users';

export const ADMIN_LOGOUT = SERVER+'user/logout';

export const ADD_CATEGORY = SERVER+'category';
export const GET_CATEGORIES = SERVER+'category';
export const GET_INPUTVALUE = SERVER+'category/updateName';
export const CHANGE_ORDER = SERVER+'category/updateOrder';

export const UPLOAD_PRODUCT_IMAGE = SERVER+'product/uploadImage';
export const UPLOAD_PRODUCT_DETAIL_IMAGE = SERVER+'product/uploadDetailImage';
export const SAVE_PRODUCT = SERVER+'product';
export const GET_PRODUCT = SERVER+'product';
export const CHANGE_PRODUCT_ORDER = SERVER+'product/updateOrder';
export const CHANGE_PRODUCT_STATUS = SERVER+'product/updateStatus';
export const GET_PRODUCT_EDIT = SERVER+'product/detail';



export const GET_PRODUCTS_SEARCH = SERVER+'product/search';

export const GET_ORDERS = SERVER+'order/all';
export const GET_ORDERS_SEARCH = SERVER+'order/search';
export const GET_ORDERS_DETAIL = SERVER+'order/detail';
export const GET_ORDERS_DELIVER = SERVER+'order/deliver';


