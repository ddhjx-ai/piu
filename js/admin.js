$(function(){
  // 获取所有用户列表
  getData({url:'http://120.77.224.76:10000/sys/user/list'},function(res){
    console.log(res)
  })

  // 获取所有角色列表
  getData({url:'http://120.77.224.76:10000/sys/role/select'},function(res){
    
  })

  // 添加角色函数
  $('.addRoleSub').on('click',function(e){
    e.preventDefault();
    console.log($("form").serialize());
  })
})

// 请求数据函数
function getData(options,callback){
  $.ajax({
    url:options.url,
    type:options.type || 'get',
    data:options.data || {},
    success:function(res){
     callback(res) 
    }
  })
}