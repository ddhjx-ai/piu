<template>
  <div id="videoPlay">
    <el-container class="container">
      <el-aside width="250px">
        <div class="buttons">
          <el-button class="active" icon="el-icon-video-camera">设备</el-button>
          <el-button icon="el-icon-s-platform">本地</el-button>
          <el-select v-model="value" placeholder="设备">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: '1111'
        },
        {
          value: '2222'
        },
        {
          value: '3333'
        },
        {
          value: '4444'
        }
      ],
      value: ''
    }
  }
}
</script>

<style lang="less" scoped>
#videoPlay {
  width: 100%;
  position: absolute;
  background-color: #3a3e43;
  top: 52px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.el-container.container {
  min-height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  background-color: #3a3e43;
  .el-aside {
    background-color: #2a2b2e;
    .buttons {
      width: 100%;
      height: 180px;
      button {
        width: 50%;
        height: 40px;
        padding: 0;
        margin: 0;
        float: left;
        background-color: #1d1f23;
        border-radius: 0;
        border: 0;
        color: #e3e2e2;
        &.active{
          background-color: transparent;
        }
      }
      .el-select{
        width: 100%;
        border-radius: 0;
        color: #e3e2e2;
        /deep/.el-input__inner{
          color: #e3e2e2;
          background: transparent;
          border: 0
        }
      }
    }
  }
}
</style>
