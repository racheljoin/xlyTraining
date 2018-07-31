import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';
import * as api from '../api';

import * as actionCreators from '../actions';

class Test extends React.Component {
  state = {
    inputVal: ''
  };

  handleInputChange = e => {
    this.setState({
      inputVal: e.target.value
    });
  }

  handleButtonClick = () => {
    const { inputVal } = this.state;
    const { dispatch } = this.props;
    // Actions.fetchGithubUser(inputVal, dispatch);
    api.fetchGithubUser(inputVal, dispatch);
  }

  render() {
    const { todos, Actions } = this.props;
    return (
      <div>
        <input value={this.state.inputVal} onChange={this.handleInputChange} />
        <Button type="primary" onClick={this.handleButtonClick}>{`请求拉取${this.state.inputVal}`}</Button>
        <div>
          <img src={this.state.avatar} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { todos } = state;
  return {
    todos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // Actions: bindActionCreators(actionCreators, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)
