<template>
  <div class="workIndex">
    <div class="header">
      <p>基于LTE专用网络的视频传输</p>
      <div>
        <span class="username">admin</span>
        <span class="nowtime">2019-12-13</span>
        <img src="../../assets/images/close.png" alt />
      </div>
    </div>

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

<style lang="" scoped>
.workIndex{
  width: 100%;
  height: 100%;
  background-color: rgba(41, 45, 50, 1);
  font-family: Microsoft YaHei;
}
div.header {
  height: 50px;
  padding-left: 45px;
  background-color: rgba(58, 62, 67, 1);
  position: relative;
}
div.header > p {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  text-align: left;
  font-weight: bold;
  color: rgba(229, 229, 229, 1);
  margin: 0;
}
div.header > div {
  position: absolute;
  right: 0;
  top: 0;
  height: 50px;
  line-height: 50px;
}
div.header > div > span {
  color: rgba(229, 229, 229, 1);
  background-color: rgba(58, 62, 67, 1);
  font-size: 14px;
  margin-left: 30px;
}
div.header > div > img {
  vertical-align: middle;
  margin-left: 30px;
}

div.main{
  padding:0px 15px;
}
div.main>ul{
  margin: 0;
  padding:0;
}
div.main>ul>li{
  height: 150px;
  list-style: none;
  background-color: rgba(44, 49, 56, 1);
  margin-top: 20px;
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
  margin: 0 30px;
}
</style>
