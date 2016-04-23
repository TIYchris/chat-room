import React from 'react';
import { Link } from 'react-router';
require('normalize.scss/normalize.scss');
require('assets/styles/app.scss');

export default React.createClass({
  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})