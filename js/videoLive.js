$(function(){
  // 初始化监控设备
  videoInit()
  // 请求数据，获取所有监控列表
  getAllList()
  // 获取当前时间函数
  getDate()
  clickGroups()
  // 设置初始化本地存储地址
  clickGetLocalCfg()
  clickSetLocalCfg()
})

// 离开当前页面触发的函数
$(window).unload(function() {
  console.log(123)
})

// 存放所有视频的列表
var allListArray = []
// 存储当前播放的视频列表
var deviceListArray = []

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
  // 将一维数组按区块个数分割成二维数组
  let deviceList = oneArrayToTwoArray(deviceListArray);
  // 自动登陆
  clickLogin(deviceList);
}
function oneArrayToTwoArray(deviceListArray) {
  let twoArray = [];
  let oneArray = [];
  let len = iWndowType * iWndowType;
  for (let b = 0; b < deviceListArray.length; b++) {
    if (b % len == 0) {
      oneArray = [];
    }
    twoArray.push(deviceListArray[b]);
    if (b % len == len - 1) {
      twoArray.push(oneArray);
    }
  }
  return twoArray;
}
// 登陆函数
function clickLogin(deviceList) {
  // g_iWndIndex = 0
  for (let i = 0; i < deviceList.length; i++) {
    let index = deviceList[i];
    if ("" == index.address || "" == index.port) {
      continue;
    }
    var iRet = WebVideoCtrl.I_Login(
      index.address,
      0,
      index.port,
      index.username,
      index.password,
      {
        success: function(xmlDoc) {
          // console.log(index.address + " login success！");
          clickStartRealPlay(index.address, g_iWndIndex);
          // g_iWndIndex++;
        },
        error: function() {
        }
      }
    );
    if (-1 == iRet) {
      // console.log(index.address + " login already !");
      clickStartRealPlay(index.address, g_iWndIndex);
    }
  }
}
// 开始预览
function clickStartRealPlay(address, g_iWndIndex) {
  let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
  // console.log(oWndInfo)
  if ("" == address) {
    return;
  }
  let iRet = WebVideoCtrl.I_StartRealPlay(address, {
    iWndIndex: g_iWndIndex
  });
  if (0 == iRet) {
    console.log("预览成功");
  } else {
    console.log("预览失败");
  }
}

