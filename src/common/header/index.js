import { Layout,Menu, Dropdown, Icon } from 'antd';
import React,{ Component } from 'react';
import './index.css';
import { request,getUsername,removeUsername } from 'util';
import { ADMIN_LOGOUT } from 'api';
const { Header } = Layout;



class MyHeader extends Component{

	constructor(props){
  	super(props);
  	this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(){
  	request({
  		url:ADMIN_LOGOUT
  	})
  	.then((result)=>{
  		if(result.code == 0){
  			removeUsername();
  			window.location.href = '/login';
  		}
  	})
  	.catch(e=>{
  		console.log(e);
  	})
  }
  render(){
  	const menu = (
  <Menu onClick={this.handleLogout}>
    <Menu.Item key="0">
      <Icon type="logout" />退出
    </Menu.Item>
  </Menu>
);
    return(
    	<div>
    		<Header className="header">
	          <div className="logo">SHOPMALL</div>
	          <Dropdown overlay={menu} trigger={['click']}>
					    <a className="ant-dropdown-link" href="#">
					      { getUsername() } <Icon type="down" />
					    </a>
					  </Dropdown>
	      </Header>
    	</div>
    )
  }
}

export default MyHeader;