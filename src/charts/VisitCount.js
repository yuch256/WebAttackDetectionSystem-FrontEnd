import React, { Component } from 'react';

import $ from 'jquery'
import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/dataZoom';

class VisitCountChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todayVisitResult: new Array(3).fill(''),
    }
  }
  componentDidMount() {
    this.ajaxGo()
    setInterval(() => {
      this.ajaxGo()
    }, 1000 * 20)

    const visitCountChart = echarts.init(document.getElementById("visitCount"))
    visitCountChart.showLoading()
    this.visitCountChart = visitCountChart
    $.ajax({
      url: '/Homepage/visitcountchart',
      type: 'post',
      scriptCharset: 'utf-8',
      dataType: "json",
      async: true,
      success: (result) => {
        if (result != null) {
          console.log('访问量时段统计', result);
          this.updateData(result)
        }
      },
      error: () => console.log("请求失败！")
    })
  }

  ajaxGo = () => {
    $.ajax({
      url: '/Homepage/visitcount',
      type: 'post',
      scriptCharset: 'utf-8',
      dataType: "json",
      async: true,
      success: (result) => {
        if (result != null) {
          console.log('今日访问量', result);
          this.setState({ todayVisitResult: result })
        }
      },
      error: () => console.log("请求失败！")
    })
  }

  updateData = (datas) => {
    this.visitCountChart.setOption({
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: '10%',
        orient: 'vertical',
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        data: ['正常访问次数', '异常访问次数', '攻击次数'],
        textStyle: {
          color: '#fff',
          fontSize: 10
        }
      },
      grid: {
        left: '2%',
        right: '4%',
        bottom: '0%',
        top: '5%',
        show: true,
        containLabel: true,
        backgroundColor: '#333'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        // data: [],
        data: datas[0],
        // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        // data: ["2019-05-19 00", "2019-05-19 01", "2019-05-19 02", "2019-05-19 03", "2019-05-19 04", "2019-05-19 05", "2019-05-19 06", "2019-05-19 07", "2019-05-19 08", "2019-05-19 09", "2019-05-19 10", "2019-05-19 11", "2019-05-19 12", "2019-05-19 13", "2019-05-19 14", "2019-05-19 15", "2019-05-19 16", "2019-05-19 17", "2019-05-19 18", "2019-05-19 19", "2019-05-19 20", "2019-05-19 21", "2019-05-19 22", "2019-05-19 23", "2019-05-20 00"],
        axisLabel: {
          show: true,
          margin: 25,
          color: '#fff',
          verticalAlign: 'bottom',
          lineHeight: 10,
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#fff'
        }
      },
      dataZoom: [{
        // startValue: '周二'
      }, {
        type: 'inside'
      }],
      series: [
        {
          name: '正常访问次数',
          type: 'line',
          // data: [],
          data: datas[1],
          // data: [150, 232, 201, 154, 190, 330, 410],
          // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: '异常访问次数',
          type: 'line',
          // data: [],
          data: datas[2],
          // data: [10, 152, 81, 124, 90, 230, 310]
          // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: '攻击次数',
          type: 'line',
          // data: [],
          data: datas[3],
        }
      ]
    })
    this.visitCountChart.hideLoading()
  }

  render() {
    let { todayVisitResult } = this.state
    const visitTypes = ['总访问量', '异常访问量', '攻击总数']
    return (
      <div className="home-visitCountWrap">
        <div className="home-VisitCount-chart table" id='visitCount'></div>
        <div className="todayVisit">
          <div className="todayVisit-h"><b>今日访问量：</b></div>
          <div className="todayVisitWrap">
            {
              todayVisitResult.map((item, index) => {
                let percentage = todayVisitResult[0] === '' ? null : todayVisitResult[0] === 0 ? '0%' : `${(item / todayVisitResult[0] * 100).toFixed(2)}%`
                return (
                  <div className="home-visitWrap-div" key={`${item}${index}`}>
                    <div className="visitWrap-h">{visitTypes[index]}</div>
                    <div className="visitWrap-num">
                      <span>{item}</span>&nbsp;/&nbsp;<span>{percentage}</span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default VisitCountChart