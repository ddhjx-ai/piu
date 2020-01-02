// 获取所有网关数据
var params = {
  currPage: 0,
  pageSize: 10
};
function render() {
  $.ajax({
    url: baseURL + "gateway/get/param?" + new Date().getTime(),
    data: params,
    success: function(data) {
      $("tbody").html(template("gateWayList", data.page));

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
}
render();
