<template>
  <div class="designtree">
    <treecanvas class="tree-canvas-show" :elementList="TreeList" v-if="isshow"></treecanvas>
  </div>
</template>

<script>
import treecanvas from '../components/treeDesign/TreeDesignCanvas.vue'

const durationTime=5

export default {
  name: 'HomeView',
  components: {
	treecanvas
  },
  data() {
	return {
		TreeList: ["S"],
		isshow: true
	}
  },
  mounted() {
	this.normalizeTreeList()
  },
  methods: {
	normalizeTreeList() {
		while (this.TreeList[this.TreeList.length-1]==='nil') {
			this.TreeList.pop()
		}
	},
	addNode(index,direction) {
		var focus=2*index+direction+1
		if (focus<=this.TreeList.length-1 && this.TreeList[focus]!=='nil') {
			this.$message({
				duration: durationTime*1000,
				showClose: true,
				message: '目标节点已存在，请勿重复插入',
				type: 'warning'})
			return
		}
		while (focus>this.TreeList.length-1) {
			this.TreeList.push('nil')
		}
		this.TreeList[focus]='0'
		this.changeList()
	},
	delNode(index) {
		if (index===0) {
			this.$message({
				duration: durationTime*1000,
				showClose: true,
				message: '这可是根节点，快请别继续删除了',
				type: 'error'})
			return
		}
		this.recursiveDelNode(index)
		this.changeList()
	},
	recursiveDelNode(index) {
		this.TreeList[index]='nil'
		if (this.TreeList.length>=2*index+2) {
			this.TreeList[2*index+1]='nil'
			this.recursiveDelNode(2*index+1)
		}
		if (this.TreeList.length>=2*index+3) {
			this.TreeList[2*index+2]='nil'
			this.recursiveDelNode(2*index+2)
		}
	},
	changeList() {
		while (this.TreeList[this.TreeList.length-1]==='nil') {
			this.TreeList.pop()
		}
		this.isshow=false
		this.$nextTick(() => { this.isshow=true })
	}
  }
}
</script>

<style>
.designtree {
	position: inherit;
}
.tree-canvas-show {
	position: inherit;
	width: 90%;
	height: 90%;
	border: 1px solid black;
}
</style>
