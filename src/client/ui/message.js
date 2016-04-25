import React from 'react';

require('assets/styles/chatroomContainer.scss');


export default React.createClass({
	
	render:function(){
		const message = this.props.message;

		const messageStyle = {
			backgroundColor: message.color,
			borderColor: message.color,
			color: "#404040",
			fontFamily: message.font,
			fontSize: message.fontSize,
			fontStyle: message.fontStyle || "normal"
		};

		const userNameStyle = {
			color: "black",
		};

		if (message.userName === 'system') {
			userNameStyle.fontFamily = messageStyle.fontFamily;
			userNameStyle.fontSize = messageStyle.fontSize;
			userNameStyle.fontStyle = messageStyle.fontStyle;
		}

		const time = message.time ? new Date(message.time).toLocaleTimeString() : "";

		return(
			<div className="messageLine">
				<span style={userNameStyle}>{message.userName}</span>
				<span style={messageStyle} className="messageBubble">{message.content}</span>
				<span className="time" >{time}</span>
			</div>
		)
	}
})

function lighten(color, percent) {
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}