// 显示单个视频函数
function getOneVideo(deviceList) {
  if(deviceListArray[g_iWndIndex]){
    clickStopRealPlay(g_iWndIndex)
    clickLogout(deviceListArray[g_iWndIndex])
  }
  deviceListArray[g_iWndIndex] = deviceList
  console.log('g_iWndIndex:'+ g_iWndIndex)
  var iRet = WebVideoCtrl.I_Login(deviceList.address, 0, deviceList.port, deviceList.username, deviceList.password, {
    success: function (xmlDoc) {
      clickStartRealPlay(deviceList.address, g_iWndIndex)
      g_iWndIndex++
      if(g_iWndIndex >= iWndowType*iWndowType){
        g_iWndIndex = 0
      }
    },
    error: function () {
    }
  });
  if (-1 == iRet) {
    // console.log(deviceList.address + " login already !");
    clickStartRealPlay(deviceList.address, g_iWndIndex)
    g_iWndIndex++
    if(g_iWndIndex >= iWndowType*iWndowType){
      g_iWndIndex = 0
    }
  }
}
// 点击控制摄像头方向函数
function mouseDownPTZControl(iPTZIndex) {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
  if (oWndInfo != null) {
    WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
      iPTZSpeed: iPTZSpeed,
      success: function(xmlDoc) {
        console.log("操作成功");
      },
      error: function() {
        // showOPInfo( " start PTZ failed！");
      }
    });
  }
}
// 鼠标抬起，取消方向控制
function mouseUpPTZControl() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
  if (oWndInfo != null) {
    WebVideoCtrl.I_PTZControl(1, true, {
      success: function(xmlDoc) {
        // showOPInfo(oWndInfo.address + " stop PTZ success！");
      },
      error: function() {
        // showOPInfo(oWndInfo.address + " stop PTZ failed！");
      }
    });
  }
}
// 放大缩小动作
function PTZZoomIn() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
  if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(10, false, {
          iWndIndex: g_iWndIndex,
          success: function (xmlDoc) {
              // showOPInfo(oWndInfo.szIP + " 调焦+成功！");
          },
          error: function () {
              // showOPInfo(oWndInfo.szIP + "  调焦+失败！");
          }
      });
  }
}
function PTZZoomout() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
  if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(11, false, {
          iWndIndex: g_iWndIndex,
          success: function (xmlDoc) {
              // showOPInfo(oWndInfo.szIP + " 调焦-成功！");
          },
          error: function () {
              // showOPInfo(oWndInfo.szIP + "  调焦-失败！");
          }
      });
  }
}
// 取消放大缩小动作
function PTZZoomStop() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
  if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(11, true, {
          iWndIndex: g_iWndIndex,
          success: function (xmlDoc) {
              // showOPInfo(oWndInfo.szIP + " 调焦停止成功！");
          },
          error: function () {
              // showOPInfo(oWndInfo.szIP + "  调焦停止失败！");
          }
      });
  }
}
// 获取步长函数
function getSpeed(node){
  iPTZSpeed = $(node).val()
  console.log(iPTZSpeed)
}
// 聚焦函数
function PTZFocusIn() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
  if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(12, false, {
          iWndIndex: g_iWndIndex,
          success: function (xmlDoc) {
              // showOPInfo(oWndInfo.szIP + " focus+success！");
          },
          error: function () {
              // showOPInfo(oWndInfo.szIP + "  focus+failed！");
          }
      });
  }
}
function PTZFoucusOut() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
  if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(13, false, {
          iWndIndex: g_iWndIndex,
          success: function (xmlDoc) {
              // showOPInfo(oWndInfo.szIP + " focus-success！");
          },
          error: function () {
              // showOPInfo(oWndInfo.szIP + "  focus-failed！");
          }
      });
  }
}
// 取消聚焦
function PTZFoucusStop() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
  if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(12, true, {
          iWndIndex: g_iWndIndex,
          success: function (xmlDoc) {
              // showOPInfo(oWndInfo.szIP + " stop focus success！");
          },
          error: function () {
              // showOPInfo(oWndInfo.szIP + "  stop focus failed！");
          }
      });
  }
}
// 操作光圈函数
function PTZIrisIn() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
  if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(14, false, {
          iWndIndex: g_iWndIndex,
          success: function (xmlDoc) {
              // showOPInfo(oWndInfo.szIP + " Iris+success！");
          },
          error: function () {
              // showOPInfo(oWndInfo.szIP + "  Iris+failed！");
          }
      });
  }
}
function PTZIrisOut() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
  if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(15, false, {
          iWndIndex: g_iWndIndex,
          success: function (xmlDoc) {
              // showOPInfo(oWndInfo.szIP + " Iris-success！");
          },
          error: function () {
              // showOPInfo(oWndInfo.szIP + "  Iris-failed！");
          }
      });
  }
}
// 取消光圈操作函数
function PTZIrisStop() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
  if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(14, true, {
          iWndIndex: g_iWndIndex,
          success: function (xmlDoc) {
              // showOPInfo(oWndInfo.szIP + " stop Iris success！");
          },
          error: function () {
              // showOPInfo(oWndInfo.szIP + "  stop Iris failed！");
          }
      });
  }
}
// 停止预览
function clickStopRealPlay(i) {
  // var oWndInfo = WebVideoCtrl.I_GetWindowStatus(i)
	// if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_Stop(i);
		if (0 == iRet) {
      console.log("停止预览成功！")
			// szInfo = "停止预览成功！";
		} else {
			// szInfo = "停止预览失败！";
		}
	// }
}
// 退出登陆
function clickLogout(item) {
	var szIP =item.address;
	if (szIP == "") {
		return;
	}
	var iRet = WebVideoCtrl.I_Logout(szIP);
	if (0 == iRet) {
		// szInfo = "退出成功！";
    console.log('退出成功')
		// $("#ip option[value='" + szIP + "']").remove();
		// getChannelInfo();
	} else {
		// szInfo = "退出失败！";
	}
}
// 打开选择框 0：文件夹  1：文件
function clickOpenFileDlg(id, iType) {
	var szDirPath = WebVideoCtrl.I_OpenFileDlg(iType);
	if (szDirPath != -1 && szDirPath != "" && szDirPath != null) {
		$("#" + id).val(szDirPath);
  }
  clickSetLocalCfg()
}
// 开始录像
function clickStartRecord() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex)
  console.log(oWndInfo)
	if (oWndInfo != null) {
		var szFileName = oWndInfo.szIP + "_" + oWndInfo.iIndex + "_" + new Date().getTime()
		var	iRet = WebVideoCtrl.I_StartRecord(szFileName);
		if (0 == iRet) {
			console.log('开始录像成功')
		} else {
			// szInfo = "开始录像失败！";
		}
	}
}
// 停止录像
function clickStopRecord() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex)
	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_StopRecord();
		if (0 == iRet) {
			// szInfo = "停止录像成功！";
		} else {
			// szInfo = "停止录像失败！";
		}
	}
}
// 设置本地参数
function clickSetLocalCfg() {
	var arrXml = []
	arrXml.push("<RecordPath>" + $("#recordPath").val() + "</RecordPath>");
	var iRet = WebVideoCtrl.I_SetLocalCfg(arrXml.join(""));
	if (0 == iRet) {
    console.log('本地配置设置成功')
	} else {
    console.log('本地配置设置失败')
	}
}
// 获取本地参数
function clickGetLocalCfg() {
	var xmlDoc = WebVideoCtrl.I_GetLocalCfg();
	$("#recordPath").val($(xmlDoc).find("RecordPath").eq(0).text());
}
// 点击分组
function clickGroups() {
  $(".groups").on("click", 'p',function() {
    let spanNode = $(this)
      .find("span")
      .eq(0);
    if (spanNode.hasClass("fa-caret-right")) {
      $(this)
        .next()
        .show();
      spanNode.removeClass("fa-caret-right").addClass("fa-caret-down");
    } else {
      $(this)
        .next()
        .hide();
      spanNode.removeClass("fa-caret-down").addClass("fa-caret-right");
    }
  });
}
// 点击分组中的每一个li
// function clickLi() {
  var flag = false
  $(".groups").on("click", 'li' , function() {
    // $(this).addClass("show");
    var id = $(this).attr('data-id')
    /* for(var j = 0; j < deviceListArray.length; j++){
      var val = deviceListArray[j]
      if(val.id == id){
        flag = true
      }
    } */
    for(var i = 0; i < allListArray.length; i++){
      var item = allListArray[i]
      /* if(item.id == id && !flag){
        if(deviceListArray.length >= 9){
          deviceListArray.push(item)
          deviceListArray.shift()
        }else{
          deviceListArray.push(item)
        }
        flag = false
      } */
      if(item.id == id){
        // deviceObj = item
        getOneVideo(item)
        
        // console.log('sssss'+ deviceListArray)
        // g_iWndIndex++
        
      }
    }
    // console.log(deviceListArray)
    
    // 将一维数组按区块个数分割成二维数组
    // let deviceList = oneArrayToTwoArray(deviceListArray);
    // // 自动登陆
    // clickLogin(deviceList);
    // g_iWndIndex = 0
    // console.log(deviceListArray)
    // clickLogin(deviceListArray)
  });
