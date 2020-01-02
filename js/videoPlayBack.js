$(function(){
  // 初始化视频
  videoInit()
  // 获取所有摄像头数据
  getAllList()
  // 获取所有摄像头分组
  getGroups()
})

// 全局变量
var g_iWndIndex = 0; //可以不用设置这个变量，有窗口参数的接口中，不用传值，开发包会默认使用当前选择窗口
var iWndowType = 3; //设置4*4方格
var iPTZSpeed = 3;  // 设置默认步长
// 初始化视频函数
function videoInit() {
  // 检查插件是否已经安装过
  if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
    alert("您还未安装过插件，双击开发包目录里的WebComponents.exe安装！");
    return;
  }
  // 初始化插件参数及插入插件
  WebVideoCtrl.I_InitPlugin("100%", "100%", {
    iWndowType: iWndowType,
    cbSelWnd: function(xmlDoc) {
      g_iWndIndex = $(xmlDoc)
        .find("SelectWnd")
        .eq(0)
        .text();
    }
  });
  WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
  // 检查插件是否最新
  if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
    alert("检测到新的插件版本，双击开发包目录里的WebComponents.exe升级！");
    return;
  }
}



// 点击分组
clickGroups()
function clickGroups() {
  $('.groups').on('click','p',function(){
    let spanNode = $(this).find('span').eq(0)
    console.log(spanNode)
    if(spanNode.hasClass('fa-caret-right')){
      $(this).next().show()
      spanNode.removeClass('fa-caret-right').addClass('fa-caret-down')
    }else{
      $(this).next().hide()
      spanNode.removeClass('fa-caret-down').addClass('fa-caret-right')
    }
  })
}

// 点击分组中的每一个li
let flag = false
clickLi()
function clickLi(){
  $('.groups').on('click','li',function(){
    flag = !flag
    $(this).find('input').prop('checked',flag)
  })

  $('.groups').on('click', 'input',function(e){
    e.stopPropagation()

  })
}

// 调用时间插件，获取时间

  laydate.render({
    elem: '.start_date' //指定元素
    ,format: 'MM/dd HH:mm:ss'
    ,type: 'datetime'
  });
  laydate.render({
    elem: '.end_date' //指定元素
    ,format: 'MM/dd HH:mm:ss'
    ,type: 'datetime'
  });
function searchBack(){
  console.log($('.start_date').val())
}
// -----------------请求数据的函数-------------------------
// axios.defaults.baseURL = 'http://10.0.1.90:8085/'
// let baseURL = 'http://10.0.1.90:8085/'
var baseURL = "http://120.77.224.76:10000";
// 查看所有摄像头的列表
function getAllList() {
  $.ajax({
    url: baseURL + "/group/get/param",
    success: function(res) {
      // console.log(res.groupList);
      var list = {
        name: [],
        videos: []
      };
      for (var i = 0; i < res.groupList.length; i++) {
        for (var key in res.groupList[i]) {
          list.name.push(key);
          list.videos.push(res.groupList[i][key]);
        }
      }
      // console.log(list);
      var html1 = template("videoTitle", list);
      var html2 = template("videoLists", list);

      var html1s = html1.match(/<p>[\s\S]*?<\/p>/g)
      var html2s = html2.match(/<ul>[\s\S]*?<\/ul>/g)
      
      let html = ''
      for(var j = 0; j < html1s.length; j++){
        html += (html1s[j] + '' + html2s[j])
      }
      // console.log(html)
      $('.groups').html(html)
    }
  });
}
// 获取所有列表
function getGroups(){
  $.ajax({
    url: baseURL + '/group/getAll',
    success: function(res){
      console.log(res)
      if(res.code === 0){
        var html = template('video_groups',res.page)
        $('.video_groups').html(html)
      }
    }
  })
}
