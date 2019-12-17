<template>
  <div id='workManage'>
    <div class='main'>
      <div>
        <ul>
          <li @click='active = 1'>
            <i class='el-icon-search'></i>自动搜索
          </li>
          <li @click='active = 2'>
            <i class='el-icon-plus'></i>添加设备
          </li>
          <li @click='active = 3'>
            <i class='el-icon-folder-add'></i>添加分组
          </li>
          <li>
            <i class='el-icon-delete'></i>删除
          </li>
          <li @click='active = 5'>
            <i class='el-icon-upload2' ></i>导出
          </li>
          <li @click='active = 6'>
            <i class='el-icon-download'></i>导入
          </li>
        </ul>
        <div>
          <span>设备总数：{{test_data.length}}</span>
          <span>在线总数：{{onlinNum}}</span>
        </div>
      </div>
      <p>所有设备</p>
      <table style='width:100%'>
        <thead>
          <tr>
            <th>
              <span><input type='checkbox' v-model='checked'/></span>
              <span>序号</span>
            </th>
            <th>名称</th>
            <th>IP/域名</th>
            <th>设备类型</th>
            <th>设备型号</th>
            <th>端口</th>
            <th>通道数</th>
            <th>在线状态</th>
            <th>序列号</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(item,i) in test_data' :key='i'>
            <td>
              <span><input type='checkbox' v-model='checked' /></span>
              <span>{{i+1}}</span>
            </td>
            <td>{{item.test_name}}</td>
            <td>{{item.test_ip}}</td>
            <td>{{item.test_type ? item.test_type : 'N/A'}}</td>
            <td>{{item.test_code ? item.test_code : 'N/A'}}</td>
            <td>{{item.test_prot}}</td>
            <td>{{item.test_ways ? item.test_ways : 'N/A'}}</td>
            <td class='statu'> <span :class="item.test_statu ? 'now' : ''"></span> {{item.test_statu ? '在线' : '离线'}}</td>
            <td>{{item.test_number ? item.test_number : 'N/A'}}</td>
            <td>
              <el-button type='text' size='small'>修改</el-button>
              <el-button type='text' size='small'>删除</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <autoSearch v-if='active == 1' @changeActive='changeActive'/>
    <addEquipment  v-if='active == 2' @changeActive='changeActive'/>
    <addGroups v-if='active == 3' @changeActive='changeActive'/>
    <setout v-if='active == 5' @changeActive='changeActive'/>
    <setInsert v-if='active == 6' @changeActive='changeActive'/>
  </div>
</template>

<script>
import setout from '../Workcategory/Setout'
import setInsert from '../Workcategory/SetInsert'
import addGroups from '../Workcategory/AddGroups'
import addEquipment from '../Workcategory/AddEquipment'
import autoSearch from '../Workcategory/AutoSearch'
export default {
  name: 'WorkManage',
  data () {
    return {
      checked: true,
      active: 0,
      test_data: [
        {
          test_name: 'A栋大3楼1001',
          test_ip: '10.0.0.111',
          test_type: '',
          test_code: '',
          test_prot: '22222',
          test_ways: '',
          test_statu: true,
          test_number: ''
        },
        {
          test_name: 'A栋大3楼1001',
          test_ip: '10.0.0.111',
          test_type: '',
          test_code: '',
          test_prot: '22222',
          test_ways: '',
          test_statu: true,
          test_number: ''
        },
        {
          test_name: 'A栋大3楼1001',
          test_ip: '10.0.0.111',
          test_type: '',
          test_code: '',
          test_prot: '22222',
          test_ways: '',
          test_statu: false,
          test_number: ''
        },
        {
          test_name: 'A栋大3楼1001',
          test_ip: '10.0.0.111',
          test_type: '',
          test_code: '',
          test_prot: '22222',
          test_ways: '',
          test_statu: false,
          test_number: ''
        },
        {
          test_name: 'A栋大3楼1001',
          test_ip: '10.0.0.111',
          test_type: '',
          test_code: '',
          test_prot: '22222',
          test_ways: '',
          test_statu: false,
          test_number: ''
        },
        {
          test_name: 'A栋大3楼1001',
          test_ip: '10.0.0.111',
          test_type: '',
          test_code: '',
          test_prot: '22222',
          test_ways: '',
          test_statu: false,
          test_number: ''
        },
        {
          test_name: 'A栋大3楼1001',
          test_ip: '10.0.0.111',
          test_type: '',
          test_code: '',
          test_prot: '22222',
          test_ways: '',
          test_statu: false,
          test_number: ''
        },
        {
          test_name: 'A栋大3楼1001',
          test_ip: '10.0.0.111',
          test_type: '',
          test_code: '',
          test_prot: '22222',
          test_ways: '',
          test_statu: true,
          test_number: ''
        }
      ]
    }
  },
  methods: {
    outSet () {
      console.log(12)
    },

    changeActive (num) {
      this.active = num
    }
  },
  computed: {
    // 在线总数
    onlinNum () {
      let onLineArr = this.test_data.filter(item => item.test_statu)
      return onLineArr.length
    }
  },
  components: {
    setout,
    setInsert,
    addGroups,
    addEquipment,
    autoSearch
  }
}
</script>

<style lang='' scoped>
#workManage {
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

.main {
  padding: 0 10px;
}
.main > div {
  height: 45px;
  display: flex;
  justify-content: space-between;
  line-height: 45px;
  color: rgba(229, 229, 229, 1);
}
.main > div li {
  width: 100px;
  height: 45px;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #ccc;
}
.main > div li:hover{
  color: #fff;
  text-shadow: 0px  0px  #fff;
}
.main > div li i {
  font-size: 20px;
  margin-right: 5px;
}
.main > div span {
  margin-right: 20px;
}
.main > p {
  margin: 0;
  height: 40px;
  background-color: #000;
  color: #fff;
  line-height: 40px;
  padding-left: 20px;
}
table {
  color: #abb2bd;
  font-size: 14px;
}
table > thead {
  height: 30px;
  line-height: 30px;
  background-color: #3f4348;
}
table > tbody {
  height: 30px;
  line-height: 30px;
  text-align: center;
}
table > tbody td.statu span{
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ddd;
}
table > tbody td.statu span.now{
  background-color: greenyellow;
}
table > tbody > tr:nth-of-type(odd) {
  background-color: #35393e;
}
table > tbody > tr:nth-of-type(even) {
  background-color: #3f4348;
}
table tr td:nth-of-type(1),
table tr th:nth-of-type(1){
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
table tr td:nth-of-type(1) span,
table tr th:nth-of-type(1) span{
  display: inline-block;
  width: 50%;
}
</style>