// }

// 设置分屏个数
function screenFour(num){
  iWndowType = num
  // iType = parseInt(num, 10);
	WebVideoCtrl.I_ChangeWndNum(num);
}
function screenNine(num){
  iWndowType = num
  // iType = parseInt(num, 10);
	WebVideoCtrl.I_ChangeWndNum(num);
}
function screenSixteen(num){
  iWndowType = num
  // iType = parseInt(num, 10);
	WebVideoCtrl.I_ChangeWndNum(num);
}
// 全屏
function clickFullScreen() {
	WebVideoCtrl.I_FullScreen(true);
}

// -----------------请求数据的函数-------------------------
// axios.defaults.baseURL = 'http://10.0.1.90:8085/'
// let baseURL = 'http://10.0.1.90:8085/'
// var baseURL = "http://120.77.224.76:10000/";
// 查看所有摄像头的列表
function getAllList() {
  $.ajax({
    url: baseURL + "group/get/param",
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
      for (var k = 0; k < res.groupList.length; k++) {
        for (var key in res.groupList[k]) {
          for (var h = 0; h < res.groupList[k][key].length; h++) {
            // deviceListArray.push(res.groupList[k][key][h])
            var item = res.groupList[k][key][h]
            allListArray.push(item)
          }
        }
      }
      // deviceListArray.length = 9
      // videoInit()
      // clickLogin(deviceListArray)
      // console.log(deviceListArray)
      console.log(allListArray)
    }
  });
}

