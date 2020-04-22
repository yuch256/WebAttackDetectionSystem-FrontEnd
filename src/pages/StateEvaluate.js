import React, { Component } from 'react';
import $ from 'jquery'

import TimeSelect from '../components/TimeSelect'
import StateEvaluateChart from '../charts/StateEvaluate'
import AttackStateTable from '../components/AttackStateTable'
import HistoryEvaluate from '../charts/HistoryEvaluate'

import { timeSelect } from '../service/timeSelect'

class StateEvaluate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: timeSelect.defaultTimeSelect().startTime,
      endTime: timeSelect.defaultTimeSelect().endTime,
      stateEvaluateResult: '',
      historyEvaluateResult: '',
      attackStateTableResult: '',
    }
    document.title = '态势评估'
  }

  componentWillMount() {
    this.getStateEvaluateResult()
    this.getHistoryEvaluateResult()
    this.getAttackStateTableResult()
  }

  handleClickGo = () => {
    this.getStateEvaluateResult()
    this.getHistoryEvaluateResult()
    this.getAttackStateTableResult()
  }

  handleChangeStartTime = (e) => {
    this.setState({ startTime: e.target.value })
  }
  handleChangeEndTime = (e) => {
    this.setState({ endTime: e.target.value })
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
  getHistoryEvaluateResult = () => {
    $.ajax({
      url: '/SituationAssessment/HistoricalAssessmentTrendStatistics',
      type: 'post',
      scriptCharset: 'utf-8',
      dataType: 'json',
      data: {
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      },
      success: (result) => {
        if (result != null) {
          console.log('历史评估趋势统计', result);
          this.setState({ historyEvaluateResult: result })
        }
      },
      error: () => console.log("请求失败！")
    });
  }
  getAttackStateTableResult = () => {
    $.ajax({
      url: '/SituationAssessment/AttackSituationAssessmentStatistics',
      type: 'post',
      scriptCharset: 'utf-8',
      dataType: 'json',
      data: {
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      },
      success: (result) => {
        if (result !== null) {
          console.log('攻击态势评估统计', result)
          result.unshift([null, '发生频率', '威胁权重', '发生次数', '态势值'])
          this.setState({ attackStateTableResult: result })
        }
      },
      error: () => console.log('请求失败！')
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
        <div className="state-home">
          <div className="state-main">
            <div className="state-top">
              <StateEvaluateChart
                classWrap='StateEvaluate state-row-left'
                class='StateEvaluate-chart table'
                link={false}
                datas={state.stateEvaluateResult}
              />
              <div className="AttackEvaluete state-row-right">
                <div className="m-h"><b>攻击态势评估统计</b></div>
                <AttackStateTable
                  datas={state.attackStateTableResult}
                />
              </div>
            </div>
            <div className="state-bottom">
              <div className="HistoryEvaluate">
                <div className="m-h"><b>历史评估趋势统计</b></div>
                <HistoryEvaluate
                  datas={state.historyEvaluateResult}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StateEvaluate