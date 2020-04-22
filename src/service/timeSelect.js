class timeselct {
  defaultTimeSelect = () => {
      var date = new Date();
      var endMonth = date.getMonth() + 1;
      var startMonth = 0;
      if (endMonth === 1) { startMonth = 12 }
      else { startMonth = endMonth - 1 }
      var day = date.getDate();
      var hour = date.getHours();
      var Minute = date.getMinutes();
      startMonth = this.dateToString(startMonth);
      endMonth = this.dateToString(endMonth);
      day = this.dateToString(day);
      hour = this.dateToString(hour);
      Minute = this.dateToString(Minute);

      const startTime = [
          [
              date.getFullYear(),
              startMonth,
              day,
          ].join('-'),
          [
              hour,
              Minute,
          ].join(':'),
      ].join('T');
      const endTime = [
          [
              date.getFullYear(),
              endMonth,
              day,
          ].join('-'),
          [
              hour,
              Minute,
          ].join(':'),
      ].join('T');
      
      return { startTime, endTime }
  }

  dateToString(date) {
      if (date < 10) { date = '0' + String(date) }
      else { date = String(date) }
      return date
  }
}

export const timeSelect = new timeselct()