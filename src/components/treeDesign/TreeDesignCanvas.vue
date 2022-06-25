<template>
	<div class='tree-canvas-component'>
		<div class="canvas-tree-node">
			<treenode
				v-for="(stn, k) in showTreeNodes"
				:key="k"
				:index="stn.mapIndex"
				class="tree-node-list"
				:valElement="stn.val"
				:style="{'left':String(nodePosition.X[k])+'px',
						'top':String(nodePosition.Y[k])+'px'}">
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
	draw(tree) {
		var canvas = document.getElementById("canvas-tree-edge"), maxX=0
		canvas.height = (this.maxheight+1)*50
		for (var i = 0; i < this.nodePosition.X.length; i++) {
			if (maxX < this.nodePosition.X[i]) {
				maxX = this.nodePosition.X[i]
			}
		}
		canvas.width = maxX+100
		var ctx = canvas.getContext("2d");
		ctx.strokeStyle="#56585C";
		ctx.lineWidth=3
		for (i = 0; i < tree.length; i++) {
			var tnode = tree[i]
			var temp = null
			if (tnode.left !== -1 && tnode.left < this.nodeArray.length) {
				temp = tree[tree[i].left]
				if (temp.val!=='nil') {
					ctx.moveTo(this.nodePosition.X[i]+20, this.nodePosition.Y[i]+20)
					ctx.lineTo(this.nodePosition.X[tnode.left]+20, this.nodePosition.Y[tnode.left]+20)
					ctx.stroke();
				}
			}
			if (tnode.right !== -1 && tnode.right < this.nodeArray.length) {
				temp = tree[tree[i].right]
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
	z-index: 2;
}
#canvas-tree-edge {
	position: absolute;
	z-index: 1;
}
</style>