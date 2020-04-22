import React, { Component } from 'react';

class AttackHistoryTable extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let { datas, pageSize, currentPage, totalPage, handleClickPrev, handleClickNext, handleChangePager, handleClickRow } = this.props
    if (!datas) { currentPage = 0; totalPage = 0 }
    return (
      <div className="left-AttackHistory">
        <div className="m-h">
          <b>历史攻击统计</b>
          <div className="m-detect-h-right">
            <div><img style={{ color: '#f60  ' }} src={require("../Images/fangdajing.svg")} alt="" /></div>
            <input type="search" placeholder="Search" />
          </div>
        </div>

        <table className='attackHistoryTable attackDetectTable'>
          <thead>
            <tr>
              <th>时间</th>
              <th>攻击判断</th>
              <th>源IP</th>
            </tr>
          </thead>
          <tbody>
            {
              datas ? datas.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((item, index) => {
                return (
                  <tr
                    onClick={handleClickRow}
                    className={index % 2 === 0 ? 'diffTrColor' : null}
                    key={Math.random()}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                  </tr>
                )
              }) :
                <tr className='topMainNull' style={{ height: '100%' }}>
                  <td style={{ position: 'absolute', left: '41%' }}>暂无数据</td>
                </tr>
            }
          </tbody>
        </table>

        <footer className='pagination-footer'>
          <ul className='pagination'>
            <li className='pagination-prev' onClick={handleClickPrev}>
              <div style={{ cursor: currentPage < 1 ? 'not-allowed' : 'pointer' }}>
                <img src={require('../Images/prev.svg')} alt='' />
              </div>
            </li>
            <li className='pagination-pager'>
              <input type='text' value={currentPage} onChange={handleChangePager} />
              <span>/</span>
              {totalPage}
            </li>
            <li className='pagination-next' onClick={handleClickNext}>
              <div style={{ cursor: currentPage === totalPage ? 'not-allowed' : 'pointer' }}>
                <img src={require('../Images/next.svg')} alt='' />
              </div>
            </li>
          </ul>
        </footer>
      </div>
    )
  }
}

export default AttackHistoryTable