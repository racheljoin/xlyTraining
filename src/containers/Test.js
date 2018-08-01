import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';
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
    const { Actions } = this.props;
    // Actions.fetchUserInfo(inputVal);
    Actions.fetchLessonInfo(inputVal);
  }

  handleAdd = () => {
    this.props.Actions.addTodo();
  }

  render() {
    const { todos, Actions } = this.props;
    return (
      <div>
        <input value={this.state.inputVal} onChange={this.handleInputChange} />
        <Button type="primary" onClick={this.handleButtonClick}>{`请求拉取${this.state.inputVal}`}</Button>
        <Button type="primary" onClick={this.handleAdd}>add</Button>
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
    Actions: bindActionCreators(actionCreators, dispatch)
    // dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)
