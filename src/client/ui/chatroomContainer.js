import React from 'react';
import io from 'socket.io-client';
import { addMessage, loginUser , logoutUser } from 'actions/actions';
import store from 'store';
import Message from 'ui/message';
import Login from 'ui/login';

require('assets/styles/chatroomContainer.scss');


export default React.createClass({
	getInitialState:function(){
		return {
			messages: [],
			currentMessage: '',
      userName: window.localStorage.getItem('userName'),
      currentColor: window.localStorage.getItem('color'),
      fontSize: window.localStorage.getItem('fontSize')
		};
	},

	componentWillMount: function () {
		this.unsubscribe = store.subscribe(this.storeUpdated);

    if (this.state.userName) {
      loginUser(this.state.userName);
    }
	},

  storeUpdated: function(){
      const currentStore = store.getState();
      this.setState({
          currentMessage: '',
          messages: currentStore.messageReducer.messages,
          userName: currentStore.messageReducer.userName,
          users: currentStore.messageReducer.users
      });
  },

	componentWillUnmount: function () {
    	this.unsubscribe();
  },

	onChange: function () {
    	this.setState({
      		currentMessage: this.refs.messageInput.value
    	});
  },

  colorClicked: function(e) {
    e.preventDefault();
    window.localStorage.setItem('color', e.target.style.backgroundColor);
    this.setState({
      currentColor: e.target.style.backgroundColor
    })
  },

	onSubmit: function(e){
    	e.preventDefault();
      window.localStorage.setItem('font', this.refs.font.value);

    	if (this.state.currentMessage !== '') {
        const message = {
          content: this.state.currentMessage,
          userName: this.state.userName,
          color: window.localStorage.getItem('color'),
          font: window.localStorage.getItem('font'),
          fontSize: window.localStorage.getItem('fontSize'),
          time: new Date()
        };
      	addMessage(message);
      	this.setState({
        	currentMessage: ''
      	});
    	}
    	this.refs.messageInput.focus();
  },

  componentWillUpdate: function () {
    	const node = this.refs.messages;
      if (!node) {
        return;
      }

    	this.shouldScrollBottom = (node.scrollTop + node.offsetHeight) === node.scrollHeight;
  },

  componentDidUpdate: function () {
      const node = this.refs.messages;
   		if (node && this.shouldScrollBottom) {
      		node.scrollTop = node.scrollHeight
    	}
 	},

  logout: function() {
    logoutUser(this.state.userName);
  },

  getColorStyle: function(color) {
    const selected = this.state.currentColor === color;
    return {
      backgroundColor: color,
      border: selected ? "5px solid " + color : "0px solid transparent",
      borderRadius: selected ? "5px" : "3px"
    };
  },

  onFontSizeChange: function(e) {
    window.localStorage.setItem('fontSize', e.target.value);
    this.setState({
      fontSize: e.target.value
    });
  },

	render: function () {
    const small = this.state.fontSize === "12px";
    const normal = this.state.fontSize === "16px";
    const large = this.state.fontSize === "24px";

      if (!this.state.userName) {
         return (<Login />);
      }

	    return (
        <div>
			<h1 className="title">The Chat Room</h1>
  	    	<div className="chatContainer">
  	    		<div id="chatarea" ref="messages">
    					{this.state.messages.map(function(message, index){
    						return (<Message key={index} message={message} />)
    					})}
    				</div>
  	    		<form id="chatform" onSubmit={this.onSubmit}>
      				<input autoComplete="off" className="text" ref="messageInput" onChange={this.onChange} value={this.state.currentMessage} type="text" id="chatfield" />
      			  <button className="button" type="submit">Submit</button>
    				</form>
  	    	</div>
          <button className="logout" onClick={this.logout}>Logout</button>
          <div className="usersBox">
            {this.state.users.map(function(user, index){
              return (<div key={index}>{user}</div>)
            })}
          </div>
          <form className="prefs">
              <div>
                <div onClick={this.colorClicked} className="colorSwatch" style={this.getColorStyle("rgb(0, 0, 0)")}></div>
                <div onClick={this.colorClicked} className="colorSwatch" style={this.getColorStyle("rgb(255, 0, 0)")}></div>
                <div onClick={this.colorClicked} className="colorSwatch" style={this.getColorStyle("rgb(0, 255, 0)")}></div>
                <div onClick={this.colorClicked} className="colorSwatch" style={this.getColorStyle("rgb(0, 0, 255)")}></div>
                <div onClick={this.colorClicked} className="colorSwatch" style={this.getColorStyle("rgb(255, 255, 0)")}></div>
                <div onClick={this.colorClicked} className="colorSwatch" style={this.getColorStyle("rgb(0, 255, 255)")}></div>
                <div onClick={this.colorClicked} className="colorSwatch" style={this.getColorStyle("rgb(255, 0, 255)")}></div>
                <div onClick={this.colorClicked} className="colorSwatch" style={this.getColorStyle("rgb(255, 128, 0)")}></div>
              </div>
              <div className="fontSize">
                <div className="firstFont">
                  <input onChange={this.onFontSizeChange} type="radio" value='12px' checked={small}></input>
                  <label className="fontLabel" style={{fontSize: '12px'}}>small</label>
                </div>
                <div>
                  <input onChange={this.onFontSizeChange} type="radio" value='16px' checked={normal}></input>
                  <label className="fontLabel" style={{fontSize: '16px'}}>normal</label>
                </div>
                <div>
                  <input onChange={this.onFontSizeChange} type="radio" value='24px' checked={large}></input>
                  <label className="fontLabel" style={{fontSize: '24px'}}>large</label>
                </div>
              </div>
              <select ref="font">
                <option value="Arial">Arial</option>
                <option value="Arial Black, Gadget, sans-serif">Arial Black</option>
                <option value="Comic Sans MS">Comic Sans</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Impact, Charcoal, sans-serif">Impact</option>
                <option value="Tahoma, Geneva, sans-serif">Tahoma</option>
                <option value='"Courier New", Courier, monospace'>Courier</option>
                <option value='"Lucida Console", Monaco, monospace'>Console</option>
              </select>
            </form>
        </div>
	    )
	}
});
