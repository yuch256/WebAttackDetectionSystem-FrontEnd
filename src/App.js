import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import $ from 'jquery'

import './App.css'
import Home from './pages/Home'
import AttackDetect from './pages/AttackDetect'
import AttackAnalysis from './pages/AttackAnalysis'
import StateEvaluate from './pages/StateEvaluate'
import Screen from './pages/Screen'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isScreen: false,
      news: '99+',
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/AttackDetection/AttackCount',
      type: 'post',
      scriptCharset: 'utf-8',
      dataType: 'json',
      success: result => {
        this.setState({ news: result })
      },
      error: () => console.log('请求失败！')
    })
  }

  render() {
    return (
      <div className="App" style={{ height: '100vh' }}>
        <Router>
          <header style={{ display: this.state.isScreen ? 'none' : 'block' }}>
            <div className='head-wrap'>
              <div className='head-logo'>
                <Link to='/Screen'>
                  <img src={require('./Images/logo.png')} alt="" />
                </Link>
                <div className='head-h'>
                  <b className="zh">Web应用攻击检测及态势分析系统</b>
                  <b className="en">Web Attack Detection and Security Situation Assessment System</b>
                </div>
              </div>
              <div className='head-menu'>
                <NavLink to="/" exact activeClassName='menu-1'>首页</NavLink>
                <NavLink to="/AttackDetect" activeClassName='menu-1'>
                  <div onClick={() => this.setState({ news: null })}>
                    攻击检测
                    <span style={{ display: this.state.news ? null : 'none' }} className='news'>{this.state.news}</span>
                  </div>
                </NavLink>
                <NavLink to="/AttackAnalysis" activeClassName='menu-1'>攻击分析</NavLink>
                <NavLink to="/StateEvaluate" activeClassName='menu-1'>态势评估</NavLink>
              </div>
              <div className="head-infor">
                <time>Last Updated:
                  2019-03-13 01:35:05
                </time>
                <div className="head-pers">
                  <img src={require("./Images/user.svg")} alt="" />
                  <i></i>
                </div>
              </div>
            </div>
          </header>

          <Route path='/' exact component={Home} />
          <Route path='/AttackDetect' component={AttackDetect} />
          <Route path='/AttackAnalysis' component={AttackAnalysis} />
          <Route path='/StateEvaluate' component={StateEvaluate} />
          <Route path='/Screen' component={Screen} />
        </Router>
      </div>
    );
  }
}

export default App;