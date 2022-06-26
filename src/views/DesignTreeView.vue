<template>
<div class="designtree">
	<div v-text="TreeList" style="width: 1000px;"></div>
	<treecanvas class="tree-canvas-show" :elementList="TreeList" v-if="isshowCanvas"></treecanvas>
</div>
</template>

<script>
import treecanvas from '../components/treeDesign/TreeDesignCanvas.vue'
import { Queue } from '../utils/DatastructUtils.js'

const durationTime=5

export default {
  name: 'HomeView',
  components: {
	treecanvas
  },
  data() {
	return {
		TreeList: [ "S", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
					"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
					"0", "0", "0", "0", "0", "0", "0", "0", "0","0", "0",
					"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
					"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
					"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
					"0", "0", "0", "0", "0", "0", "0", "0", "0",  ],
		isshowCanvas: true
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
	modifyNode(index, val) {
		this.TreeList[index] = val
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
		var res = []
		var q = new Queue(), i, n
		q.push(index)
		while (!q.isEmpty()) {
			i = q.pop()
			res.push(i)
			n = this.TreeList[i]
			if (this.TreeList.length-1>=2*i+1 && this.TreeList[2*i+1]!=='nil') { q.push(2*i+1) }
			if (this.TreeList.length-1>=2*i+2 && this.TreeList[2*i+2]!=='nil') { q.push(2*i+2) }
		}
		for (i = 0; i < res.length; i++) {
			this.TreeList[res[i]]='nil'
		}
	},
	changeList() {
		while (this.TreeList[this.TreeList.length-1]==='nil') {
			this.TreeList.pop()
		}
		this.isshowCanvas=false
		this.$nextTick(() => { this.isshowCanvas=true })
	}
  }
}
</script>

<style>
.designtree {
	background-color: lightgreen;
	width: 99%;
	height: 100%;
	position: inherit;
}
.tree-canvas-show {
	position: inherit;
	z-index: 2;
	padding-top: 20px;
	width: 1300px;
	height: 900px;
	border: 2px solid black;	
}
</style>
