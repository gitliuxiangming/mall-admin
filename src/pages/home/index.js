import React,{ Component } from 'react';
import { getUsername } from 'util'

class Home extends Component{

	render(){
		return(
			<div>{ getUsername() }</div>
		)
	}

}


export default Home;