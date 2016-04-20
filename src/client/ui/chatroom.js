import React from 'react';

require('assets/styles/chatroomContainer.scss');

export default React.createClass({
	render: function(){
		return(
			<div>
	    		<h1 className="title">The Chat Room</h1>
	    		<div id="chatarea">
  					{this.props.messages.map(function(message, index){
  						return (<div key={index}>{message}</div>)
  					})}
  				</div>
	    		<form id="chatform" onSubmit={this.props.onSubmit}>
    				<input className="text" type="text" id="chatfield" />
    				<button className="button" type="submit">Submit</button>
  				</form>
	    	</div>
		)
}})