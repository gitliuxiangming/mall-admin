import { Layout } from 'antd';
import React,{ Component } from 'react';
import MyHeader from 'common/header';
import { request,getUsername,removeUsername } from 'util';
import MySider from 'common/sider';
const { Content } = Layout;

class MyLayout extends Component{
  render(){
    return(
      <Layout>
        <MyHeader />
        <Layout>
          <MySider />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default MyLayout;