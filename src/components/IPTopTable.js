import React, { Component } from 'react';

import $ from 'jquery'

class IPTopTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ipTopTableResult: ''
    }
  }
  componentDidMount() {
    $.ajax({
      url: '/AttackAnalysis/ipTopTable',
      type: 'post',
      scriptCharset: 'utf-8',
      dataType: 'json',
      async: true,
      success: (result) => {
        if (result !== null) {
          console.log('攻击源IP分布table', result)
          this.setState({ ipTopTableResult: result })
        }
      },
      error: () => console.log('请求失败！')
    })
  }
  render() {
    let { ipTopTableResult } = this.state
    return (
      <div className="IPTop">
        <div className="topHead">本周活跃攻击源</div>
        {
          ipTopTableResult !== [] && ipTopTableResult !== '' ?
            (
              <div className="topMain">
                {
                  ipTopTableResult[0].map((item, index) => {
                    return (
                      <div className={index % 2 === 0 ? "diffTrColor" : null}>
                        <span>{index + 1}</span>
                        <span style={{ marginLeft: 5 }}>{item}</span>
                        <span style={{ marginLeft: 5 }}>{`${(ipTopTableResult[1][index] * 100).toFixed(2)}%`}</span>
                      </div>
                    )
                  })
                }
              </div>
            )
            : <div className='topMainNull'>暂无数据</div>
        }
      </div>
    )
  }
}

export default IPTopTable