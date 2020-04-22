import React, { Component } from 'react';

import $ from 'jquery'

class NewestAttackTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newestAttackResult: [],
    }
  }
  componentDidMount() {
    this.ajaxGo()
    setInterval(() => {
      this.ajaxGo()
    }, 1000 * 20)
  }

  ajaxGo = () => {
    $.ajax({
      url: '/Homepage/latestAttack',
      type: 'get',
      scriptCharset: 'utf-8',
      dataType: 'json',
      async: true,
      success: result => {
        if (result !== null) {
          console.log('最新攻击', result)
          this.setState({ newestAttackResult: result })
        }
      },
      error: () => console.log('请求失败！')
    })
  }

  render() {
    const { newestAttackResult } = this.state
    return (
      <div className="NewestAttack-ul table">
        <table className="home-table">
          <tbody style={{ lineHeight: '2rem', fontSize: '2vh' }}>
            {
              newestAttackResult !== [] ? newestAttackResult.map((item, index) => {
                return (
                  <tr key={item[1]} className={index % 2 === 1 ? null : 'diffTrColor'}>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                  </tr>
                )
              }) : <tr className='topMainNull' style={{ height: '100%' }}><td>暂无数据</td></tr>
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default NewestAttackTable