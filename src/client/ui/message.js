import React from 'react';

require('assets/styles/chatroomContainer.scss');


export default React.createClass({
	
	render:function(){
		var messageStyle = {
			color: this.props.message.color
		};

		return(
			<div style={messageStyle}>
				<span>{this.props.message.userName}:</span>
				<span>{this.props.message.content}</span>
			</div>
		)
	}
})