import React, { Component } from 'react';

class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div id='title_left'></div>
        <div id="title_right"></div>
        <div id="system_name">
          <img id="system_logo" src={require("../Images/logo.png")} alt='' />
          <div>Web态势感知</div>
        </div>
        <div id="score"><span id="score_1">态势评分：</span><span id="score_2">72</span></div>
        <div id="clock"></div>
        <div id="map"></div>
        <div id="requests_pie"></div>
        <div id="attacks_rose"></div>
        <div id="requests_line"></div>
        <div id="ip_top_bar"></div>
        <table id="attacks_info">
          <tbody>
            <tr className="table_tile">
              <th>序号</th>
              <th>时间</th>
              <th>攻击源IP</th>
              <th>被攻击IP</th>
              <th>攻击类型</th>
              <th>危害等级</th>
            </tr>
            <tr className="table_content">
              <th>1</th>
              <th>2019-03-31 18:26:04</th>
              <th>34.207.58.47</th>
              <th>172.24.5.155</th>
              <th>SQLi</th>
              <th>高</th>
            </tr>
            <tr className="table_content">
              <th>2</th>
              <th>2019-03-31 15:07:21</th>
              <th>107.23.91.71</th>
              <th>172.24.5.155</th>
              <th>SQLi</th>
              <th>高</th>
            </tr>
            <tr className="table_content">
              <th>3</th>
              <th>2019-03-31 13:14:30</th>
              <th>54.173.141.47</th>
              <th>172.24.5.155</th>
              <th>XSS</th>
              <th>高</th>
            </tr>
            <tr className="table_content">
              <th>4</th>
              <th>2019-03-31 12:11:14</th>
              <th>52.87.219.188</th>
              <th>172.24.5.155</th>
              <th>XPath</th>
              <th>中</th>
            </tr>
            <tr className="table_content">
              <th>5</th>
              <th>2019-03-31 10:20:19</th>
              <th>34.234.201.113</th>
              <th>172.24.5.155</th>
              <th>XPath</th>
              <th>中</th>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Screen