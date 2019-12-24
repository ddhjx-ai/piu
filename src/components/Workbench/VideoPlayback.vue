<template>
  <div id="playBack">
    <el-container>
      <el-aside width="250px">
        <div class="aside_top">
          <el-button icon="el-icon-video-camera" :class="flag==1?'active':''" @click="test_set()">设备</el-button>
          <el-button icon="el-icon-s-platform" :class="flag==0?'active':''" @click="test_local()">本地</el-button>
          <div class="icons">
            <span v-if="flag==1">设备</span>
            <span v-else>本地</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-input placeholder="请输入内容" v-model="input">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="aside_tree">
          <el-tree :data="tree_data" :props="defaultProps" show-checkbox></el-tree>
        </div>
        <div class="aside_view">
          <div class="views">
            <span>视图</span>
            <i class="el-icon-caret-right"></i>
          </div>
          <el-form :model="view_form">
            <el-form-item>
              <el-radio-group v-model="view_form.radio" class="radios">
                <el-radio label="录像"></el-radio>
                <el-radio label="图片"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="录像类型：">
              <el-select v-model="view_form.video" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="码流类型：">
              <el-select v-model="view_form.code" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间：">
              <el-date-picker
                v-model="view_form.time"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="MM/dd HH:mm"
                :editable='false'
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <i slot="suffix" class="el-input__icon"></i>
              <el-input v-model="view_form.value"></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary">搜索</el-button>
            </el-form-item>
          </el-form>
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
      input: '',
      flag: 1,
      tree_data: [
        {
          label: '默认分组',
          children: [
            { label: 'A栋大3楼1001' },
            { label: 'A栋大3楼1001' },
            { label: 'A栋大3楼1001' },
            { label: 'A栋大3楼1001' },
            { label: 'A栋大3楼1001' },
            { label: 'A栋大3楼1001' },
            { label: 'A栋大3楼1001' },
            { label: 'A栋大3楼1001' }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      view_form: {
        radio: '',
        video: '',
        code: '',
        tiem: '',
        value: ''
      }
    }
  },

  methods: {
    test_set() {
      this.flag = 1
    },
    test_local() {
      this.flag = 0
    }
  }
}
</script>
<style lang="less" scoped>
#playBack {
  width: 100%;
  min-height: 100%;
  background-color: #3a3e43;
  padding-top: 52px;
  box-sizing: border-box;
}
.el-container {
  height: 100%;
  .el-aside {
    .aside_top {
      background-color: #2a2b2e;
      button {
        float: left;
        border: 0;
        border-radius: 0;
        width: 50%;
        height: 40px;
        margin: 0;
        background-color: #1d1f23;
        color: #f0efef;
        &.active {
          background-color: #3a3e43;
        }
      }
      .icons {
        height: 40px;
        width: 100%;
        display: flex;
        padding: 0 10px 0 0;
        align-items: center;
        box-sizing: border-box;
        justify-content: space-between;
        background-color: #3a3e43;
        span {
          color: #fff;
          margin-left: 5px;
        }
        .el-icon-caret-bottom {
          color: #ccc;
        }
      }
      .el-input {
        margin: 12px 0;
        height: 26px;
        /deep/.el-input__inner {
          height: 26px;
          line-height: 26px;
          border-radius: 0;
          background-color: #1f2124;
          border: 0;
          color: #ccc;
        }
        .el-input__icon {
          line-height: 26px;
          cursor: pointer;
        }
      }
    }
    .aside_tree {
      height: 420px;
      background-color: #2b2f33;
      .el-tree {
        width: 250px;
        background-color: transparent;
        color: #ddd;
        height: 100%;
        overflow: auto;
        /deep/.el-tree-node__content {
          background-color: transparent;
        }
        /deep/.el-tree-node__children {
          /deep/.el-tree-node__content {
            background-color: transparent;
            &:hover {
              background-color: #555;
            }
          }
        }
        /deep/.el-tree-node__expand-icon.expanded {
          color: #40c4ff;
        }
        /deep/.el-checkbox__inner {
          border-color: #000;
          background-color: #666;
        }
      }
    }
    .aside_view {
      background-color: #3a3e43;
      .views {
        height: 40px;
        border-bottom: 1px solid #111;
        color: #b1b1b1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px 0 5px;
      }
      .el-form {
        padding: 10px;
        .el-form-item {
          margin-bottom: 5px;
          .radios {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 40px;
            .el-radio {
              color: #ccc;
              /deep/.el-radio__inner {
                width: 18px;
                height: 18px;
                background-color: #3d434a;
                border: 1px solid #222;
                box-shadow: 0 0 4px 0 #222 inset;
                &::after {
                  width: 8px;
                  height: 8px;
                  background-color: #48c6ff;
                }
              }
              /deep/.el-radio__input.is-checked + .el-radio__label {
                color: #ccc;
              }
            }
          }
          /deep/.el-form-item__label {
            color: #ccc;
          }
        }
        /deep/.el-form-item__content {
          .el-input {
            ::placeholder {
              font-size: 12px;
              color: #aaa;
            }
          }
          .el-range-editor.el-input__inner{
            width: 100%;
            .el-range-input{
              background-color: transparent;
            }
            .el-icon-time{
              line-height: 1;
            }
            .el-range__close-icon{
              line-height: 1;
            }
            .el-range-separator{
              line-height: 1;
              color: #fff;
            }
          }
          .el-select {
            width: 100%;
          }
          .el-input__inner {
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
        .el-button {
          width: 100%;
        }
      }
    }
  }

  .el-main {
    min-height: 100%;
    background-color: #222;
  }
}
</style>
