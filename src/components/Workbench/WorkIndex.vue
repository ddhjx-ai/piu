<template>
  <div class="workIndex">
    <div class="main">
      <ul>
        <li>
          <span>操作</span>
          <a href="#">
            <img src="../../assets/img/裁剪.png" alt="">
          </a>
          <a href="#">
            <img src="../../assets/img/图片 2613.png" alt="">
          </a>
          <a href="#">
            <img src="../../assets/img/图片 2614.png" alt="">
          </a>
          <a href="#">
            <img src="../../assets/img/图片 2615.png" alt="">
          </a>
          <a href="#">
            <img src="../../assets/img/图片 2616.png" alt="">
          </a>
          <a href="#">
            <img src="../../assets/img/图片 2617.png" alt="">
          </a>
          <a href="#">
            <img src="../../assets/img/图片 2618.png" alt="">
          </a>
        </li>
        <li>
          <span>管理</span>
          <a href="#">
            <img src="../../assets/img/27.png" alt="">
          </a>
          <a href="#">
            <img src="../../assets/img/28.png" alt="">
          </a>
          <a href="#">
            <img src="../../assets/img/29.png" alt="">
          </a>
          <a href="#">
            <img src="../../assets/img/30.png" alt="">
          </a>
        </li>
        <li>
          <span>配置</span>
          <router-link to="/WorkManage">
            <img src="../../assets/img/31.png" alt="">
          </router-link>
          <a href="#">
            <img src="../../assets/img/32.png" alt="">
          </a>
          <a href="#">
            <img src="../../assets/img/33.png" alt="">
          </a>
          <a href="#">
            <img src="../../assets/img/34.png" alt="">
          </a>
          <a href="#">
            <img src="../../assets/img/35.png" alt="">
          </a>
          <router-link to="/Admin">
            <img src="../../assets/img/36.png" alt="">
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkIndex'
}
</script>

<style lang="less" scoped>
.workIndex{
  width: 100%;
  min-height: 100%;
  background-color: #3a3e43;
  padding-top: 52px;
  box-sizing: border-box;
}
div.main{
  padding:0px 15px;
}
div.main>ul{
  margin: 0;
  padding:0;
  padding-top: 20px;
}
div.main>ul>li{
  height: 150px;
  list-style: none;
  background-color: rgba(44, 49, 56, 1);
  margin-bottom: 20px;
  display: flex;
}

div.main>ul>li>span{
  display: inline-block;
  height: 100%;
  width: 75px;
  text-align: center;
  padding-top: 20px;
  box-sizing: border-box;
  color: rgba(229, 229, 229, 1);
  font-size: 14px;
}
div.main>ul>li>a{
  display: inline-block;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 30px;
  border: 2px solid transparent;
  box-sizing: border-box;
  border-radius: 5px;
  &:hover{
    border: 2px solid #222;
  }
  &:active{
    border: 2px solid #222;
    box-shadow: 0 0 4px 1px #222 inset;
  }
}
</style>
