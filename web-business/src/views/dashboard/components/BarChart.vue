<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
require('echarts/theme/macarons') // echarts theme

const animationDuration = 2800
// const colorList = ['#545AFF', '#4483FF', '#AACAFF', '#FF9FA2', '#FF8F49', '#FFD27C']
const colorList = ['#0263FF', '#FF6363']
const axisLineColor = '#9EA0A5'

// const seriesDataDefault = {
//   type: 'bar',
//   stack: 'recognitionRate',
//   barMaxWidth: 30, // 柱宽度
//   barMinWidth: 20, // 柱宽度
//   animationDuration
// }

const seriesBarDefault = {
  animationDuration,
  type: 'bar',
  barMaxWidth: 8,
  barMinWidth: 2,
  itemStyle: {
    color: new echarts.graphic.LinearGradient(
      0, 0, 0, 1,
      [
        { offset: 0, color: '#1C72FE' },
        { offset: 1, color: '#6CA0FB' }
      ]
    ),
    barBorderRadius: [2, 2, 0, 0]
  }
}
const seriesLineDefault = {
  animationDuration,
  type: 'line',
  smooth: true,
  symbol: 'circle',
  symbolSize: 2,
  itemStyle: {
    color: colorList[1]
    // normal: {
    //   lineStyle: {
    //     width: 2,
    //     shadowColor: '#FF6363',
    //     shadowBlur: 10,
    //     shadowOffsetY: 12,
    //     opacity: 0.7
    //   }
    // }
  },
  lineStyle: {
    width: 2,
    shadowColor: colorList[1],
    shadowBlur: 10,
    shadowOffsetY: 12,
    opacity: 0.2
  },
  areaStyle: {
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: colorList[1] // 0% 处的颜色
        },
        // {
        //   offset: 0.8,
        //   color: '#E7E8FF' // 50% 处的颜色
        // },
        {
          offset: 1,
          color: '#FFFFFF' // 100% 处的颜色
        }
      ]
    },
    opacity: 0.2
  },
  animationEasing: 'cubicInOut'
}

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
    barChartData: {
      type: Object,
      required: true
    }
    // legendList: {
    //   type: Array,
    //   default: () => ['总授权', '绑定手机号数', '开通VIP数']
    // }
  },
  data() {
    return {
      chart: null,
      showZoom: true
    }
  },
  mounted() {
    this.initChart()
    // this.$nextTick(() => {
    //   this.initChart()
    // })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  // computed: {
  //   showZoom() {
  //     return this.barChartData.xAxis.length < 10
  //   }
  // },
  watch: {
    barChartData: {
      deep: true,
      handler(val) {
        for (let i = 0; i < val.series.length; i++) {
          // Object.assign(val.series[i], seriesDataDefault, { itemStyle: { color: colorList[i % 2] } })
          if (val.series[i].type === 'bar') {
            Object.assign(val.series[i], seriesBarDefault)
          } else if (val.series[i].type === 'line') {
            Object.assign(val.series[i], seriesLineDefault)
          }
        }
        this.setOptions()
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      // this.setOptions()
    },
    setOptions() {
      this.showZoom = this.barChartData.xAxis.length <= 7
      this.chart.setOption({
        dataZoom: [
          // 数据区域缩放组件
          {
            type: 'inside', // 内置型数据区域缩放组件 PC端：鼠标在坐标系范围内滚轮滚动缩放
            // type: 'slider', // 滑动条型数据区域缩放组件
            disabled: this.showZoom,
            filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
            start: 0,
            end: 100
            // bottom: -20
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            // type: 'cross'
          }
          // formatter(params) {
          //   params.reverse()
          //   let tipStr = `时间:${params[0].name}<br/>`
          //   for (var i = 0; i < params.length; i++) {
          //     if (params[i].data) tipStr += `${params[i].marker}${params[i].seriesName}:${params[i].data}<br/>`
          //   }
          //   return tipStr
          // }
        },
        legend: {
          data: this.barChartData.legend
        },
        grid: {
          top: 40,
          left: '5',
          right: '5',
          bottom: '10',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.barChartData.xAxis,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: axisLineColor
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '金额',
            axisLine: {
              lineStyle: {
                // color: colorList[1]
                color: axisLineColor
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            splitArea: {
              show: false
            }
            // min: 0,
            // max: 250,
            // interval: 50,
            // axisLabel: {
            //   formatter: '{value} ml'
            // }
          },
          {
            type: 'value',
            name: '笔数',
            axisLine: {
              lineStyle: {
                // color: colorList[0]
                color: axisLineColor
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            splitArea: {
              show: false
            }
            // min: 0,
            // max: 25,
            // interval: 5,
            // axisLabel: {
            //   formatter: '{value} °C'
            // }
          }
        ],
        series: this.barChartData.series
      })
    }
  }
}
</script>
