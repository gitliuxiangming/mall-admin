import React,{Component} from 'react';
import Simditor from 'simditor';
import $ from 'jquery';

import 'simditor/styles/simditor.css'
import './index.css';

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
		//juqery ajax 设置跨域携带cookie
		$.ajaxSetup({
			xhrFields:{
				withCredentials:true
			}
		})
	}
	componentDidMount(){
		this.editor=new Simditor({
		  textarea: $(this.textarea),
		  toolbar:this.toolbar,
		  upload:{ 
		    url:this.props.action,
		    fileKey: 'upload',
		  }
 		});
 		//与父组件之间的通讯 靠父组件传递函数 在子组件中调用此函数 并将父组件想要的值 当作参数 由此函数传递到父组件
 		this.editor.on('valuechanged',()=>{ 
 			this.props.getRichEditorValue(this.editor.getValue())
 		})
	}

	render(){
		return(
			<textarea ref={(textarea)=>{this.textarea=textarea}}></textarea>
		)
	}

}

export default RichEditor;