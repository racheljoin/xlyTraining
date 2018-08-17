import React from 'react';
import 'antd/dist/antd.css';
import './App.css';

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
