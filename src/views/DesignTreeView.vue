<template>
<div class="designtree">
	<router-link to="/" exact><i id="back-to-home" class="el-icon-arrow-left"/></router-link>
	<span id="design-tree-headword"
		:style="{'width': String(canvasWidth-100)+'px',
				'top':'45px',
				'left':'120px'}">
		<span style="color:#67C23A;font-size:35px;font-weight: 800;">
			二叉树
		</span>结构设计
	</span>
	<el-card id="tree-result-card"
		:style="{'width': String(canvasWidth)+'px',
				'top':String(canvasHeight+240)+'px',
				'left':'120px'}">
		<div id="card-message" v-text="replacedTreeList" @click="sendDataCopy()"/>
	</el-card>
	<span id="tree-result-word"
		:style="{'width': String(canvasWidth)+'px',
			'top':String(canvasHeight+180)+'px',
			'left':'120px'}">
			<span style="color:#67C23A;font-size:35px;font-weight: 800;">
				二叉树&nbsp;
			</span>的数组形式表示结果
			<div id="divider-res"/>
	</span>
	<treecanvas class="tree-canvas-show"
		id="tree-canvas-show"
		:elementList="TreeList"
		v-if="isshowCanvas"
		ref="canvasElement"
		:style="{'overflow-y':'scroll', 'overflow-x':'scroll',
				'max-width': String(canvasWidth)+'px',
				'max-height': String(canvasHeight)+'px',
				'width': String(canvasWidth)+'px',
				'height': String(canvasHeight)+'px'}"/>
	<div style="position: inherit;height: 700px;width: 900px;top: 1000px;"></div>
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
		blankNode: 'null',
		canvasleft: 0,
		canvastop: 0,
		appHeight: 0,
		appWidth: 0,
		canvasHeight: 0,
		canvasWidth: 0,
		TreeList: ['S'],
		TreeListString: '',
		// TreeList: [ "S", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
		// 			"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
		// 			"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
		// 			"0", "0", "0", "0", "0", "11", "12", "13", "14", "0", "0", 
		// 			"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
		// 			"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
		// 			"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
		// 			"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
		// 			"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
		// 			"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
		// 			"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
		// 			"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
		// 			"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
		// 			"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
		// 			"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", 
		// 			"2", "3", "4", "5", "6", "7", "8", "9", "10"],
		// TreeList: [ "S", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
		// 			"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
		// 			"0", "0", "0", "0", "0", "0", "0", "0", "0","0", "0"],
		isshowCanvas: true
	}
  },
  mounted() {
	this.formCanvasSize()
	this.normalizeTreeList()
	this.TreeListString = String(this.TreeList).replaceAll('nil', 'null')
  },
  computed: {
	replacedTreeList() {
		var res = this.TreeList.concat()
		if (res.length > 51) {
			while (res.length > 51) {
				res.splice(40,1)
			}
			res[40]=' ... '
		}
		return "（对应数组共计节点数："+String(this.TreeList.length)+"）："+
				String(res).replaceAll('nil', 'null').replaceAll(',', ', ')
	}
  },
  methods: {
	sendDataCopy() { // 将card内容复制到粘贴板
		var that = this
		document.oncopy = function (e) {
			e.clipboardData.setData('text', String(that.TreeListString))
			e.preventDefault()
			document.oncopy = null
		}
		document.execCommand('Copy')
		this.$message({
			duration: durationTime*1000,
			showClose: true,
			message: '成功复制内容  [ 二叉树数组形式 ]  到粘贴板',
			type: 'success'})
	},
	formCanvasSize() {
		this.appHeight=document.documentElement.clientHeight
		this.appWidth=document.documentElement.clientWidth
		this.canvasHeight = this.appHeight-160
		this.canvasWidth = this.appWidth-300
		if (this.canvasHeight < 500) { this.canvasHeight = 500 }
		if (this.canvasWidth < 1000) { this.canvasWidth = 1000 }
		this.$refs['canvasElement'].draw()
	},
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
		this.TreeListString = String(this.TreeList).replaceAll('nil', 'null')
		var treeCanvas = document.getElementById('tree-canvas-show')
		this.canvasleft = treeCanvas.scrollLeft
		this.canvastop = treeCanvas.scrollTop
		while (this.TreeList[this.TreeList.length-1]==='nil') {
			this.TreeList.pop()
		}
		this.isshowCanvas=false
		this.$nextTick(() => {
			this.isshowCanvas=true
		})
		setTimeout(()=>{
			treeCanvas = document.getElementById('tree-canvas-show')
			treeCanvas.scrollLeft = this.canvasleft
			treeCanvas.scrollTop = this.canvastop
		},0)
	}
  }
}
</script>

<style>
#back-to-home {
	position: absolute;
	font-size: 60px;
	font-weight: 1000;
	color: #A7A7A7;
	opacity: 0.8;
	cursor: pointer;
	left: 20px;
	top: 40px;
}
#design-tree-headword, #tree-result-word {
	position: inherit;
	font-size: 25px;
	color: #6A6A6A;
	font-family: 'Microsoft YaHei';
	user-select: none;
}
#tree-result-card {
	position: inherit;
	background-color: #F2F6FC;
	font-family: 'Microsoft YaHei';
}
#card-message { 
	cursor: pointer;
	user-select: none;
	position: relative;
	padding: 20px;
	width: 95%;
	height: 100%;
}
#divider-res {
	position: inherit;
	z-index:1;
	top: 70%;
	height: 4px;
	background-color: #68C739;
	width: 71%;
	left: 360px;
}
.designtree {
	/* background-color: lightgreen; */
	width: 100%;
	height: 100%;
	position: inherit;
}
.tree-canvas-show {
	position: inherit;
	top: 45px;
	left: 40px;
	border: 2px solid #C0C4CC;
	border-radius: 15px;
}
</style>
