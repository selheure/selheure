ng.factory('notification', function($timeout) {
  //TODO: add timeout
  return {
    level: '',
    message: '',
    alert: function(level, message) {
      console.log(level, message);
      this.level = level;
      this.message = message;
      window.scrollTo(0,0);
      var _this = this;
      $timeout(function() { _this.clear()}, 8000);
    },
    warn: function(message) { this.alert('warn', message) },
    error: function(message) { this.alert('error', message) },
    info: function(message) { this.alert('info', message) },
    success: function(message) { this.alert('success', message) },
    clear: function() {
      var _this = this;
      _this.level = '';
      _this.message = '';
    }
  };
});
