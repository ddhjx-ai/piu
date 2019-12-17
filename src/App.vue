<template>
  <div id="app">
    <div class='header' v-if="$route.path != '/' && $route.path != '/WorkIndex'">
      <router-link to="/WorkIndex" tag="p">工作台</router-link>
      <ul>
        <router-link
          v-for='(item,i) in headerList'
          :key='i'
          :to='item.path'
          tag="li"
        >{{item.item}}</router-link>
      </ul>
      <div>
        <span class='username'>admin</span>
        <span class='nowtime'>{{getTime}}</span>
        <img src='./assets/images/close.png' alt />
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // headerList: ['设备管理', '实时视频', '视频回放', '网关接入', '用户管理'],
      headerList: [
        {item: '设备管理', path: '/WorkManage'},
        {item: '实时视频', path: '/Videolive'},
        {item: '视频回放', path: '/VideoPlayback'},
        {item: '网关接入', path: '/GatewayInto'},
        {item: '用户管理', path: '/Admin'}
      ]
    }
  },
  methods: {
  },
  computed: {
    getTime () {
      let time = new Date()
      let year = time.getFullYear().toString().padStart('0', 2)
      let month = (time.getMonth() + 1).toString().padStart('0', 2)
      let day = time.getDate().toString().padStart('0', 2)

      return `${year}-${month}-${day}`
    }
  }
}
</script>

<style scoped>
  #app{
    height: 100%;
    width: 100%;
  }
  div.header {
  height: 50px;
  background-color: #3a3e43;
  position: relative;
  border-bottom: 2px #00b0ff solid;
}
div.header > p {
  cursor: pointer;
  font-size: 20px;
  text-align: center;
  float: left;
  font-weight: bold;
  width: 120px;
  height: 50px;
  line-height: 50px;
  color: rgba(229, 229, 229, 1);
  margin: 0;
}
ul {
  margin: 0;
  padding: 0;
}
ul > li {
  float: left;
  list-style: none;
  cursor: pointer;
}
div.header > ul > li {
  width: 120px;
  height: 50px;
  line-height: 50px;
  color: rgba(229, 229, 229, 1);
  font-size: 17px;
  text-align: center;
  font-weight: bold;
  position: relative;
  user-select: none;
}
div.header > ul > li:hover{
  color: #fff;
}
div.header > ul > li.show::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  background-color: #3a3e43;
  width: 5px;
  height: 5px;
  border: 2px #00b0ff solid;
  border-bottom-width: 0;
  border-right-width: 0;
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
</style>
