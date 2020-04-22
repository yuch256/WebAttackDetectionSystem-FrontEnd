import React, { Component } from 'react'

class DetailInfor extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleClickResult = () => {
    this.setState(state => ({
      judgeResult: state.judgeResult === '正确' ? '错误' : '正确'
    }))
  }

  render() {
    const {
      datas, attackJudge, reviewResult, ifJudgeOnChange, handleClickAttackJudgeBt, handleChangeAttackJudge, handleClickReviewResultBt
    } = this.props
    return (
      <ul className='detailInfor'>
        <li>
          <div className='li-head'>攻击判断</div>：
                    {
            ifJudgeOnChange ?
              <div className='li-main'>
                <input
                  style={{ width: 150 }}
                  type='text'
                  value={attackJudge}
                  onChange={handleChangeAttackJudge}
                />
                <div className='attackDetail-bt' onClick={handleClickAttackJudgeBt}>点击提交</div>
              </div> :
              <div className='li-main'>
                <span style={{ marginRight: 48 }}>{attackJudge}</span>
                                检测结果有误？
                                <div className='attackDetail-bt' onClick={handleClickAttackJudgeBt}>点击修改</div>
              </div>
          }
        </li>
        <li>
          <div className='li-head'>源IP</div>：
                    <div className='li-main'>
            {
              datas ?
                <span>{datas[1]}</span> :
                <span>NULL</span>
            }
          </div>
        </li>
        <li>
          <div className='li-head'>审核结果</div>：
                    <div className='li-main'>
            <span style={{ marginRight: 48, color: reviewResult === '正确' ? 'green' : 'red' }}>{reviewResult}</span>
            <div className='attackDetail-bt' onClick={handleClickReviewResultBt}>点击修改</div>
          </div>
        </li>
        <li>
          <div className='li-head'>攻击时间</div>：
                    <div className='li-main'>
            <span style={{ marginRight: 48 }}>{datas ? datas[2] : 'NULL'}</span>
          </div>
        </li>
        <li>
          <div className='li-head'>敏感词</div>：
                    <div className='li-main'>
            <span style={{ marginRight: 48 }}>
              {
                datas ? datas[3].join('、') : 'NULL'
                // [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10].join('、')
              }
            </span>
          </div>
        </li>
      </ul>
    )
  }
}

export default DetailInfor