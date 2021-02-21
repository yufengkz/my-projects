 /* 「法人担保页面」 */
<template>
  <div class="personPage">
    <el-row>
      <el-col :span="24">
        <div class="indexTop">
          <el-tabs v-model="activeName" @tab-click="handleClick" class="lvsige">
            <el-tab-pane label="待办" name="first">
              <BacklogList ref="BacklogList"></BacklogList>
            </el-tab-pane>
            <el-tab-pane label="已办" name="second">
              <UnderwayList ref="UnderwayList"></UnderwayList>
            </el-tab-pane>
            <el-tab-pane label="已完成" name="third">
              <FinishedList ref="FinishedList"></FinishedList>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <div class="indexBottom">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="() => {this.$router.push('/cosigner-manage/legal/add')}"
        >添加法人担保申请</el-button>
      </div>
    </el-row>
  </div>
</template>
<script>
import BacklogList from './components/BacklogList'
import FinishedList from './components/FinishedList'
import UnderwayList from './components/UnderwayList'
import { mapGetters } from 'vuex'
export default {
  name: 'CosignerManageLegal',
  components: {
    BacklogList,
    FinishedList,
    UnderwayList
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['commonEnum'])
  },
  mounted() {
    if (this.activeName === 'first') {
      this.$refs.BacklogList.getPrereviewList(1)
      this.$refs.BacklogList.getStatus()
    }
  },
  methods: {
    handleClick(tab, event) {
      if (this.activeName === 'first') {
        this.$refs.BacklogList.getPrereviewList(1)
        this.$refs.BacklogList.getStatus()
      } else if (this.activeName === 'second') {
        this.$refs.UnderwayList.getPrereviewList(1)
        this.$refs.UnderwayList.getStatus()
      } else {
        this.$refs.FinishedList.getPrereviewList(1)
        this.$refs.FinishedList.getStatus()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.personPage {
  /deep/ .el-form-item__label {
    min-width: 130px !important;
  }
  /deep/.el-tabs__header {
    padding: 10px 20px 0 21px !important;
    position: relative;
    margin: 0 !important;
    background: #fff !important;
  }
  .indexTop {
    position: relative;
    width: 100%;
    /*height: 500px;*/
  }
  .indexBottom {
    position: absolute;
    right: 20px;
    top: 10px;
  }
}
</style>
