import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';

class Test extends React.Component {
  state = {
    inputVal: ''
  };

  componentDidMount() {
    this.props.Actions.fetchLessonInfo(1000);
  }

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

  goAbout = () => {
    this.props.router.push('about');
  }

  render() {
    return (
      <div>
        <input value={this.state.inputVal} onChange={this.handleInputChange} />
        <Button type="primary" onClick={this.handleButtonClick}>{`请求拉取${this.state.inputVal}`}</Button>
        <Button type="primary" onClick={this.handleAdd}>add</Button>
        <div>
          <img src={this.state.avatar} alt="" />
        </div>
        <div>
          <Button onClick={this.goAbout}>go to about</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { lessons } = state;
  return {
    lessons
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Actions: bindActionCreators(actionCreators, dispatch)
    // dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)
