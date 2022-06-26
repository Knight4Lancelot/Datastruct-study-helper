<template>
	<div class='tree-canvas-component'>
		<div class="canvas-tree-node">
			<treenode
				ref="treenodeElement"
				v-for="(stn, k) in showTreeNodes"
				:key="k"
				:index="stn.mapIndex"
				class="tree-node-list"
				:valElement="stn.val"
				:style="{'left':String(nodePosition.X[k]+10)+'px',
						'top':String(nodePosition.Y[k]+10)+'px'}">
			</treenode>
		</div>
		<canvas id="canvas-tree-edge"/>
	</div>
</template>

<script>
import treenode from './TreeDesignNode.vue'
import { BinaryTree } from '../../utils/DatastructUtils.js'

export default {
  name: 'TreeCanvas',
  components: {
	treenode
  },
  data() {
	return {
		maxcount: 0,
		maxheight: 0,
		nodeArray: [], // 规范化后的节点数组
		showTreeNodes: [], // 去除了nil节点的节点数组 
		// {val:数值, mappingIndex:映射的index}
		nodePosition: {
			X: [], // 存Number类型坐标值
			Y: [] // 存Number类型坐标值
		}
	}
  },
  methods: {
	hideAllNodeInfo() {
		var l = this.$refs['treenodeElement']
		for (var i =0; i < l.length; i++) {
			l[i].isShowInfo=false
		}
	},
	normalize_data() {
		var i = 0
		for (i = 0; i < this.elementList.length; i++) {
			this.nodeArray.push(this.elementList[i])
		}
		while (this.nodeArray.length < this.maxcount) {
			this.nodeArray.push('nil')
		}
	},
	init_tree() {
		var bt = new BinaryTree(this.nodeArray)
		for (var i = 0; i < bt.count; i++) {
			this.showTreeNodes.push(bt.binarytreelist[i])
		}
		this.maxheight = bt.height
		this.maxcount = bt.count
		this.nodePosition.X = bt.getPositionX(50)
		this.nodePosition.Y = bt.getPositionY(50)
		this.draw(bt.binarytreelist)
	},
	draw() {
		var bt = new BinaryTree(this.nodeArray)
		var canvas = document.getElementById("canvas-tree-edge"), maxX=0
		canvas.height = (this.maxheight+3)*50
		for (var i = 0; i < this.nodePosition.X.length; i++) {
			if (maxX < this.nodePosition.X[i]) {
				maxX = this.nodePosition.X[i]
			}
		}
		canvas.width = maxX+400
		var canvasHeight = document.documentElement.clientHeight-180
		var canvasWidth = document.documentElement.clientWidth-320
		if (canvasHeight < 500) { canvasHeight = 500 }
		if (canvasWidth < 1300) { canvasWidth = 1300 }
		if (canvas.height < canvasHeight) canvas.height=canvasHeight
		if (canvas.width < canvasWidth) canvas.width=canvasWidth
		var ctx = canvas.getContext("2d");
		
		ctx.lineWidth=1
		ctx.setLineDash([4]) // 设置虚线
		ctx.strokeStyle = "#ccc"
		var girdSize = 50 // 网格宽度
		var xLineTotals = Math.ceil(canvas.height / girdSize);
		for (i = 0; i < xLineTotals; i++) {
			// ctx.beginPath();
			ctx.moveTo(0, girdSize * i - 0.5);
			ctx.lineTo(canvas.width, girdSize * i - 0.5);
			ctx.stroke();
		}
		var yLineTotals = Math.ceil(canvas.width / girdSize);
		for (var j = 0; j < yLineTotals; j++) {
			// ctx.beginPath();
			ctx.moveTo(girdSize * j, 0);
			ctx.lineTo(girdSize * j, canvas.height);
			ctx.stroke();
		}
		
		ctx.setLineDash([])
		ctx.beginPath();
		ctx.strokeStyle="#56585C";
		ctx.lineWidth=3
		for (i = 0; i < bt.binarytreelist.length; i++) {
			var tnode = bt.binarytreelist[i]
			var temp = null
			if (tnode.left !== -1 && tnode.left < this.nodeArray.length) {
				temp = bt.binarytreelist[bt.binarytreelist[i].left]
				if (temp.val!=='nil') {
					ctx.moveTo(this.nodePosition.X[i]+20, this.nodePosition.Y[i]+20)
					ctx.lineTo(this.nodePosition.X[tnode.left]+20, this.nodePosition.Y[tnode.left]+20)
					ctx.stroke();
				}
			}
			if (tnode.right !== -1 && tnode.right < this.nodeArray.length) {
				temp = bt.binarytreelist[bt.binarytreelist[i].right]
				if (temp.val!=='nil') {
					ctx.moveTo(this.nodePosition.X[i]+20, this.nodePosition.Y[i]+20)
					ctx.lineTo(this.nodePosition.X[tnode.right]+20, this.nodePosition.Y[tnode.right]+20)
					ctx.stroke();
				}
			}
		}
	}
  },
  mounted() {
	this.normalize_data(),
	this.init_tree()
  },
  props: {
	elementList: Array,
	maxHeight: Number,
	maxWidth: Number
  }
}
</script>

<style>
.tree-canvas-component {
	margin: 5%;
	width: 90%;
	height: 100%;
	overflow: hidden;
}
.canvas-tree-node {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 3;
}
#canvas-tree-edge {
	position: absolute;
	left: 10px;
	top: 10px;
	z-index: 2;
}
</style>