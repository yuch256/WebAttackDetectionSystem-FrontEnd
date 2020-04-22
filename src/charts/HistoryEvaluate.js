import React, { Component } from 'react';

import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/dataZoom';

class HistoryEvaluateChart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (!nextProps.datas) return
    this.updateData(nextProps.datas)
  }

  componentDidMount() {
    const historyEvaluateChart = echarts.init(document.getElementById("historyEvaluate"))
    historyEvaluateChart.showLoading()
    this.historyEvaluateChart = historyEvaluateChart
    // $.ajax({
    //     url: '/SituationAssessment/HistoricalAssessmentTrendStatistics',
    //     type: 'post',
    //     scriptCharset: 'utf-8',
    //     dataType: 'json',
    //     success: (result) => {
    //         if (result != null) {
    //             console.log('历史评估趋势统计', result);
    //             this.updateData(result)
    //         }
    //     },
    //     error: () => console.log("请求失败！")
    // });
  }

  updateData = (datas) => {
    this.historyEvaluateChart.setOption({
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: '10%',
        orient: 'vertical',
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        data: ['权限', '完整性', '可控性',],
        textStyle: {
          color: '#fff',
          fontSize: 10
        }
      },
      grid: {
        left: '2%',
        right: '2%',
        bottom: '0%',
        top: '5%',
        show: true,
        containLabel: true,
        backgroundColor: '#333'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: datas[0],
        axisLabel: {
          show: true,
          margin: 17,
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
          name: '权限',
          type: 'line',
          data: datas[1]
        },
        {
          name: '完整性',
          type: 'line',
          data: datas[3]
        },
        {
          name: '可控性',
          type: 'line',
          data: datas[2]
        },
      ]
    })
    this.historyEvaluateChart.hideLoading()
  }

  render() {
    return (
      <div className="HistoryEvaluate-chart table" id='historyEvaluate'></div>
    )
  }
}

export default HistoryEvaluateChart