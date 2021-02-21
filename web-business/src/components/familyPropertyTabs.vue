<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" v-if="Object.keys(TableProp).length !== 0" @tab-click="clickTab">
      <el-tab-pane name="1" :label="tabsLabel.a" v-if="tabsLabel.a && TableProp[1] && TableProp[1].length > 0">
        <el-table :data="TableProp[1]" border style="width: 100%;" size="medium" class="m-t-30">
          <el-table-column prop="housingProvince$FICDictName" :label="TableLabel.commodityHouse.a"></el-table-column>
          <el-table-column prop="housingAddress" :label="TableLabel.commodityHouse.b"></el-table-column>
          <el-table-column prop="housingArea" :label="TableLabel.commodityHouse.c"></el-table-column>
          <el-table-column prop="housingValue" :label="TableLabel.commodityHouse.d"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="2" :label="tabsLabel.b" v-if="tabsLabel.b && TableProp[2] && TableProp[2].length > 0">
        <el-table :data="TableProp[2]" border style="width: 100%;" size="medium" class="m-t-30">
          <el-table-column prop="housingProvince$FICDictName" :label="TableLabel.buildHouse.a"></el-table-column>
          <el-table-column prop="housingAddress" :label="TableLabel.buildHouse.b"></el-table-column>
           <el-table-column prop="housingStructure$FICDictName" :label="TableLabel.buildHouse.c"></el-table-column>
          <el-table-column prop="housingArea" :label="TableLabel.buildHouse.d"></el-table-column>
          <el-table-column prop="housingValue" :label="TableLabel.buildHouse.e"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="99" :label="tabsLabel.c" v-if="tabsLabel.c && TableProp[99] && TableProp[99].length > 0">
        <el-table :data="TableProp[99]" border style="width: 100%;" size="medium" class="m-t-30">
          <el-table-column prop="othreAssertType" :label="TableLabel.otherAssets.a" :formatter="othreAssertFormatter" >
            <!-- <template  slot-scope="scope">
             <render
                :column="column"
                :row="scope.row"
                :render="column.render"
                :index="index"
              ></render>
            </template>-->
          </el-table-column>
          <el-table-column v-if="TableProp[99].othreAssertType$FICDictName" prop="othreAssertType$FICDictName" :label="TableLabel.otherAssets.a"></el-table-column>
          <el-table-column prop="othreAssertValue" :label="TableLabel.otherAssets.b"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeName: '1'
    }
  },
  props: {
    tabsLabel: {
      type: Object,
      default: () => {}
    },
    TableLabel: {
      type: Object,
      default: () => {}
    },
    TableProp: {
      type: [Array, Object],
      default: null
    }
  },
  watch: {
    TableProp(newVal, oldVal) {
      if (newVal) {
        for (const key in newVal) {
          if (key) {
            this.activeName = key
            return
          }
        }
      }
    },
    deep: true
  },
  computed: {
    ...mapGetters(['commonEnum'])
  },
  created() {
    for (const key in this.TableProp) {
      if (key) {
        this.activeName = key
        return
      }
    }
  },
  mounted() {},
  methods: {
    clickTab(tab) {
      this.activeName = tab.name
    },
    othreAssertFormatter(row, column, cellValue, index) {
      // debugger
      return this.commonEnum.assertType[Number(cellValue)]
    }
  }
}
</script>

<style>
</style>
