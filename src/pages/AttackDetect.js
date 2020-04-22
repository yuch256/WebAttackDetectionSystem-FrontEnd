import React, { Component } from 'react';
import $ from 'jquery'

import AttackHistoryTable from '../components/AttackHistoryTable'
import DetectResultTable from '../components/DetectResultTable'
import DetailInfor from '../components/DetailInfor'
import LogInfor from '../components/LogInfor'
import BehaviorAnalysis from '../components/BehaviorAnalysis'
//固定的每张页面大小
const historyTablePageSize = 6
const resultTablePageSize = 3

class AttackDetect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      historyTableCurrentPage: 1,
      historyTableTotalPage: 999,
      resultTableCurrentPage: 1,
      resultTableTotalPage: 999,
      attackHistoryTableResult: '',
      judgeOnChange: false,
      pathname: 'DetailInfor',
      currentRowDatas: '',
      //攻击详情--详细信息状态
      attackDetailResult: '',
      attackJudge: 'NULL',
      ifJudgeOnChange: false,
      reviewResult: '正确',
    }
    document.title = '攻击检测'
  }

  componentWillMount() {
    $.ajax({
      url: '/AttackDetection/HistoricAttackStatistics',
      type: 'post',
      scriptCharset: 'utf-8',
      dataType: 'json',
      success: (result) => {
        if (result !== null) {
          console.log('历史攻击统计', result)
          this.setState({
            historyTableTotalPage: Math.ceil(result.length / historyTablePageSize),
            resultTableTotalPage: Math.ceil(result.length / resultTablePageSize),
            attackHistoryTableResult: result,
          }, () => console.log(this.state))
          this.getAttackDetailResult(result[0])
        }
      },
      error: () => console.log('请求失败！')
    })
  }

  //历史攻击统计table前一页、后一页、选择页数事件
  handleClickHistoryTablePrev = () => {
    let historyTableCurrentPage = this.state.historyTableCurrentPage
    let historyTableTotalPage = this.state.historyTableTotalPage
    if (historyTableCurrentPage > 1 && historyTableCurrentPage <= historyTableTotalPage) {
      this.setState({ historyTableCurrentPage: historyTableCurrentPage - 1 })
    }
  }
  handleClickHistoryTableNext = () => {
    let historyTableCurrentPage = this.state.historyTableCurrentPage
    let historyTableTotalPage = this.state.historyTableTotalPage
    if (historyTableCurrentPage < historyTableTotalPage) {
      this.setState({ historyTableCurrentPage: historyTableCurrentPage + 1 })
    }
  }
  handleChangeHistoryTablePager = (e) => {
    this.setState({ historyTableCurrentPage: e.target.value })
  }
  //检测结果审核table前一页、后一页、选择页数事件
  handleClickResultTablePrev = () => {
    let resultTableCurrentPage = this.state.resultTableCurrentPage
    let resultTableTotalPage = this.state.resultTableTotalPage
    if (resultTableCurrentPage > 1 && resultTableCurrentPage <= resultTableTotalPage) {
      this.setState({ resultTableCurrentPage: resultTableCurrentPage - 1 })
    }
  }
  handleClickResultTableNext = () => {
    let resultTableCurrentPage = this.state.resultTableCurrentPage
    let resultTableTotalPage = this.state.resultTableTotalPage
    if (resultTableCurrentPage < resultTableTotalPage) {
      this.setState({ resultTableCurrentPage: resultTableCurrentPage + 1 })
    }
  }
  handleChangeResultTablePager = (e) => {
    this.setState({ resultTableCurrentPage: e.target.value })
  }
  //点击历史攻击统计table某行发送当前行key值，获取数据更新攻击详情
  handleClickAttackHistoryRow = (e) => {
    const time = e.currentTarget.getElementsByTagName('td')[0].innerText
    const ip = e.currentTarget.getElementsByTagName('td')[2].innerText
    this.setState({ pathname: e.target.innerText === ip ? 'BehaviorAnalysis' : 'DetailInfor' })
    const item = this.state.attackHistoryTableResult
    for (var i in item) {
      if (item[i].includes(time)) {
        this.getAttackDetailResult(item[i])
        this.setState({ currentRowDatas: item[i] })
        break
      }
    }
  }

  getAttackDetailResult = (item) => {
    $.ajax({
      url: '/AttackDetection/AttackDetails',
      type: 'post',
      dataType: 'json',
      scriptCharset: 'utf-8',
      data: { id: item[0] },
      success: result => {
        console.log('攻击详情', result)
        this.setState({
          attackDetailResult: result,
          attackJudge: result[0],
        })
      },
      error: () => console.log('请求失败！')
    })
  }
  //攻击详情--详细信息事件
  handleChangeAttackJudge = (e) => {
    this.setState({ attackJudge: e.target.value })
  }
  handleClickAttackJudgeBt = () => {
    this.setState({ ifJudgeOnChange: !this.state.ifJudgeOnChange })
    if (!this.state.ifJudgeOnChange) {
      //更新审核结果表
    }
  }
  handleClickReviewResultBt = () => {
    this.setState(state => ({
      reviewResult: state.reviewResult === '正确' ? '错误' : '正确'
    }))
  }

  render() {
    const state = this.state
    return (
      <div className='g-home'>
        <div className='m-main'>
          <div className='detect-left'>
            <AttackHistoryTable
              datas={state.attackHistoryTableResult}
              pageSize={historyTablePageSize}
              currentPage={state.historyTableCurrentPage}
              totalPage={state.historyTableTotalPage}
              handleClickPrev={this.handleClickHistoryTablePrev}
              handleClickNext={this.handleClickHistoryTableNext}
              handleChangePager={this.handleChangeHistoryTablePager}
              handleClickRow={this.handleClickAttackHistoryRow}
            />
            <DetectResultTable
              datas={state.attackHistoryTableResult}
              pageSize={resultTablePageSize}
              currentPage={state.resultTableCurrentPage}
              totalPage={state.resultTableTotalPage}
              handleClickPrev={this.handleClickResultTablePrev}
              handleClickNext={this.handleClickResultTableNext}
              handleChangePager={this.handleChangeResultTablePager}
            />

          </div>
          <div className='detect-right'>
            <div className="right-AttackDetail">
              <div className="m-h"><b>攻击详情</b></div>
              <div className="detailMain">
                <div className='detailNav'>
                  <div className="detailWrap">
                    <div onClick={() => this.setState({ pathname: 'DetailInfor' })} className={state.pathname === 'DetailInfor' ? 'detailOn' : null}>详细信息</div>
                    <div onClick={() => this.setState({ pathname: 'LogInfor' })} className={state.pathname === 'LogInfor' ? 'detailOn' : null}>查看日志</div>
                    <div onClick={() => this.setState({ pathname: 'BehaviorAnalysis' })} className={state.pathname === 'BehaviorAnalysis' ? 'detailOn' : null}>行为分析</div>
                  </div>
                </div>
                <div className='detailTable'>
                  <div style={{ display: state.pathname === 'DetailInfor' ? 'block' : 'none' }}>
                    <DetailInfor
                      datas={state.attackDetailResult}
                      attackJudge={state.attackJudge}
                      reviewResult={state.reviewResult}
                      ifJudgeOnChange={state.ifJudgeOnChange}
                      handleClickAttackJudgeBt={this.handleClickAttackJudgeBt}
                      handleChangeAttackJudge={this.handleChangeAttackJudge}
                      handleClickReviewResultBt={this.handleClickReviewResultBt}
                    />
                  </div>
                  <div style={{ display: state.pathname === 'LogInfor' ? 'block' : 'none' }}>
                    <LogInfor datas={state.attackDetailResult} />
                  </div>
                  <div style={{ display: state.pathname === 'BehaviorAnalysis' ? 'block' : 'none' }}>
                    <BehaviorAnalysis datas={state.attackDetailResult} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AttackDetect