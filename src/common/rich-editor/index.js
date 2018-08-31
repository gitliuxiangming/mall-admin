import React,{Component} from 'react';
import Simditor from 'simditor'

import 'simditor/styles/simditor.css'
class RichEditor extends Component{
	constructor(props){
		super(props)
		this.toolbar = [
		  'title',
		  'bold',
		  'italic',
		  'underline',
		  'strikethrough',
		  'fontScale',
		  'color',
		  'ol',
		  'ul',
		  'blockquote',
		  'code',
		  'table',
		  'link',
		  'image',
		  'hr',            
		  'indent',
		  'outdent',
		  'alignment',
		]
	}
	componentDidMount(){
		new Simditor({
		  textarea: this.textarea,
		  toolbar:this.toolbar,
		  upload:{ 
		    url:this.props.action,
		    params: null,
		    fileKey: 'upload_file',
		    connectionCount: 3,
		    leaveConfirm: 'Uploading is in progress, are you sure to leave this page?'
		  }
 		});
	}

	render(){
		return(
			<textarea ref={(textarea)=>{this.textarea=textarea}}></textarea>
		)
	}

}

export default RichEditor;