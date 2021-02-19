<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
require('echarts/theme/macarons') // echarts theme

const colorList = ['#0364FF', '#7C8DFF', '#8FD8B9', '#63BCE6', '#5A6378', '#FEC400']
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    titleName: {
      type: String,
      default: ''
    },
    pieChartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   for (let i = 0; i < this.pieChartData.series.length; i++) {
    //     Object.assign(this.pieChartData.series[i], { itemStyle: { color: colorList[i % 6] } })
    //   }
    //   this.initChart()
    // })
    this.initChart()
  },
  watch: {
    pieChartData: {
      deep: true,
      handler(val) {
        if (val.legend.length > 0 && val.series.length > 0) {
          for (let i = 0; i < this.pieChartData.series.length; i++) {
            Object.assign(this.pieChartData.series[i], { itemStyle: { color: colorList[i % 6] } })
          }
          this.setOptions()
        }
        // this.setOptions()
      }
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      if (this.pieChartData.legend.length > 0 && this.pieChartData.series.length > 0) {
        for (let i = 0; i < this.pieChartData.series.length; i++) {
          Object.assign(this.pieChartData.series[i], { itemStyle: { color: colorList[i % 6] } })
        }
        this.setOptions()
      }
    },
    setOptions() {
      this.chart.setOption({
        title: {
          subtext: '累计\n' + this.titleName,
          x: 'center',
          y: '25%',
          subtextStyle: {
            fontSize: 14,
            lineHeight: 20
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          width: '100%',
          bottom: '10',
          icon: 'circle',
          data: this.pieChartData.legend
        },
        series: [
          {
            name: '识别险种量统计',
            type: 'pie',
            radius: [60, 90],
            center: ['50%', '40%'],
            roseType: 'area',
            // label: {
            //   normal: {
            //   }
            // },
            // labelLine: {
            //   normal: {
            //     smooth: 0.2,
            //     length: 5,
            //     length2: 5
            //   }
            // },
            label: {
              normal: {
                show: true,
                formatter: '{c}'
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#5c5c5c',
                  fontSize: '16',
                  fontWeight: 'bold'
                }
              }
            },
            data: this.pieChartData.series,
            animationEasing: 'cubicInOut',
            animationDuration: 1600
          }
        ]
      })
    }
  }
}
</script>
