import React, { Component } from 'react';

import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';

class attackSourceIPChart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillReceiveProps(nextProps) {
    this.updateData(nextProps.datas)
  }
  componentDidMount() {
    const attackSourceIPChart = echarts.init(document.getElementById("attackSourceIP"))
    attackSourceIPChart.setOption(this.option)
    this.attackSourceIPChart = attackSourceIPChart;
    // $.ajax({
    //   url: '/AttackAnalysis/attacksourceip',
    //   type: 'post',
    //   scriptCharset: 'utf-8',
    //   dataType: 'json',
    //   async: true,
    //   data: {
    //     startTime: this.props.startTime,
    //     endTime: this.props.endTime,
    //   },
    //   success: (result) => {
    //     if (result !== null) {
    //       console.log('攻击源IP分布', result)
    //       this.updateData(result)
    //     }
    //   },
    //   error: () => console.log('请求失败！')
    // })
  }
  updateData = (datas) => {
    if (!datas) return
    this.attackSourceIPChart.setOption({
      xAxis: { data: datas[0] },
      series: [
        { data: datas[1] },
        { data: datas[1] },
      ],
    })
  }

  option = {
    backgroundColor: '#27293D',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['line', 'bar'],
      textStyle: {
        color: '#ccc'
      }
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '3%',
      top: '5%',
      show: false,
      containLabel: true,
      backgroundColor: '#333'
    },
    xAxis: {
      data: [],
      // data: datas[0],
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      }
    },
    yAxis: {
      splitLine: { show: false },
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      }
    },
    series: [{
      name: 'line',
      type: 'line',
      smooth: true,
      showAllSymbol: true,
      symbol: 'emptyCircle',
      symbolSize: 15,
      data: [],
      // data: datas[1]
    }, {
      name: 'bar',
      type: 'bar',
      barWidth: 10,
      itemStyle: {
        normal: {
          barBorderRadius: 5,
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              { offset: 0, color: '#14c8d4' },
              { offset: 1, color: '#43eec6' }
            ]
          )
        }
      },
      data: [],
      // data: datas[1]
    }]
  }
  render() {
    return (

      // <div className="AttackSourceIP-chart table" id='attackSourceIP'></div>
      <div className={this.props.class} id='attackSourceIP'>
      </div>
    )
  }
}

export default attackSourceIPChart