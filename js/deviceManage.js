  var params = {
    currPage: 0,
    pageSize: 10,
    searchKeyWord: ""
  };

  function render() {
    $.ajax({
      url: baseURL + "device/get/param?"+ new Date().getTime(),
      data: params,
      success: function(data) {
        $('.totalNum').html('设备总数：' + data.page.totalCount)
        $('.totalOnline').html('在线总数：' + data.page.totalCount)
        $("tbody").html(template("deviceList", data.page));

        // 2.分页展示，初始化分页
        $(".pagination").bootstrapPaginator({
          // 设置对应版本号
          bootstrapMajorVersion: 3,
          // 设置控件的显示大小
          size: "normal",
          // 设置当前页
          currentPage: params.currPage + 1,
          // 设置页码按钮的数量
          numberOfPages: 3,
          // 设置总页数
          totalPages: Math.ceil(data.page.totalCount / params.pageSize),
          // 设置分页的中文文本
          itemTexts: function(type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "page":
                return page;
            }
          },
          // 设置鼠标悬停的title
          tooltipTitles: function(type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "page":
                return page;
            }
          },
          // 为操作按钮绑定click事件:
          onPageClicked: function(event, originalEvent, type, page) {
            // console.log(event, originalEvent); // jq事件对象 和 原生的事件对象
            // window.page = page;
            params.currPage = page - 1;
            // 每次点击都渲染一次页面
            render();
          }
        });
      }
    });
  };
  render();
  getGroupsList();


// 全选，全不选
var list = [];
$("th input").on("change", function() {
  list = [];
  $("tbody input").prop("checked", $(this).prop("checked"));
  $("tbody input:checked").each(function(index, item) {
    list.push(parseInt($(item).attr("data-id")));
  });
});
$("tbody").on("change", "input", function() {
  list = [];
  $("tbody input:checked").each(function(index, item) {
    list.push(parseInt($(item).attr("data-id")));
  });
  if ($("tbody input:checked").length == $("tbody input").length) {
    $("th input").prop("checked", true);
  } else {
    $("th input").prop("checked", false);
  }
});

function openModel() {
  if (list.length === 0) {
    alert("请选择删除项");
    return;
  }
  $("#delDevice").modal("show");
}

// 点击删除按钮，删除指定设备
function removeById(node){
  list = [parseInt($(node).attr("data-id"))]
}

// 勾选删除操作
function delDevice() {
  var params = {
    url:"device/delete",
    data: list
  }
  $http_post(params,function(res){
    if(res.code === 0){
      render()
      list = []
      $("#delDevice").modal("hide");
    }
  })
}

// 获取需要跟新的设备的id,同时查询当前设备,渲染到页面
function getDeviceId(node) {
  var id = parseInt($(node).attr("data-id"));
  var params = {
    url:'/device/get',
    data:{
      id: id
    }
  }
  $http_get(params,function(res){
    if(res.code === 0){
      $('#editId').val(res.device.id);
      $('#editName').val(res.device.name);
      $('#editAddType').val(res.device.addType);
      $('#editAddress').val(res.device.address);
      $('#editPort').val(res.device.port);
      $('#editGroupId').val(res.device.groupId);
      $('#editUsername').val(res.device.username);
      $('#editPassword').val(res.device.password);
      $("#editDevice").modal("show");
    }
  })
}
// 更新设备
$(".editDeviceSub").on("click", function() {
  var params = {
    url:'/device/update',
    data:{
      name:$('#editName').val(),
      addType:$('#editAddType').val(),
      address:$('#editAddress').val(),
      id:$('#editId').val(),
      port:$('#editPort').val(),
      groupId:$('#editGroupId').val(),
      username:$('#editUsername').val(),
      password:$('#editPassword').val()
    }
  }
  $http_post(params,function(res){
    if(res.code === 0){
      render()
      $("#editDevice").modal("hide");
    }
  })
});

// 添加设备
$(".addDeviceSub").on("click", function() {
  var params = {
    data:{
      name:$('#deviceName').val(),
      addType:$('#addAddType').val(),
      address:$('#addAddress').val(),
      port:$('#addPort').val(),
      groupId:$('#addGroupId').val(),
      username:$('#addUsername').val(),
      password:$('#addPassword').val()
    },
    url:'/device/save',
  }
  $http_post(params,function(res){
    if(res.code === 0){
      render()
      $("#addDevice").modal("hide")
    }
  })
  
});

// 根据关键字搜索设备列表
function searchByKeyWord(){
  // if($('#searchByKeyWord').val() == '') return
  params.currPage = 0
  params.searchKeyWord = $('#searchByKeyWord').val()
  render()
}

// 获取所有分组列表
function getGroupsList() {
  $http_get({url:'group/getAll'},function(res){
    if(res.code === 0){
      $(".allGroups").html(template("groupsList", res.page));
    }
  })
}

// 添加分组
function addGroups(){
  $http_post({
    url:'/group/save',
    data:{
      name:$('#groupsName').val()
    }
  },function(res){
    if(res.code === 0){
      render()
      getGroupsList()
      $("#addGroup").modal("hide")
    }
  })
}

// 清空添加设备的操作
function clearAddValue(){
  $('#deviceName').val('')
  $('#addAddType').val('0')
  $('#addAddress').val('')
  $('#addPort').val('')
  $('#addGroupId').val('')
  $('#addUsername').val('')
  $('#addPassword').val('')
}

// 模态框关闭时，清空表单数据
$('#addDevice').on('hidden.bs.modal', function (e) {
  clearAddValue()
})
$('#addGroup').on('hidden.bs.modal', function (e) {
  $('#groupsName').val('')
})