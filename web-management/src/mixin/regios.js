// 三级联动公用方法
export default {
  methods: {
    async setNodes(level, id) {
      let nodes = []
      if (level === 1) {
        const data = await this.$store.dispatch('GetCity', { areaId: id })
        const { areaId, list } = data
        if (id === areaId) {
          nodes = list.map(item => ({
            ...item,
            leaf: level >= 2
          }))
        }
      }
      if (level === 2) {
        const data = await this.$store.dispatch('GetCounty', { areaId: id })
        const { areaId, list } = data
        if (id === areaId) {
          nodes = list.map(item => ({
            ...item,
            leaf: level >= 2
          }))
        }
      }
      return nodes
    }
  }
}
