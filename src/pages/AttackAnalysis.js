import React, { Component } from 'react';
import $ from 'jquery'

import TimeSelect from '../components/TimeSelect'
import AttackSourceIPChart from '../charts/AttackSourceIP'
import IPTopTable from '../components/IPTopTable'
import AttackIPRootChart from '../charts/AttackIPRoot'
import RootTopTable from '../components/RootTopTable'
import AttackTypeChart from '../charts/AttackType'
import TypeTopTable from '../components/TypeTopTable'
import AttackLocate from '../charts/AttackLocate'

import { timeSelect } from '../service/timeSelect'

class AttackAnalysis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: timeSelect.defaultTimeSelect().startTime,
      endTime: timeSelect.defaultTimeSelect().endTime,
      attackSourceIPResult: '',
      attackIPRootResult: '',
      attackTypeResult: '',
    }
    document.title = '攻击分析'
  }

  componentDidMount() {
    this.getAttackSourceIPResult()
    this.getAttackIPRootResult()
    this.getAttackTypeResult()
  }

  handleClickGo = () => {
    this.getAttackSourceIPResult()
    this.getAttackIPRootResult()
    this.getAttackTypeResult()
  }
  handleChangeStartTime = (e) => {
    this.setState({ startTime: e.target.value })
  }
  handleChangeEndTime = (e) => {
    this.setState({ endTime: e.target.value })
  }

  getAttackSourceIPResult = () => {
    $.ajax({
      url: '/AttackAnalysis/attacksourceip',
      type: 'post',
      scriptCharset: 'utf-8',
      dataType: 'json',
      data: {
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      },
      success: (result) => {
        if (result !== null) {
          console.log('攻击源IP分布', result)
          this.setState({ attackSourceIPResult: result })
        }
      },
      error: () => console.log('请求失败！')
    })
  }
  getAttackIPRootResult = () => {
    $.ajax({
      url: '/AttackAnalysis/attackSource',
      type: 'post',
      scriptCharset: 'utf-8',
      dataType: 'json',
      data: {
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      },
      success: (result) => {
        if (result !== null) {
          console.log('攻击源IP溯源', result)
          this.setState({ attackIPRootResult: result })
        }
      },
      error: () => console.log('请求失败！')
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
      <div style={{ height: 'calc(100% - 92px)' }}>
        <TimeSelect
          startTime={state.startTime}
          endTime={state.endTime}
          handleChangeStartTime={this.handleChangeStartTime}
          handleChangeEndTime={this.handleChangeEndTime}
          handleClickGo={this.handleClickGo}
        />
        <div className='analysis-home'>
          <div className='m-main'>
            <div className='analysis-left'>
              <div className="left-AttackSourceIP analysis-column-top">
                <div className="m-h"><b>攻击源IP分布</b></div>
                <div className="analysis-topWrap">
                  <AttackSourceIPChart
                    class='analysis-AttackSourceIP-chart'
                    datas={state.attackSourceIPResult}
                  />
                  <IPTopTable />
                </div>
              </div>
              <div className="left-AttackLocate analysis-column-bottom">
                <div className="m-h"><b>攻击定位</b></div>
                {/* <div className="AttackLocate-chart table"></div> */}
                <AttackLocate />
              </div>
            </div>
            <div className='analysis-right'>
              <div className="right-AttackIPRoot analysis-column-top">
                <div className="m-h"><b>攻击源IP溯源</b></div>
                <div className="analysis-topWrap">
                  <AttackIPRootChart
                    datas={state.attackIPRootResult}
                  />
                  <RootTopTable />
                </div>
              </div>
              <div className="right-AttackType analysis-column-bottom">
                <div className="m-h"><b>攻击类型统计</b></div>
                <div className="analysis-topWrap">
                  <AttackTypeChart
                    class='analysis-AttackType-chart table'
                    datas={state.attackTypeResult}
                  />
                  <TypeTopTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AttackAnalysis