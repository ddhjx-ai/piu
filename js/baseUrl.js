
var baseURL = 'http://120.77.224.76:10000/'
// var baseURL = "http://10.0.1.90:8085/";

// get请求
var $http_get = function(options,callback){
  $.ajax({
    url: baseURL + options.url,
    data: options.data,
    success:function(res){
      callback(res)
    }
  })
}

// post请求
var $http_post = function(options,callback){
  $.ajax({
    url: baseURL + options.url,
    data: JSON.stringify(options.data),
    contentType: "application/json;charset=UTF-8",
    type:'post',
    success:function(res){
      callback(res)
    }
  })
}

// 获取时间
getDate()
function getDate() {
  let time = new Date()
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  month = month > 9 ? month : '0' + month
  day = day > 9 ? day : '0' + day
  let date = year + '-' + month + '-' + day
  $('.setDate').html(date)
}