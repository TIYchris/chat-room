import React from 'react';
import store from 'store';
import { loginUser } from 'actions/actions';


require('assets/styles/login.scss');

export default React.createClass({
    getInitialState: function() {
        return {};
    },

    onSubmit: function(e){
      e.preventDefault();

      if (!this.refs.title.value){
        return;
      }

      loginUser(this.refs.title.value);
    },

    render: function () {
      return (
        <form className="popupContainer">
            <label htmlFor="userName" className="titleLabel">Enter Your Name!</label>
            <input ref="title" className="titleInput" type="text"></input>
            <button className="submit" onClick={this.onSubmit}>SUBMIT</button>
        </form>
      )
    }
})