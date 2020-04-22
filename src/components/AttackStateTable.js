import React, { Component } from 'react';

class AttackStateTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attackStateTableResult: [[]],
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (!nextProps.datas) return
    this.setState({ attackStateTableResult: nextProps.datas })
  }

  componentDidMount() {
    // $.ajax({
    //     url: '/SituationAssessment/AttackSituationAssessmentStatistics',
    //     type: 'post',
    //     scriptCharset: 'utf-8',
    //     dataType: 'json',
    //     async: true,
    //     data: {
    //         startTime: this.props.startTime,
    //         endTime: this.props.endTime,
    //     },
    //     success: (result) => {
    //         if (result !== null) {
    //             console.log('攻击态势评估统计', result)
    //             result.unshift([null, '发生频率', '威胁权重', '发生次数', '态势值'])
    //             this.setState({ attackStateTableResult: result })
    //         }
    //     },
    //     error: () => console.log('请求失败！')
    // })
  }
  render() {
    let { attackStateTableResult } = this.state
    let tbodytr = []
    let tbody = () => {
      for (let i = 1; i < attackStateTableResult[0].length; i++) {
        tbodytr.push(
          <tr className={i % 2 === 1 ? "diffTrColor" : null} key={Math.random()}>
            {
              attackStateTableResult.map((item, index) => {
                return (
                  <td key={Math.random()}>{String(item[i]).indexOf('.') === -1 ? item[i] : item[i].toFixed(2)}</td>
                )
              })
            }
          </tr>
        )
      }
      return tbodytr
    }

    return (
      <div className="AttackEvaluete-ul table">
        <table className="m-state-table">
          <thead style={{ fontSize: '2.2vh', lineHeight: '5rem' }}>
            <tr>
              {
                attackStateTableResult.map(item => {
                  return (
                    <th key={Math.random()}>{item[0]}</th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody style={{ fontSize: '2vh' }}>
            {tbody()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AttackStateTable