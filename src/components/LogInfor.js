import React from 'react'

function LogInfor(props) {
  return (
    <ul className='logInfor'>
      <li>
        <div className='li-head'>【URL】</div>：
                <div className='li-main' style={{ width: 'calc(100% - 200px)', verticalAlign: 'top', marginTop: 20 }}>
          <div className='li-url'>
            {props.datas[4]}
          </div>
        </div>
      </li>
      <li>
        <div className='li-head'>【Cookie】</div>：
                <div className='li-main'>
          PHPSESSID=9ghmt8qv6adcchvr4nt496e9oq
                </div>
      </li>
      <li>
        <div className='li-head'>【Method】</div>：
                <div className='li-main'>
          GET
                </div>
      </li>
      <li>
        <div className='li-head'>【UserAgent】</div>：
                <div className='li-main'>
          Mozilla/5.0 (Windows NT 10.0; WOW64) Chrome/69.0.3497.100
                </div>
      </li>
      <li>
        <div className='li-head'>【Encoding】</div>：
                <div className='li-main'>
          gzip, deflate, br
                </div>
      </li>
      <li>
        <div className='li-head'>【Language】</div>：
                <div className='li-main'>
          zh-CN,zh;q=0.9
                </div>
      </li>
    </ul>
  )
}

export default LogInfor