// 全局保存当前选中窗口
var g_iWndIndex = 0; //可以不用设置这个变量，有窗口参数的接口中，不用传值，开发包会默认使用当前选择窗口
$(function(){
  // 检查插件是否已经安装过
	// if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
	// 	alert("您还未安装过插件，双击开发包目录里的WebComponents.exe安装！");
	// 	return;
	// }
	
	// 初始化插件参数及插入插件
	WebVideoCtrl.I_InitPlugin('100%', '100%', {
        iWndowType: 3,
		cbSelWnd: function (xmlDoc) {
			g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
			var szInfo = "当前选择的窗口编号：" + g_iWndIndex;
			// showCBInfo(szInfo);
		}
	});
	WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");

	// 检查插件是否最新
	if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
		alert("检测到新的插件版本，双击开发包目录里的WebComponents.exe升级！");
		return;
	}
})

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

  console.log(date)

  $('.setDate').html(date)
}

// 点击分组
clickGroups()
function clickGroups() {
  $('.groups>p').on('click',function(){
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
  $('.groups li').on('click',function(){
    flag = !flag
    $(this).find('input').prop('checked',flag)
  })

  $('.groups p input').on('click',function(e){
    e.stopPropagation()
  })
}