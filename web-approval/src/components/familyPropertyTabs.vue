<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane :label="tabsLabel.a" v-if="tabsLabel.a && TableProp[1] && TableProp[1].length > 0">
        <el-table :data="TableProp[1]" border style="width: 100%;" size="medium" class="m-t-30">
          <el-table-column prop="housingProvince$FICDictName" :label="TableLabel.commodityHouse.a"></el-table-column>
          <el-table-column prop="housingArea" :label="TableLabel.commodityHouse.b"></el-table-column>
          <el-table-column prop="housingStructure$FICDictName" :label="TableLabel.commodityHouse.c"></el-table-column>
          <el-table-column prop="housingArea" :label="TableLabel.commodityHouse.d"></el-table-column>
          <el-table-column prop="housingValue" :label="TableLabel.commodityHouse.e"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="tabsLabel.b" v-if="tabsLabel.b && TableProp[2] && TableProp[2].length > 0">
        <el-table :data="TableProp[2]" border style="width: 100%;" size="medium" class="m-t-30">
          <el-table-column prop="housingProvince$FICDictName" :label="TableLabel.buildHouse.a"></el-table-column>
          <el-table-column prop="housingAddress" :label="TableLabel.buildHouse.b"></el-table-column>
          <el-table-column prop="housingArea" :label="TableLabel.buildHouse.c"></el-table-column>
          <el-table-column prop="housingValue" :label="TableLabel.buildHouse.d"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="tabsLabel.c" v-if="tabsLabel.c && TableProp[99] && TableProp[99].length > 0">
        <el-table :data="TableProp[99]" border style="width: 100%;" size="medium" class="m-t-30">
          <el-table-column prop="othreAssertType" :label="TableLabel.otherAssets.a"></el-table-column>
          <el-table-column prop="othreAssertValue" :label="TableLabel.otherAssets.b"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    data: {
      type: [Array, Object],
      default: null
    },
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
  watch: {},
  created() {
    console.log(this.TableProp, this.tabsLabel)
  },
  mounted() {},
  methods: {}
}
</script>

<style>
</style>
