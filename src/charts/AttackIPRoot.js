import React, { Component } from 'react';

// import $ from 'jquery'
import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/geo';
import 'echarts/map/js/china';

class AttackIPRootChart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    this.updateData(nextProps.datas)
  }

  componentDidMount() {
    let attackIPRootChart = echarts.init(document.getElementById("attackIPRoot"))
    attackIPRootChart.setOption(this.option)
    this.attackIPRootChart = attackIPRootChart;
    // $.ajax({
    //   url: '/AttackAnalysis/attackSource',
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
    //       console.log('攻击源IP溯源', result)
    //       this.updateData(result)
    //     }
    //   },
    //   error: () => console.log('请求失败！')
    // })
  }
  updateData = (datas) => {
    if (!datas) return
    this.attackIPRootChart.setOption({
      series: [{
        data: convertData(datas.sort(function (a, b) {
          return b.value - a.value;
        }).slice()),
      }]
    })
  }

  option = {
    tooltip: {
      formatter: function (param) {
        var name = param.name;
        var value = param.value[2];
        return name + ': 发起' + value + '次攻击';
      }
    },

    geo: {
      map: 'china',
      label: {
        emphasis: {
          show: false
        }
      },
      zoom: 1.2,
      roam: false,
      itemStyle: {
        normal: {
          areaColor: 'rgba(2,97,155,0.95)',
          borderColor: 'rgb(0, 0, 0, 0.6)'
        },
        emphasis: {
          areaColor: 'rgb(255, 255, 255, 0.6)'
        }
      }
    },
    series: [
      {
        name: 'Top 3',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: [],
        symbolSize: function (val) {
          return val[2] / 20;
        },

        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: false
          }
        },
        itemStyle: {
          normal: {
            // color: '#f4e925',
            color: 'rgba(255, 0, 0, 0.95)',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        zlevel: 1
      }
    ]
  }
  render() {
    return (
      <div className="AttackIPRoot-chart table" id='attackIPRoot'></div>
    )
  }
}

var convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};

const geoCoordMap = {
  '新疆': [86.61, 40.79],
  '西藏': [89.13, 30.66],
  '黑龙江': [128.34, 47.05],
  '吉林': [126.32, 43.38],
  '辽宁': [123.42, 41.29],
  '内蒙古': [112.17, 42.81],
  '北京': [116.40, 40.40],
  '宁夏': [106.27, 36.76],
  '山西': [111.95, 37.65],
  '河北': [115.21, 38.44],
  '天津': [117.04, 39.52],
  '青海': [97.07, 35.62],
  '甘肃': [103.82, 36.05],
  '山东': [118.01, 36.37],
  '陕西': [108.94, 34.46],
  '河南': [113.46, 34.25],
  '安徽': [117.28, 31.86],
  '江苏': [120.26, 32.54],
  '上海': [121.46, 31.28],
  '四川': [103.36, 30.65],
  '湖北': [112.29, 30.98],
  '浙江': [120.15, 29.28],
  '重庆': [107.51, 29.63],
  '湖南': [112.08, 27.79],
  '江西': [115.89, 27.97],
  '贵州': [106.91, 26.67],
  '福建': [118.31, 26.07],
  '云南': [101.71, 24.84],
  '台湾': [121.01, 23.54],
  '广西': [108.67, 23.68],
  '广东': [113.98, 22.82],
  '海南': [110.03, 19.33],
  '澳门': [113.54, 22.19],
  '香港': [114.17, 22.32],
};

export default AttackIPRootChart