import React from 'react';

function TimeSelect(props) {
  return (
    <div className="timeSelect">
      <b className="timeselect-h">攻击分析时段选择：</b>
      <div className="timeselect-bar">
        <input type="datetime-local" onChange={props.handleChangeStartTime} value={props.startTime} />
          -
          <input type="datetime-local" onChange={props.handleChangeEndTime} value={props.endTime} />
        <div onClick={props.handleClickGo}>Go</div>
      </div>
    </div>
  )
}

export default TimeSelect