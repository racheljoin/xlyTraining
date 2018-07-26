import React from 'react';
import { Button } from 'antd';

export default class Buttons extends React.Component {
  handleButtonClick = () => {
    const { todos, Actions } = this.props;
    if (todos.text) {
      Actions.addTodo('');
      return;
    }
    Actions.addTodo('test appear');
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.handleButtonClick}>Primary test</Button>
        <Button type="danger">Danger</Button>
        <div>{this.props.todos.text}</div>
      </div>
    );
  }
}
