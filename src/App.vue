<template>
  <div id="app">
    <div class="header" v-if="$route.path != '/'">
      <div v-if="$route.path != '/WorkIndex'">
        <router-link to="/WorkIndex" tag="p">工作台</router-link>
        <ul>
          <router-link
            v-for="(item,i) in headerList"
            :key="i"
            :to="item.path"
            tag="li"
          >{{item.item}}</router-link>
        </ul>
      </div>
      <p class="workindex" v-else>基于LTE专用网络的视频传输</p>
      <div class="icon_right">
        <span class="username">admin</span>
        <span class="nowtime">{{getTime}}</span>
        <div class="icons">
          <i class="el-icon-minus" title="最小化"></i>
          <i class="el-icon-copy-document" title="最大化"></i>
          <i class="el-icon-close" title="关闭"></i>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // headerList: ['设备管理', '实时视频', '视频回放', '网关接入', '用户管理'],
      headerList: [
        { item: '设备管理', path: '/WorkManage' },
        { item: '实时视频', path: '/Videolive' },
        { item: '视频回放', path: '/VideoPlayback' },
        { item: '网关接入', path: '/GatewayInto' },
        { item: '用户管理', path: '/Admin' }
      ]
    }
  },
  methods: {},
  computed: {
    getTime() {
      let time = new Date()
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()

      month = month > 9 ? month : '0' + month
      day = day > 9 ? day : '0' + day
      return `${year}-${month}-${day}`
    }
  }
}
</script>

<style lang='less' scoped>
#app {
  height: 100%;
  width: 100%;
}
div.header {
  height: 50px;
  background-color: #3a3e43;
  position: relative;
  width: 100%;
  color: rgba(229, 229, 229, 1);
}
div.header::after {
  content: '';
  position: absolute;
  left: 0;
  z-index: 2;
  width: 100%;
  bottom: -2px;
  height: 2px;
  background-color: #00b0ff;
}
div.header p {
  cursor: pointer;
  font-size: 20px;
  text-align: center;
  float: left;
  font-weight: bold;
  width: 120px;
  height: 50px;
  line-height: 50px;
  margin: 0;
}
div.header > p.workindex {
  width: auto;
  margin-left: 45px;
}
div.header > div > p:active,
div.header ul > li:active,
div.header > div > span.username:active {
  background-color: #222;
  border-radius: 3px;
}
ul {
  margin: 0;
  padding: 0;
  display: flex;
}
div.header ul > li {
  list-style: none;
  cursor: pointer;
  width: 120px;
  height: 50px;
  line-height: 50px;
  font-size: 17px;
  text-align: center;
  font-weight: bold;
  position: relative;
  user-select: none;
}
div.header ul > li:hover,
div.header > div > span.username {
  color: #fff;
}

div.header ul > li.show::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  background-color: #3a3e43;
  border: 5px #00b0ff solid;
  border-bottom-color: transparent;
  border-right-color: transparent;
}
div.header > div {
  height: 50px;
  line-height: 50px;
  float: left;
}
div.header > div > span {
  color: rgba(229, 229, 229, 1);
  background-color: rgba(58, 62, 67, 1);
  font-size: 14px;
  margin-left: 30px;
}
div.header > div.icon_right {
  float: right;
  display: flex;
  div {
    margin: 0 20px;
    i {
      display: inline-block;
      padding: 5px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
      &:active {
        background-color: #222;
        border-radius: 2px;
      }
    }
  }
}
span.username {
  display: inline-block;
  height: 100%;
  padding: 0 15px;
  cursor: pointer;
}
</style>
