import React, { Component } from 'react';
import $ from 'jquery'

import VisitCountChart from '../charts/VisitCount'
import AttackSourceIPChart from '../charts/AttackSourceIP'
import NewestAttackTable from '../components/NewestAttackTable'
import StateEvaluateChart from '../charts/StateEvaluate'
import AttackTypeChart from '../charts/AttackType'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attackSourceIPResult: '',
      stateEvaluateResult: '',
      attackTypeResult: '',
    }
    document.title = 'Web应用攻击检测及态势分析系统'
  }

  componentDidMount() {
    this.getAttackSourceIPResult()
    this.getStateEvaluateResult()
    setInterval(() => {
      this.getAttackTypeResult()
    }, 1000*20)
  }

  getAttackSourceIPResult = () => {
    $.ajax({
      url: '/AttackAnalysis/attacksourceip',
      type: 'post',
      scriptCharset: 'utf-8',
      dataType: 'json',
      success: (result) => {
        if (result !== null) {
          console.log('攻击源IP分布', result)
          this.setState({ attackSourceIPResult: result })
        }
      },
      error: () => console.log('请求失败！')
    })
  }
  getStateEvaluateResult = () => {
    $.ajax({
      url: '/Homepage/radarchart',
      type: 'post',
      scriptCharset: 'utf-8',
      dataType: "json",
      data: {
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      },
      success: (result) => {
        if (result != null) {
          console.log('态势评估', result);
          this.setState({ stateEvaluateResult: result })
        }
      },
      error: () => console.log("请求失败！")
    })
  }
  getAttackTypeResult = () => {
    $.ajax({
      url: '/AttackAnalysis/AttackCountTime',
      type: 'post',
      scriptCharset: 'utf-8',
      dataType: "json",
      data: {
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      },
      success: (result) => {
        if (result != null) {
          console.log('攻击类型', result);
          this.setState({ attackTypeResult: result })
        }
      },
      error: () => console.log("请求失败！")
    })
  }

  render() {
    const state = this.state
    return (
      <div className='g-home'>
        <div className="m-main">
          <div className="home-left">
            <div className="VisitCount home-left-top">
              <div className="m-h"><b>访问量时段统计</b></div>
              <VisitCountChart />
            </div>
            <div className="AttackSourceIP home-left-bottom">
              <div className="m-h"><b>攻击源IP分布</b></div>
              <AttackSourceIPChart
                class='AttackSourceIP-chart table'
                datas={state.attackSourceIPResult}
              />
            </div>
          </div>
          <div className="home-right">
            <div className="NewestAttack home-right-top">
              <div className="m-h"><b>最新攻击</b></div>
              <NewestAttackTable />
            </div>
            <StateEvaluateChart
              classWrap='StateEvaluate home-right-center'
              class={'StateEvaluate-chart table'}
              datas={state.stateEvaluateResult}
              link={true}
            />
            <div className="AttackType home-right-bottom">
              <div className="m-h"><b>攻击类型统计</b></div>
              <AttackTypeChart
                class='AttackType-chart table'
                datas={state.attackTypeResult}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home