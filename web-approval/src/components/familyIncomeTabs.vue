<template>
  <div>
    <el-tabs type="border-card" v-model="curIndex">
      <!-- 农机服务 -->
      <el-tab-pane
        v-if="tabsLabel.a && TableProp.machineryCreateDTOS && TableProp.machineryCreateDTOS.length > 0"
        :label="tabsLabel.a"
        name ="1"
      >
        <el-table
          v-if="TableLabel.farmingServiceLabel"
          :data="TableProp.machineryCreateDTOS"
          border
          style="width: 100%;"
          size="medium"
          class="m-t-30"
        >
          <el-table-column :label="TableLabel.farmingServiceLabel.a">
            <template slot-scope="scope">{{scope.row.incomeChildType$FICDictName}}</template>
          </el-table-column>
          <el-table-column prop="machineNum" :label="TableLabel.farmingServiceLabel.b"></el-table-column>
          <el-table-column prop="serviceArea" :label="TableLabel.farmingServiceLabel.c"></el-table-column>
          <el-table-column prop="yearIncome" :label="TableLabel.farmingServiceLabel.d"></el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 经商 -->
      <el-tab-pane
        v-if="tabsLabel.b && TableProp.businessCreateDTOS && TableProp.businessCreateDTOS.length > 0"
        :label="tabsLabel.b"
        name ="2"
      >
        <el-table
          v-if="TableLabel.businessLabel"
          :data="TableProp.businessCreateDTOS"
          border
          style="width: 100%;"
          size="medium"
          class="m-t-30"
        >
          <el-table-column prop="businessProject" :label="TableLabel.businessLabel.a"></el-table-column>
          <el-table-column prop="yearIncome" :label="TableLabel.businessLabel.b"></el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 养殖 -->
      <el-tab-pane
        v-if="tabsLabel.c && TableProp.breedCreateDTOS && TableProp.breedCreateDTOS.length > 0"
        :label="tabsLabel.c"
        name ="3"
      >
        <el-table
          :data="TableProp.breedCreateDTOS"
          v-if="TableLabel.breedLabel"
          border
          style="width: 100%;"
          size="medium"
          class="m-t-30"
        >
          <el-table-column v-if="TableProp.breedCreateDTOS[0].incomeChildType" prop="incomeChildType" :label="TableLabel.breedLabel.a"></el-table-column>
          <el-table-column v-if="TableProp.breedCreateDTOS[0].breedType" prop="breedType" :label="TableLabel.breedLabel.a"></el-table-column>
          <el-table-column prop="breedNum" :label="TableLabel.breedLabel.b"></el-table-column>
          <el-table-column prop="yearIncome" :label="TableLabel.breedLabel.c"></el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 种植 -->
      <el-tab-pane
        v-if="tabsLabel.i && TableProp && TableProp.plantCreateDTOS && TableProp.plantCreateDTOS.length > 0"
        :label="tabsLabel.i"
        name ="4"
      >
        <el-table
          :data="TableProp.plantCreateDTOS"
          border
          v-if="TableLabel.plantLabel"
          style="width: 100%;"
          size="medium"
          class="m-t-30"
        >
          <el-table-column prop="incomeChildType$FICDictName" :label="TableLabel.plantLabel.a"></el-table-column>
          <el-table-column prop="plantArea" :label="TableLabel.plantLabel.b"></el-table-column>
          <el-table-column prop="yearIncome" :label="TableLabel.plantLabel.c"></el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 打工人数 -->
      <el-tab-pane
        v-if="tabsLabel.d && TableProp && TableProp.workingCreateDTOS && TableProp.workingCreateDTOS.length > 0"
        :label="tabsLabel.d"
        name ="5"
      >
        <el-table
          :data="TableProp.workingCreateDTOS"
          v-if="TableLabel.WorkingLabel"
          border
          style="width: 100%;"
          size="medium"
          class="m-t-30"
        >
          <el-table-column prop="workNum" :label="TableLabel.WorkingLabel.a"></el-table-column>
          <el-table-column prop="workContent" :label="TableLabel.WorkingLabel.b"></el-table-column>
          <el-table-column prop="workArea" :label="TableLabel.WorkingLabel.c"></el-table-column>
          <el-table-column prop="yearIncome" :label="TableLabel.WorkingLabel.d"></el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 固定工资 -->
      <el-tab-pane
        v-if="tabsLabel.e && TableProp && TableProp.salaryCreateDTOS && TableProp.salaryCreateDTOS.length > 0"
        :label="tabsLabel.e"
        name ="6"
      >
        <el-table
          :data="TableProp.salaryCreateDTOS"
          v-if="TableLabel.fixedWageLabel"
          border
          style="width: 100%;"
          size="medium"
          class="m-t-30"
        >
          <el-table-column prop="workCompany" :label="TableLabel.fixedWageLabel.a"></el-table-column>
          <el-table-column prop="workYear" :label="TableLabel.fixedWageLabel.b"></el-table-column>
          <el-table-column prop="yearIncome" :label="TableLabel.fixedWageLabel.c"></el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 基本支出 -->
      <el-tab-pane
        v-if="tabsLabel.e && TableProp && TableProp.baseDTOS && TableProp.baseDTOS.length > 0"
        :label="tabsLabel.f"
        name ="7"
      >
        <!-- <el-table
          :data="TableProp.baseDTOS"
          v-if="TableLabel.basicExpendLabel"
          border
          style="width: 100%;"
          size="medium"
          class="m-t-30"
        >
          <el-table-column prop="incomeType$FICDictName" :label="TableLabel.basicExpendLabel.a"></el-table-column>
          <el-table-column prop="incomeType$FICDictName" :label="TableLabel.basicExpendLabel.b"></el-table-column>
          <el-table-column prop="incomeType$FICDictName" :label="TableLabel.basicExpendLabel.c"></el-table-column>
        </el-table>-->
        <el-form
          :model="TableProp"
          size="mini"
          class="m-t-20 p-l-10 block-el-select"
          label-position="right"
          label-width="140px"
        >
          <el-form-item label="基本生活支出">
            <el-input type="number" v-model="TableProp.baseDTOS['01'].yearExpend" placeholder="请输入" min="0">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="大病医疗年支出金额">
            <el-input type="number" v-model="TableProp.baseDTOS['02'].yearExpend" placeholder="请输入" min="0">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="婚丧嫁娶年支出金额">
            <el-input type="number" v-model="TableProp.baseDTOS['03'].yearExpend" placeholder="请输入" min="0">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 政府补贴 -->
      <el-tab-pane
        v-if="tabsLabel.g && TableProp && TableProp.subsidiesCreateDTOS && TableProp.subsidiesCreateDTOS.length > 0"
        :label="tabsLabel.g"
        name ="8"
      >
        <el-table
          :data="TableProp.subsidiesCreateDTOS"
          v-if="TableLabel.subsidyLabel"
          border
          style="width: 100%;"
          size="medium"
          class="m-t-30"
        >
          <el-table-column prop="governmentSubsidyFlag$FICDictName" :label="TableLabel.subsidyLabel.a"></el-table-column>
          <el-table-column prop="governmentSubsidyContent" :label="TableLabel.subsidyLabel.b"></el-table-column>
          <el-table-column prop="yearIncome" :label="TableLabel.subsidyLabel.c"></el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 购置资产 -->
      <el-tab-pane
        v-if="tabsLabel.h && TableProp && TableProp.acquisitionAssetsDTOS && TableProp.acquisitionAssetsDTOS.length > 0"
        :label="tabsLabel.h"
        name ="9"
      >
        <el-table
          :data="TableProp.acquisitionAssetsDTOS"
          border
          v-if="TableLabel.buyAssets"
          style="width: 100%;"
          size="medium"
          class="m-t-30"
        >
          <el-table-column prop="incomeChildType$FICDictName" :label="TableLabel.buyAssets.a"></el-table-column>
          <el-table-column prop="yearExpend" :label="TableLabel.buyAssets.b"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      curIndex: '1'
    }
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
  mounted() {
    // console.log(this.tableData)
  },
  methods: {
  }
}
</script>

<style>
</style>
