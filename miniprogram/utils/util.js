const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatString: function() {
    if (arguments.length > 0) {
      var s = arguments[0];
      if (arguments.length == 1) {
        return s;
      }
      for (var i = 0; i < arguments.length - 1; i++) {
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i + 1]);
      }
      return s;
    }
    return null;
  }
}