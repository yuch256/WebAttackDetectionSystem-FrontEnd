import React, { Component } from 'react';

import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';

class AttackTypeChart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.updateData(nextProps.datas)
  }

  componentDidMount() {
    const attackTypeChart = echarts.init(document.getElementById("attackType"))
    attackTypeChart.showLoading()
    this.attackTypeChart = attackTypeChart
    // this.ajaxGo()
    // let interval = setInterval(() => {
    //   if (window.location.hash === '#/AttackAnalysis') clearInterval(interval)
    //   console.log(1)
    //   this.ajaxGo()
    // }, 1000 * 20)
  }

  // ajaxGo = () => {
  //   $.ajax({
  //     url: '/AttackAnalysis/AttackCountTime',
  //     type: 'post',
  //     scriptCharset: 'utf-8',
  //     dataType: "json",
  //     async: true,
  //     data: {
  //       startTime: this.props.startTime,
  //       endTime: this.props.endTime,
  //     },
  //     success: (result) => {
  //       if (result != null) {
  //         console.log('攻击类型', result);
  //         this.updateData(result)
  //       }
  //     },
  //     error: () => console.log("请求失败！")
  //   })
  // }

  updateData = (datas) => {
    console.log(datas)
    this.attackTypeChart.setOption({
      backgroundColor: '#27293D',
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      calculable: true,
      itemStyle: {
        color: 'rgba(255, 255, 255, 0.75)',
        borderColor: 'rgba(0, 0, 0, 1)'
      },
      series: [
        {
          name: '攻击类型',
          type: 'pie',
          radius: [30, 90],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            color: 'rgba(255, 255, 255, 0.75)',
            borderColor: 'rgba(0, 0, 0, 1)'
          },
          // data: [{value: 0}],
          // data: [],
          data: datas,
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    })
    this.attackTypeChart.hideLoading()
  }

  render() {
    return (
      <div className={this.props.class} id='attackType'></div>
    )
  }
}

export default AttackTypeChart