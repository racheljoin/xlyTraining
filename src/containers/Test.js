import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../actions';
import Buttons from '../components/Buttons';

class Test extends React.Component {
  render() {
    const { todos, Actions } = this.props;
    return (
      <div>
        <Buttons todos={todos} Actions={Actions} />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)
