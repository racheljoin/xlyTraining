import React from 'react';
import './gameHome.css';
import SlideLogic from '../components/game/SlideLogic';

export default class GameHome extends React.Component {
  state = {
  };

  render() {
    return (
      <div className="allPage">
        <SlideLogic />
      </div>
    );
  }
}
