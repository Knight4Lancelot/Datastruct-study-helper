<template>
  <div>
	<el-button @click="changeList()">click it</el-button>
    <treecanvas class="tree-canvas-show" :elementList="TreeList" v-if="isshow"></treecanvas>
  </div>
</template>

<script>
import treecanvas from '../components/TreeDesignCanvas.vue'

export default {
  name: 'HomeView',
  components: {
	treecanvas
  },
  data() {
	return {
		TreeList: ['1', '2', '3', 'nil', '4', '5', '6', '7','8','9','10','11', '12'],
		isshow: true
	}
  },
  methods: {
	changeList() {
		this.TreeList.push('x')
		this.isshow=false
		this.$nextTick(() => { this.isshow=true })
	}
  }
}
</script>

<style>
.tree-canvas-show {
	width: 800px;
	height: 600px;
}
</style>