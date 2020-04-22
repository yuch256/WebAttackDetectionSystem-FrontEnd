import React, { Component } from 'react'
import $ from 'jquery'

class RootTopTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rootTopTableResult: '',
    }
  }
  componentDidMount() {
    $.ajax({
      url: '/AttackAnalysis/sourceIpTop',
      type: 'post',
      scriptCharset: 'utf-8',
      dataType: "json",
      async: true,
      success: (result) => {
        if (result != null) {
          console.log('攻击源IP溯源table', result);
          this.setState({ rootTopTableResult: result })
        }
      },
      error: () => console.log("请求失败！")
    })
  }
  render() {
    let { rootTopTableResult } = this.state
    return (
      <div className="rootTop">
        <div className="topHead">本周活跃攻击地</div>
        {
          rootTopTableResult !== [] && rootTopTableResult !== '' ?
            (
              <div className="topMain">
                {
                  rootTopTableResult[0].map((item, index) => {
                    return (
                      <div className={index % 2 === 0 ? "diffTrColor" : null}>
                        <span>{index + 1}</span>
                        <span style={{ marginLeft: 5 }}>{item}</span>
                        <span style={{ marginLeft: 5 }}>{`${(rootTopTableResult[1][index] * 100).toFixed(2)}%`}</span>
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

export default RootTopTable