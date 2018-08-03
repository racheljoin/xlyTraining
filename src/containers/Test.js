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

  handleLessonClick = id => {
    console.log(id);
    this.props.Actions.changeLessonName(id);
  }

  _renderLessons = list => {
    return list.map(lesson => (
      <div key={lesson.id} onClick={() => this.handleLessonClick(lesson.id)}>
        {lesson.classInfo.id}
        <div>
          {lesson.beCommenttedRate}
        </div>
      </div>
    ));
  }

  render() {
    const { currentLessonList, historyLessonList } = this.props;
    return (
      <div>
        <div>
          当前课程
          {this._renderLessons(currentLessonList)}
        </div>
        <div>
          历史课程
          {this._renderLessons(historyLessonList)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { lessons } = state;
  const currentLessonList = lessons.currentLessonIds.map(id => lessons.lessonEntities[id]);
  const historyLessonList = lessons.historyLessonIds.map(id => lessons.lessonEntities[id]);
  return {
    currentLessonList,
    historyLessonList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Actions: bindActionCreators(actionCreators, dispatch)
    // dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)
