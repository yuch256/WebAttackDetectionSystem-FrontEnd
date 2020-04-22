import React from 'react'

function DetectResultTable(props) {
  let { datas, pageSize, currentPage, totalPage, handleClickPrev, handleClickNext, handleChangePager } = props
  if (!datas) { currentPage = 0; totalPage = 0 }
  return (
    <div className="left-TestResult">
      <div className="m-h">
        <b>检测结果审核</b>
        <div className="m-detect-h-right">
          <div><img style={{ color: '#f60  ' }} src={require("../Images/fangdajing.svg")} alt="" /></div>
          <input type="search" placeholder="Search" />
        </div>
      </div>

      <table className='detectResultTable attackDetectTable'>
        <thead>
          <tr>
            <th>系统判断</th>
            <th>审核结果</th>
            <th>执行人</th>
          </tr>
        </thead>
        <tbody>
          {
            datas ? datas.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((item, index) => {
              return (
                <tr className={index % 2 === 0 ? 'diffTrColor' : null} key={item[0]}>
                  <td>{item[1]}</td>
                  <td>{index === 2 ? `错误` : `正确`}</td>
                  <td>{`admin`}</td>
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



export default DetectResultTable
  // < div className = "left-TestResult" >
  //   <div className="m-h">
  //     <b style={{ backgroundColor: state.color }}>检测结果审核</b>
  //     <div className="m-detect-h-right">
  //       <div><img src={require("../Images/search.png")} alt="" /></div>
  //       <input type="search" placeholder="Search" />
  //     </div>
  //   </div>
  //   <div className="TestResult-th">
  //     <span>系统判断</span>
  //     <span>审核结果</span>
  //     <span>执行人</span>
  //   </div>
  //   <div className="TestResult-ul detect-table">
  //     <table className="m-detect-table table-result">
  //       <tbody>
  //         <tr className="diffTrColor">
  //           <td>XSS</td>
  //           <td style={{ color: 'green' }}>正确</td>
  //           <td>admin</td>
  //         </tr>
  //         <tr>
  //           <td>LDAPi</td>
  //           <td>误判</td>
  //           <td>admin</td>
  //         </tr>
  //         <tr className="diffTrColor">
  //           <td>XSS</td>
  //           <td>误判</td>
  //           <td>admin</td>
  //         </tr>
  //         <tr>
  //           <td>XSS</td>
  //           <td style={{ color: 'green' }}>正确</td>
  //           <td>admin</td>
  //         </tr>
  //         <tr className="diffTrColor">
  //           <td>LDAPi</td>
  //           <td style={{ color: 'green' }}>正确</td>
  //           <td>admin</td>
  //         </tr>
  //         <tr>
  //           <td>SQLi</td>
  //           <td>无</td>
  //           <td>无</td>
  //         </tr>
  //       </tbody>
  //     </table>
  //   </div>
  //   <div className="detect-tfooter">
  //   </div>
  //           </div >