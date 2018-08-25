import React,{ Component } from 'react';
import Layout from 'common/layout';
import { Table } from 'antd'
 

 const columns = [{
	  title: '用户名',
	  dataIndex: 'username',
	  key: 'username',
	},
	{
	  title: '是否管理员',
	  dataIndex: 'isAdmin',
	  key: 'isAdmin',
	  render:isAdmin=>(isAdmin?'是':'否')
	}]


const dataSource = [{
	  key: '1',
	  username: 'admin',
	  isAdmin: true,
	}, 
	{
	  key: '2',
	  username: 'test1',
	  isAdmin: false,
	}];


class User extends Component{

	render(){
		
		const data =[];
		for(let i=0;i<500;i++){
			data.push({
				key:i,
				username:'test'+i,
				isAdmin:false
			})
		}
			
		return(
			<div>
				<Layout>
					<Table 
						dataSource={data} 
						columns={columns} 
						pagination={
							{
								// defaultCurrut:1,
								// total:500,
								// pageSize:10
							}
							
						}
					/>
				</Layout>
			</div>
		)
	}

}


export default User;