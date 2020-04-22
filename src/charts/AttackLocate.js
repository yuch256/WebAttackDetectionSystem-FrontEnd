import React, { Component } from 'react';

// import ReactWordcloud from "react-wordcloud";
import 'echarts/lib/chart/tree';
import 'echarts/lib/component/tooltip';

class AttackLocate extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // componentDidMount() {
  //     const historyEvaluateChart = echarts.init(document.getElementById("AttackLocate"))
  //     this.historyEvaluateChart = historyEvaluateChart
  //     this.updateData(datas)
  // }
  updateData = (datas) => {
    this.historyEvaluateChart.setOption({
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: [
        {
          type: 'tree',

          data: [datas],

          top: '1%',
          left: '7%',
          bottom: '1%',
          right: '20%',

          symbolSize: 7,

          label: {
            normal: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 9,
              color: '#fff'
            }
          },

          leaves: {
            label: {
              normal: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            }
          },

          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    })
  }

  render() {
    return (
      <div className="AttackLocate-chart table" id='AttackLocate'></div>
      // <ReactWordcloud className="AttackLocate-chart table" words={words} />
      // <div className="AttackLocate-chart table" style={{position:'relative'}}>
      //     <div style={{position:'absolute',display:'flex',alignItems:'center'}}>
      //         <div style={{width:'50px',height:'50px',border:'1px solid red',borderRadius:'50%'}}></div>
      //         <div style={{width:'30px',border:'0.5px solid red'}}></div>
      //     </div>
      // </div>
    )
  }
}

// const words = [
//   { text: "<script>", value: 5 },
//   { text: "</script>", value: 5 },
//   { text: "<iframe", value: 5 },
//   { text: "</iframe>", value: 5 },
//   { text: "<style", value: 5 },
//   { text: "</style>", value: 5 },
//   { text: "<a>", value: 5 },
//   { text: "href", value: 5 },
//   { text: "`", value: 5 },
//   { text: "&#", value: 'djf' },
//   // { text: `@[|\]^``, value: 5 },

//   { text: "<!--#include file=”", value: 5 },
//   { text: "Set-cookie:", value: 5 },
//   { text: "<!--", value: 5 },
//   { text: "^(#$!@#$)(()))******", value: 5 },
//   { text: "gets()", value: 5 },
// ];
// { text: , value: 5 },

// const datas = {
//     "name": "根目录",
//     "children": [
//         {
//             "name": "目录1",
//             "children": [
//                 {
//                      "name": "SQLi",
//                      "children": [
//                          {"name": "202.173.101.218", "value": 721},
//                          {"name": "202.75.216.142", "value": 4294},
//                      ]
//                 },
//                 {
//                     "name": "XSS",
//                     "children": [
//                         {"name": "218.57.165.106", "value": 721},
//                         {"name": "202.100.127.132", "value": 721},
//                     ]
//                 }
//             ]
//         },
//         {
//             "name": "目录2",
//             "children": [
//                 {
//                     "name": "SSL",
//                     "children": [
//                         {"name": "218.58.233.8", "value": 8833},
//                         {"name": "218.58.233.8", "value": 1732},
//                         {"name": "121.233.45.225", "value": 3623}
//                     ]
//                 }
//            ]
//         },
//         {
//             "name": "目录3",
//             "children": [
//                 {
//                     "name": "BufferOverflow",
//                     "children": [
//                         {"name": "202.153.49.240", "value": 8833},
//                         {"name": "119.191.7.50", "value": 1732},
//                         {"name": "218.58.233.8", "value": 3623}
//                     ]
//                 }
//            ]
//         },
//         {
//            "name": "目录4",
//            "children": [
//             {
//                  "name": "CRLFi",
//                  "children": [
//                       {"name": "218.58.233.8", "value": 593},
//                       {"name": "202.100.127.47", "value": 330},
//                       {"name": "218.58.233.8", "value": 287},
//                       {"name": "202.100.127.177", "value": 277},
//                       {"name": "218.58.233.8", "value": 292},
//                       {"name": "119.179.113.177", "value": 595},
//                 ]
//             },
//            {
//                  "name": "XPath",
//                  "children": [
//                       {"name": "218.58.233.8", "value": 593},
//                       {"name": "218.58.233.8", "value": 330},
//                       {"name": "202.100.127.124", "value": 287},
//                 ]
//             },
//            ]
//           },
//     ]
// };

export default AttackLocate