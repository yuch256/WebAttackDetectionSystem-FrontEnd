import React, { Component } from 'react';

// import $ from 'jquery'
import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/radar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/radar';
import 'echarts/lib/component/tooltip';

class StateEvaluateChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stateEvaluateValue: '',
      ifSec: true,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.datas) return
    this.setState({
      stateEvaluateValue: nextProps.datas[0],
      ifSec: nextProps.datas[0].toFixed(2) >= 60 ? true : false
    })
    this.updateData(nextProps.datas[1])
  }

  componentDidMount() {
    let stateEvaluateChart = echarts.init(document.getElementById("stateEvaluate"))
    stateEvaluateChart.setOption(this.option)
    this.stateEvaluateChart = stateEvaluateChart
    // $.ajax({
    //   url: '/Homepage/radarchart',
    //   type: 'post',
    //   scriptCharset: 'utf-8',
    //   dataType: "json",
    //   async: true,
    //   data: {
    //     startTime: this.props.startTime,
    //     endTime: this.props.endTime,
    //   },
    //   success: (result) => {
    //     if (result != null) {
    //       console.log('态势评估', result);
    //       this.setState({ stateEvaluateValue: result[0] })
    //       this.updateData(result[1])
    //       this.setState({ ifSec: result[0].toFixed(2) >= 60 ? true : false })
    //     }
    //   },
    //   error: () => console.log("请求失败！")
    // })
  }
  updateData = (datas) => {
    let max = radarMax(datas)
    this.stateEvaluateChart.setOption({
      series: [{ data: datas }],
      radar: {
        indicator: [
          { name: '权限', max: max },
          { name: '可控性', max: max },
          { name: '完整性', max: max },
        ]
      }
    })
  }

  option = {
    backgroundColor: '#27293D',
    tooltip: {},
    title: {
      // text: '态势——雷达图',
      left: 'center',
      textStyle: {
        color: '#eee'
      }
    },
    radar: {
      indicator: [
        { name: '权限', max: 15 },
        { name: '可控性', max: 6 },
        { name: '完整性', max: 8 },         //????????
      ],
      shape: 'circle',
      splitNumber: 5,
      name: {
        textStyle: {
          color: 'rgb(238, 197, 102)'
        }
      },
      splitLine: {
        lineStyle: {
          color: [
            'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
            'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
            'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
          ].reverse()
        }
      },
      splitArea: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(238, 197, 102, 0.5)'
        }
      }
    },
    series: [
      {
        name: '态势评估',
        type: 'radar',
        lineStyle: {
          normal: {
            width: 1,
            opacity: 0.5
          }
        },
        // data: datas,
        data: [],
        symbol: 'none',
        itemStyle: {
          normal: {
            color: '#3398DB'
          }
        },
        areaStyle: {
          normal: {
            opacity: 0.1
          }
        }
      }
    ]
  }

  render() {
    let { stateEvaluateValue } = this.state
    const props = this.props
    return (
      <div className={props.classWrap}>
        {
          this.state.ifSec ?
            <div className="m-h" style={{ backgroundColor: 'transparent' }}>
              <b>态势评估：</b>
              &nbsp;
              <span style={{ color: 'green', fontWeight: 'bold' }}>{stateEvaluateValue !== '' ? stateEvaluateValue.toFixed(2) : 'NULL'}</span>
              &nbsp;
              {
                props.link ? <div style={{ cursor: 'pointer' }} onClick={() => window.location.hash = 'StateEvaluate'}>点击查看详情</div> : null
              }
            </div> :
            <div className="m-h">
              <b>态势评估：</b>
              &nbsp;
              <span style={{ fontWeight: 'bold' }}>{stateEvaluateValue !== '' ? stateEvaluateValue.toFixed(2) : 'NULL'}</span>
              &nbsp;
              <img src={require("../Images/gantan.svg")} frameBorder="0" width="30px" alt='' />
              {
                props.link ? <div style={{ cursor: 'pointer' }} onClick={() => window.location.hash = 'StateEvaluate'}>点击查看告警详情</div> : null
              }
            </div>
        }
        <div className={props.class} id='stateEvaluate'></div>
      </div>
    )
  }
}

function radarMax(a) {
  let b = []
  a.forEach(item => {
    b.push(Math.max(...item))
  })
  return Math.max(...b) < 1 ? 1 : Math.max(...b)
}

export default StateEvaluateChart