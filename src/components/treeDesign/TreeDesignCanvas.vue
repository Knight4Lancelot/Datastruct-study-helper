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
		<canvas id="canvas-x-y-axios"/>
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
		bt: null,
		canvasEdge: null,
		canvasAxios: null,
		canvasHeight: 0,
		canvasWidth: 0,
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
  mounted() {
	this.normalize_data();
	this.bt = new BinaryTree(this.nodeArray);
	var maxX = 0;
	this.init_tree();
	for (var i = 0; i < this.nodePosition.X.length; i++) {
		if (maxX < this.nodePosition.X[i]) {
			maxX = this.nodePosition.X[i];
		}
	}
	this.canvasHeight = (this.maxheight+3)*50;
	this.canvasWidth = maxX+400;
	var viewHeight = document.documentElement.clientHeight-180;
	var viewWidth = document.documentElement.clientWidth-320;
	if (viewHeight < 500) { viewHeight = 500; }
	if (viewWidth < 1300) { viewWidth = 1300; }
	if (this.canvasHeight < viewHeight) this.canvasHeight=viewHeight;
	if (this.canvasWidth < viewWidth) this.canvasWidth=viewWidth;
	this.drawAxios();
	this.drawEdge();
  },
  methods: {
	hideAllNodeInfo() {
		var l = this.$refs['treenodeElement']
		for (var i =0; i < l.length; i++) {
			l[i].isShowInfo=false;
		}
	},
	normalize_data() {
		var i = 0;
		for (i = 0; i < this.elementList.length; i++) {
			this.nodeArray.push(this.elementList[i]);
		}
		while (this.nodeArray.length < this.maxcount) {
			this.nodeArray.push('nil');
		}
	},
	init_tree() {
		for (var i = 0; i < this.bt.count; i++) {
			this.showTreeNodes.push(this.bt.binarytreelist[i]);
		}
		this.maxheight = this.bt.height;
		this.maxcount = this.bt.count;
		this.nodePosition.X = this.bt.getPositionX(50);
		this.nodePosition.Y = this.bt.getPositionY(50);
	},
	drawAxios() {
		this.canvasAxios = document.getElementById("canvas-tree-edge");
		var ctx = this.canvasAxios.getContext("2d");
		
		this.canvasAxios.height = this.canvasHeight;
		this.canvasAxios.width = this.canvasWidth;
		
		ctx.lineWidth=1;
		ctx.setLineDash([4]); // 设置虚线
		ctx.strokeStyle = "#ccc";
		var girdSize = 50; // 网格宽度
		var xLineTotals = Math.ceil(this.canvasAxios.height / girdSize);
		for (var i = 0; i < xLineTotals; i++) {
			// ctx.beginPath();
			ctx.moveTo(0, girdSize * i - 0.5);
			ctx.lineTo(this.canvasAxios.width, girdSize * i - 0.5);
			ctx.stroke();
		}
		var yLineTotals = Math.ceil(this.canvasAxios.width / girdSize);
		for (var j = 0; j < yLineTotals; j++) {
			// ctx.beginPath();
			ctx.moveTo(girdSize * j, 0);
			ctx.lineTo(girdSize * j, this.canvasAxios.height);
			ctx.stroke();
		}
	},
	drawEdge() {
		this.drawAxios()
		this.canvasEdge = document.getElementById("canvas-x-y-axios");
		var ctx = this.canvasEdge.getContext("2d");
		
		this.canvasEdge.height = this.canvasHeight;
		this.canvasEdge.width = this.canvasWidth;
		
		ctx.setLineDash([]);
		ctx.beginPath();
		ctx.strokeStyle="#56585C";
		ctx.lineWidth=3;
		for (var i = 0; i < this.bt.binarytreelist.length; i++) {
			var tnode = this.bt.binarytreelist[i];
			var temp = null;
			if (tnode.left !== -1 && tnode.left < this.nodeArray.length) {
				temp = this.bt.binarytreelist[this.bt.binarytreelist[i].left];
				if (temp.val!=='nil') {
					ctx.moveTo(this.nodePosition.X[i]+20, this.nodePosition.Y[i]+20);
					ctx.lineTo(this.nodePosition.X[tnode.left]+20, this.nodePosition.Y[tnode.left]+20);
					ctx.stroke();
				}
			}
			if (tnode.right !== -1 && tnode.right < this.nodeArray.length) {
				temp = this.bt.binarytreelist[this.bt.binarytreelist[i].right];
				if (temp.val!=='nil') {
					ctx.moveTo(this.nodePosition.X[i]+20, this.nodePosition.Y[i]+20);
					ctx.lineTo(this.nodePosition.X[tnode.right]+20, this.nodePosition.Y[tnode.right]+20);
					ctx.stroke();
				}
			}
		}
	}
  },
  props: {
	elementList: Array
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
#canvas-tree-edge, #canvas-x-y-axios {
	position: absolute;
	left: 10px;
	top: 10px;
	z-index: 2;
}
</style>