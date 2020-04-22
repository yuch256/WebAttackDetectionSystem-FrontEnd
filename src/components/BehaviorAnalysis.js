import React from 'react'

function BehaviorAnalysis(props) {
  return (
    <div>
      {
        props.datas ? props.datas.slice(5).map(item => {
          return (
            <ul className='behaviorAnalysis' style={{ padding: '20px 0 50px 0', borderBottom: '1px solid #bcbcbc' }}>
              <li style={{ lineHeight: '2rem' }}>
                <div className='li-head'>攻击时间</div>：
                <div className='li-main'>
                  <span>{item[0]}</span>
                </div>
              </li>
              <li style={{ lineHeight: '2rem' }}>
                <div className='li-head'>攻击类型</div>：
                <div className='li-main'>
                  <span>{item[1]}</span>
                </div>
              </li>
              <li style={{ lineHeight: '2rem' }}>
                <div className='li-head'>【URL】</div>：
                <div className='li-main' style={{ width: 'calc(100% - 200px)', verticalAlign: 'top', marginTop: 20 }}>
                  <div className='li-url'>
                    <span>{item[2]}</span>
                  </div>
                </div>
              </li>
            </ul>
          )
        }) : <div style={{ textAlign: 'center' }}>暂无历史攻击记录</div>
      }
    </div>
  )
}

export default BehaviorAnalysis