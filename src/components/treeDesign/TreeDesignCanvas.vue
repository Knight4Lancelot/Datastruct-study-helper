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
import { Queue, BinaryTree } from '../../utils/DatastructUtils.js'

const durationTime = 5

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
		nodeArray: ["S"],
		// nodeArray: [ "S", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
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
		showTreeNodes: [], // 去除了nil节点的节点数组
		nodePosition: {
			X: [], // 存Number类型坐标值
			Y: [] // 存Number类型坐标值
		}
	}
  },
  mounted() {
	this.$parent.TreeList=this.nodeArray
	this.init_tree();
	setTimeout(()=>{ this.drawAxios(); }, 100)
	setTimeout(()=>{ this.drawEdge(); }, 100)
  },
  methods: {
	hideAllNodeInfo() {
		var l = this.$refs['treenodeElement']
		for (var i =0; i < l.length; i++) {
			l[i].isShowInfo=false;
		}
	},
	init_tree() {
		while (this.nodeArray[this.nodeArray.length-1]==='nil') this.nodeArray.pop();
		this.bt = new BinaryTree(this.nodeArray);
		var maxX = 0;
		while (this.showTreeNodes.length!==0) this.showTreeNodes.pop();
		for (var i = 0; i < this.bt.count; i++) {
			this.showTreeNodes.push(this.bt.binarytreelist[i]);
		}
		this.maxheight = this.bt.height;
		this.maxcount = this.bt.count;
		this.nodePosition.X = this.bt.getPositionX(50);
		this.nodePosition.Y = this.bt.getPositionY(50);
		
		for (i = 0; i < this.nodePosition.X.length; i++) {
			if (maxX < this.nodePosition.X[i]) {
				maxX = this.nodePosition.X[i];
			}
		}
		this.canvasHeight = (this.maxheight+3)*50;
		this.canvasWidth = maxX+400;
		var viewHeight = document.documentElement.clientHeight-180;
		var viewWidth = document.documentElement.clientWidth-320;
		if (viewHeight < 500) { viewHeight = 500; }
		if (viewWidth < 1000) { viewWidth = 1000; }
		if (this.canvasHeight < viewHeight) this.canvasHeight=viewHeight;
		if (this.canvasWidth < viewWidth) this.canvasWidth=viewWidth;
	},
	drawAxios() {
		this.canvasAxios = document.getElementById("canvas-x-y-axios");
		var ctx = this.canvasAxios.getContext("2d");
		
		this.canvasAxios.height = this.canvasHeight;
		this.canvasAxios.width = this.canvasWidth;
		
		ctx.lineWidth=1;
		ctx.setLineDash([4]); // 设置虚线
		ctx.strokeStyle = "#ccc";
		var girdSize = 50; // 网格宽度
		var xLineTotals = Math.ceil(this.canvasAxios.height / girdSize) + 1;
		for (var i = 0; i < xLineTotals; i++) {
			// ctx.beginPath();
			ctx.moveTo(0, girdSize * i - 0.5);
			ctx.lineTo(this.canvasAxios.width, girdSize * i - 0.5);
			ctx.stroke();
		}
		var yLineTotals = Math.ceil(this.canvasAxios.width / girdSize) + 1;
		for (var j = 0; j < yLineTotals; j++) {
			// ctx.beginPath();
			ctx.moveTo(girdSize * j, 0);
			ctx.lineTo(girdSize * j, this.canvasAxios.height);
			ctx.stroke();
		}
	},
	drawEdge() {
		this.drawAxios()
		this.canvasEdge = document.getElementById("canvas-tree-edge");
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
	},
	addNode(index,direction) {
		var focus=2*index+direction+1
		if (focus<=this.nodeArray.length-1 && this.nodeArray[focus]!=='nil') {
			this.$message({
				duration: durationTime*1000,
				showClose: true,
				message: '目标节点已存在，请勿重复插入',
				type: 'warning'});
			return;
		}
		while (focus>this.nodeArray.length-1) {
			this.nodeArray.push('nil');
		}
		this.nodeArray[focus]='0';
		this.$parent.changeList();
		this.init_tree();
		this.drawEdge();
	},
	modifyNode(index, val) {
		this.nodeArray[index] = val;
		this.init_tree();
		this.drawEdge();
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
		var res = []
		var q = new Queue(), i, n;
		q.push(index);
		while (!q.isEmpty()) {
			i = q.pop()
			res.push(i)
			n = this.nodeArray[i]
			if (this.nodeArray.length-1>=2*i+1 && this.nodeArray[2*i+1]!=='nil') { q.push(2*i+1) }
			if (this.nodeArray.length-1>=2*i+2 && this.nodeArray[2*i+2]!=='nil') { q.push(2*i+2) }
		}
		for (i = 0; i < res.length; i++) {
			this.nodeArray[res[i]]='nil';
		}
		this.init_tree();
		this.drawEdge();
	}
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