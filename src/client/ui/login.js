import React from 'react';
import store from 'store';

export default React.createClass({
    getInitialState: function() {
        return {};
    },

    onSubmit: function(e){
      e.preventDefault();

      if (!this.refs.title.value){
        return;
      }

      window.localStorage.setItem('userName', this.refs.title.value);
      window.localStorage.setItem('color', this.refs.color.value);

      location.reload();
    },

    render: function () {
      return (
        <form className="popupContainer">
            <label className="titleLabel">Your Name!</label>
            <input ref="title" className="titleInput" type="text"></input>
            <button className="tubmit" onClick={this.onSubmit}>SUBMIT</button>
            <input type="color" ref="color" />
        </form>
      )
    }
})