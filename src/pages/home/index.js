import React,{ Component } from 'react';
import { getUserName } from 'util'

class Home extends Component{

	render(){
		return(
			<div>{ getUserName() }</div>
		)
	}

}


export default Home;