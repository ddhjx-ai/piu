<template>
  <div id="admin">
    <div class='header'>
      <p>工作台</p>
      <ul>
        <li
          @click='clickHandle(i)'
          :class="i == index? 'show' : '' "
          v-for='(item,i) in headerList'
          :key='i'
        >{{item}}</li>
      </ul>
      <div>
        <span class='username'>admin</span>
        <span class='nowtime'>2019-12-13</span>
        <img src='../../assets/images/close.png' alt />
      </div>
    </div>

    <el-container>
      <el-aside width="220px">
        <p class="title">用户/角色</p>
        <div class="userSet">
          <el-button type="primary">新增员工</el-button>
          <el-button type="primary">新增角色</el-button>
          <el-button type="primary">删除</el-button>
          <i class="el-icon-search"></i>
        </div>
        <el-input v-model="userSearch" placeholder="搜索..."></el-input>
        <div class="admin">
          <i class="el-icon-caret-right"></i>
        </div>
      </el-aside>

      <el-main>
        <p class="title">角色信息</p>
        <el-form label-width="120px">
          <el-form-item label="用户名:">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="角色:">
            <el-select v-model="value" placeholder="默认分组">
              <el-option v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码:">
            <el-input type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:">
            <el-input type="password"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea"
              :rows="2" v-model="textarea" maxlength="100">
            </el-input>
          </el-form-item>
          <el-form-item label="菜单权限:">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item class="buttons">
            <el-button type="primary">保存</el-button>
            <el-button type="primary">取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      textarea: '',
      userSearch: '',
      index: 0,
      headerList: ['设备管理', '实时视频', '视频回放', '网关接入', '用户管理'],
      options: [
        {value: 'admin1'},
        {value: 'admin2'},
        {value: 'admin3'}
      ],
      value: '',

      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: ['设备管理', '实时视频', '视频回放', '用户管理'],
      isIndeterminate: true
    }
  },
  methods: {
    clickHandle (i) {
      this.index = i
    },

    handleCheckAllChange (val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  }
}
</script>

<style lang="less" scoped>
#admin {
  width: 100%;
  height: 100%;
  background-color: #3a3e43;
}
div.header {
  height: 50px;
  background-color: #3a3e43;
  position: relative;
  border-bottom: 2px #00b0ff solid;
}
div.header > p {
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

.el-container{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  top: 52px;
  background-color: #1d1f22;
  padding: 8px;
  .el-aside{
    height: 100%;
    margin-right: 8px;
    background-color: #2b2f33;
    .userSet{
      height: 32px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .el-button{
        height: 24px;
        padding: 0 5px;
        font-size: 12px;
        border-radius: 2px;
        border: 1px solid #aaa;
        margin-left: 5px;
      }
      .el-icon-search{
        color: #aaa;
        font-size: 15px;
        margin-left: 20px;
        cursor: pointer;
        &:hover{
          color: #fff;
        }
      }
    }
    .el-input{
      height: 26px;
      padding: 0 3px;
      box-sizing: border-box;
      /deep/.el-input__inner{
        height: 26px;
        outline: 0;
        background-color: #000;
        border-radius: 2px;
        border: 0;
        line-height: 26px;
        color: #fff;
      }
    }
  }
  .el-main{
    padding: 0;
    background-color: #2b2f33;
    .el-form {
      margin-top: 10px;
      /deep/.el-form-item__label {
        color: #ccc;
        font-size: 12px;
      }
      .buttons {
        margin-top: 20px;
        padding-right: 10px;
        display: flex;
        justify-content: flex-end;
        .el-button {
          height: 26px;
          width: 72px;
          padding: 0;
          border-radius: 2px;
          font-size: 13px;
        }
      }
      .el-form-item {
        padding: 0px 10px;
        margin-bottom: 10px;
        &:nth-of-type(1),
        &:nth-of-type(2){
          display: inline-block;
        }
        &:nth-of-type(1),
        &:nth-of-type(2),
        &:nth-of-type(3),
        &:nth-of-type(4){
          width: 360px;
        }
        /deep/.el-form-item__content {
          .el-input {
            ::placeholder{
              font-size: 12px;
              color: #aaa;
            }
            input.el-input__inner {
              height: 26px;
              line-height: 26px;
              border-radius: 2px;
              background-color: #1f2124;
              outline: 0;
              border: 0;
              box-shadow: 0 1px 1px 0 #666;
              color: #eee;
            }
          }
          .el-select{
            width: 100%;
          }
          .el-textarea{
            .el-textarea__inner{
              height: 48px;
              line-height: 1;
              border-radius: 2px;
              background-color: #1f2124;
              outline: 0;
              border: 0;
              box-shadow: 0 1px 1px 0 #666;
              color: #eee;
              resize: none;
              overflow-y:hidden;
            }
          }
          
        }
      }
    }
  }
  p.title{
    margin: 0;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-size: 13px;
    color: #ccc;
    background-color: #3a3e43;
  }
}
</style>
