import React, { Component } from 'react'

import $ from 'jquery'

class TypeTopTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typeTopTableResult: '',
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/AttackAnalysis/attackTypeTable',
      type: 'post',
      scriptCharset: 'utf-8',
      dataType: "json",
      async: true,
      success: (result) => {
        if (result != null) {
          console.log('攻击类型table', result);
          this.setState({ typeTopTableResult: result })
        }
      },
      error: () => console.log("请求失败！")
    })
  }
  render() {
    let { typeTopTableResult } = this.state
    return (
      <div className="typeTop">
        {this.props.uio}
        <div className="topHead">本周攻击类型Top5</div>
        {
          typeTopTableResult !== '' ?
            (
              <div className="topMain">
                {
                  typeTopTableResult.map((item, index) => {
                    return (
                      <div className={index % 2 === 0 ? "diffTrColor" : null}>
                        <span>{index + 1}</span>
                        <span style={{ marginLeft: 5 }}>{item}</span>
                      </div>
                    )
                  })
                }
              </div>
            ) :
            <div className='topMainNull'>暂无数据</div>
        }
      </div>
    )
  }
}

export default TypeTopTable