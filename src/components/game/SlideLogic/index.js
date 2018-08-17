import React from 'react';
import { Button, Tag, Modal } from 'antd';
import './slideLogic.css';

export default class SlideLogic extends React.Component {
    state = {
      score: 0,
      maxRecord: 0,
      gameOver: false,
      // viewValues: [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]],
      // rows: 4
      viewValues: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]],
      rows: 3
    };
    componentWillMount() {
      this.reStart();
    }
    componentDidMount() {
      document.addEventListener('keypress', e => this.handleKeyDown(e));
    }
    generateMatri = row => {
      const arr = [];
      for (let i = 0; i < row; i++) {
        arr[i] = new Array(row);
        arr[i].fill(-1);
      }
      return arr;
    }
    reStart = () => {
      const rows = this.state.rows;
      const area = rows * rows - 1;
      const matrie = this.generateMatri(rows);
      const location_1 = Math.floor(Math.random() * area + 1);
      let location_2 = Math.floor(Math.random() * area + 1);
      while (location_2 === location_1) {
        location_2 = Math.floor(Math.random() * area + 1);
      }
      const value_1 = Math.floor(Math.random() * 2 + 1);
      const value_2 = Math.floor(Math.random() * 2 + 1);
      const row_1 = Math.floor(location_1 / rows);
      const colomn_1 = Math.floor(location_1 % rows);
      const row_2 = Math.floor(location_2 / rows);
      const colomn_2 = Math.floor(location_2 % rows);
      const tmpViewValues = matrie;
      tmpViewValues[row_1][colomn_1] = value_1 * 2;
      tmpViewValues[row_2][colomn_2] = value_2 * 2;
      let { maxRecord } = this.state;
      if (this.state.score > maxRecord) {
        maxRecord = this.state.score;
      }
      this.setState({
        viewValues: tmpViewValues,
        gameOver: false,
        score: 0,
        maxRecord
      });
    }
    compactRow = arr => {
      const tem_arrs = arr.slice();
      for (let i = 0; i < tem_arrs.length; i++) {
        while (tem_arrs[i].indexOf(-1) >= 0) {
          tem_arrs[i].splice(tem_arrs[i].indexOf(-1), 1);
        }
      }
      for (let i = 0; i < tem_arrs.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (tem_arrs[i][j] == undefined) {
            tem_arrs[i][j] = -1;
          }
        }
      }
      console.log(tem_arrs);
      return (tem_arrs);
    }
    forMergeFindlly = array => {
      const tmp_arr = array.slice();
      console.log(tmp_arr);
      if (array.length === array[0].length) {
        for (let i = 0; i < array.length; i++) {
          for (let j = 0; j < array.length; j++) {
            if (array[i][j] !== -1 && array[i][j] == array[i][j + 1]) {
              tmp_arr[i][j] *= 2;
              console.log(tmp_arr);
              for (let k = j + 1; k < array.length - 1; k++) {
                tmp_arr[i][k] = tmp_arr[i][k + 1];
              }
              tmp_arr[i][array.length - 1] = -1;
            }
          }
        }
      }
      return tmp_arr;
    }
    judge = arr => {
      const tem_state = this.state.viewValues;
      let sign = false;
      for (let i = 0; i < arr.length; i++) {
        if (tem_state[i].indexOf(-1) >= 0) {
          sign = true;
        }
      }
      if (!sign) {
        for (let i = 0; i < arr.length - 1; i++) {
          for (let j = 0; j < arr.length - 1; j++) {
            if (arr[i][j] == arr[i][j + 1] || arr[i][j] == arr[i + 1][j]) {
            //  this.setState({ gameOver: true });
              return false;
            }
          }
        }
        this.setState({ gameOver: true });
        return false;
      }
      console.log('是否允许生成随机数:', sign);
      return sign;
    }
    generateRandom = tem_state_1 => {
      const area = tem_state_1.length * tem_state_1.length;
      if (this.judge(tem_state_1)) {
        const tem_state = tem_state_1;
        const value = Math.floor(Math.random() * 2 + 1);
        let location = Math.floor(Math.random() * area);
        let row = Math.floor(location / tem_state_1.length);
        let colomn = Math.floor(location % tem_state_1.length);
        while (tem_state[row][colomn] !== -1) {
          location = Math.floor(Math.random() * area);
          row = Math.floor(location / tem_state_1.length);
          colomn = Math.floor(location % tem_state_1.length);
        }
        tem_state[row][colomn] = value * 2;
        console.log('生成随机数后:', tem_state);
        this.setState({
          viewValues: tem_state,
          score: this.state.score + 5
        });
      } else {
      //  this.setState({ gameOver: true });
      }
    }
    reverseArray = arr => {
      if (arr[0] && arr.length === arr[0].length) {
        const tem_arrays = [];
        for (let i = 0; i < arr.length; i++) {
          const tem_array = [];
          for (let j = 0; j < arr.length; j++) {
            tem_array[j] = arr[j][i];
          }
          tem_arrays[i] = tem_array;
        }
        return tem_arrays;
      }
      return null;
    }
    reverseArrayDouble = arr => {
      if (arr[0] && arr.length === arr[0].length) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].reverse();
        }
      }
    }
    handleKeyDown = e => {
      console.log(e);
      let tmp_state = this.state.viewValues;
      if (e.key === 'w') {
        const arr = this.reverseArray(tmp_state);
        tmp_state = this.compactRow(arr);
        tmp_state = this.forMergeFindlly(tmp_state);
        tmp_state = this.reverseArray(tmp_state);
        this.generateRandom(tmp_state);
      } else if (e.key === 'a') {
        tmp_state = this.compactRow(this.state.viewValues);
        tmp_state = this.forMergeFindlly(tmp_state);
        this.generateRandom(tmp_state);
      } else if (e.key === 's') {
        const arr = this.reverseArray(tmp_state);
        this.reverseArrayDouble(arr);
        tmp_state = this.compactRow(arr);
        tmp_state = this.forMergeFindlly(tmp_state);
        this.reverseArrayDouble(tmp_state);
        tmp_state = this.reverseArray(tmp_state);
        this.generateRandom(tmp_state);
      } else if (e.key === 'd') {
        this.reverseArrayDouble(tmp_state);
        console.log(tmp_state);
        tmp_state = this.compactRow(this.state.viewValues);
        tmp_state = this.forMergeFindlly(tmp_state);
        this.reverseArrayDouble(tmp_state);
        this.generateRandom(tmp_state);
      }
    }
    renderGrid = () => {
      console.log('a');
      return this.state.viewValues.map(item => {
        console.log('a');
        return (item.map(value => {
          if (value == 2) {
            return (<div className="gener two">2</div>);
          }
          if (value == 4) {
            return (<div className="gener four">4</div>);
          }
          if (value == 8) {
            return (<div className="gener eight">8</div>);
          }
          if (value == 16) {
            return (<div className="gener sixteen">16</div>);
          }
          if (value == 32) {
            return (<div className="gener thirty">32</div>);
          }
          if (value == 64) {
            return (<div className="gener sixty">64</div>);
          }
          if (value == 128) {
            return (<div className="gener twenteen">128</div>);
          }
          if (value == 256) {
            return (<div className="gener twentyFive">256</div>);
          }
          if (value == 512) {
            return (<div className="gener fifty">512</div>);
          }
          if (value == 1024) {
            return (<div className="gener oneThousand">1024</div>);
          }
          if (value == 2048) {
            return (<div className="gener twoThousand">2048</div>);
          }
          return (<div className="gener zero" />);
        })
        );
      });
    }
    render() {
      return (
        <div className="gameView">
          <div className="top">
            <span>2048</span>
            <Tag>{`得分${this.state.score}`}</Tag>
            <Tag>{`最高分${this.state.maxRecord}`}</Tag>
          </div>
          <div className="middle">
            <span id="explain">操作说明</span>
            <Button onClick={this.reStart} >重新开始</Button>
          </div>
          <div className="gameOver">
            <Modal
              title="游戏结束"
              visible={this.state.gameOver}
              onOk={this.reStart}
              onCancel={this.reStart}
              okText="再来一局"
              cancelText="取消"
            >
              <p>{`得分:${this.state.score}`}</p>
            </Modal>
          </div>
          <div className="gameBody">
            {
              this.renderGrid()
            }
          </div>
        </div>
      );
    }
}
// forMergeUpDown = (array_1, array_2) => {
//   const tem_array = [[], [], []];
//   if (array_1.length === array_2.length) {
//     for (let i = 0; i < array_1.length; i++) {
//       if (array_1[i] !== -1 && array_1[i] === array_2[i]) {
//         tem_array[0][i] = array_1[i] + array_1[i];
//         tem_array[1][i] = -1;
//       } else if (array_1[i] === -1) {
//         tem_array[0][i] = array_2[i];
//         tem_array[1][i] = -1;
//       } else if (array_1[i] !== -1 && (array_2[i] !== -1)) {
//         tem_array[0][i] = array_1[i];
//         tem_array[1][i] = array_2[i];
//         tem_array[2][i] = array_2[i];
//       } else {
//         tem_array[0][i] = array_1[i];
//         tem_array[1][i] = array_2[i];
//       }
//     }
//   }
//   return tem_array;
// }
