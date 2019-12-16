<template>
  <div class="workIndex">
    <header class="header">
      <p>基于LTE专用网络的视频传输</p>
      <div>
        <span class="username">admin</span>
        <span class="nowtime">2019-12-13</span>
        <img src="../../assets/images/close.png" alt />
      </div>
    </header>

    <main class="main">
      <ul>
        <li>
          <span>操作</span>
          <a href="#">
            <img src="../../assets/images/playback.png" alt="">
            <!-- <img src="../../assets/images/playback.png" alt=""> -->
          </a>
        </li>
        <li>
          <span>管理</span>
          <a href="#">
            <img src="../../assets/images/shebei-pic.png" alt="">
            <img src="../../assets/images/user-pic.png" alt="">
          </a>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  name: "WorkIndex"
};
</script>

<style lang="" scoped>
.workIndex{
  width: 100%;
  height: 100%;
  background-color: rgba(41, 45, 50, 1);
  font-family: Microsoft YaHei;
}
header.header {
  height: 50px;
  padding-left: 45px;
  background-color: rgba(58, 62, 67, 1);
  position: relative;
}
header.header > p {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  text-align: left;
  font-weight: bold;
  color: rgba(229, 229, 229, 1);
  margin: 0;
}
header.header > div {
  position: absolute;
  right: 0;
  top: 0;
  height: 50px;
  line-height: 50px;
}
header.header > div > span {
  color: rgba(229, 229, 229, 1);
  background-color: rgba(58, 62, 67, 1);
  font-size: 14px;
  margin-left: 30px;
}
header.header > div > img {
  vertical-align: middle;
  margin-left: 30px;
}

main.main{
  padding:35px 15px;
}
main.main>ul{
  margin: 0;
  padding:0;
}
main.main>ul>li{
  height: 150px;
  list-style: none;
  background-color: rgba(44, 49, 56, 1);
  margin-bottom: 20px;
  display: flex;
}
main.main>ul>li>span{
  display: inline-block;
  height: 100%;
  width: 75px;
  text-align: center;
  padding-top: 20px;
  box-sizing: border-box;
  color: rgba(229, 229, 229, 1);
	font-size: 10px;
}
main.main>ul>li>a{
  display: inline-block;
  height: 100%;
  display: flex;
  align-items: center;
}

</style>