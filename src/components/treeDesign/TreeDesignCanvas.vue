<template>
	<div class='tree-canvas-component'>
		<div v-text="elementList"></div>
		<div class="canvas-+tree-node">
			<treenode
				v-for="(stn, k) in showTreeNodes"
				:key="k"
				:index="stn.mappingIndex"
				class="tree-node-list"
				:valElement="stn.val"
				:style="{'left':String(nodePosition.X[stn.mappingIndex])+'px',
						'top':String(nodePosition.Y[stn.mappingIndex])+'px'}">
			</treenode>
		</div>
		<canvas id="canvas-tree-edge"/>
	</div>
</template>

<script>
import treenode from './TreeDesignNode.vue'

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
		},
		tree: [],
		/* 存值类型{val:存值; 
			parent:双亲index;
			h:所在高度;
			leftchild:左孩子index;
			rightchild:右孩子idnex} */
	}
  },
  methods: {
	init_showNodes() {
		for (var i = 0; i < this.nodeArray.length; i++) {
			if (this.nodeArray[i] !== 'nil') {
				this.showTreeNodes.push({ val: this.nodeArray[i], mappingIndex:i })
			}
		}
	},
	normalize_data() {
		var i = 0
		for (i = 0; i < this.elementList.length; i++) {
			this.nodeArray.push(this.elementList[i])
		}
		this.maxheight = parseInt(Math.log2(this.nodeArray.length)) + 1
		this.maxcount = Math.pow(2, this.maxheight)-1
		while (this.nodeArray.length < this.maxcount) {
			this.nodeArray.push('nil')
		}
		this.init_showNodes()
	},
	init_tree() {
		const n = this.nodeArray.length
		var i = 0
		for (i = 0; i < n; i++) {
			var p = (i===0) ? -1 : parseInt((i-1)/2)
			var h = (p===-1) ? 1 : (this.tree[p].h+1)
			this.tree.push({
				val: this.nodeArray[i],
				parent: p,
				h: h,
				leftchild: 2*i+1,
				rightchild: 2*(i+1)
			})
			this.nodePosition.X.push(0)
			this.nodePosition.Y.push(50 * this.tree[i].h)
		}
		var divideNum = parseInt(this.maxcount/2)
		for (i = divideNum; i < this.maxcount; i++) {
			this.nodePosition.X[i] = 30+(i-divideNum)*45
		}
		for (i = divideNum - 1; i >= 0; i--) {
			this.nodePosition.X[i] = (this.nodePosition.X[this.tree[i].leftchild]+this.nodePosition.X[this.tree[i].rightchild])/2
		}
		this.draw()
	},
	draw() {
		var canvas = document.getElementById("canvas-tree-edge")
		canvas.height = (this.maxheight+1)*50
		canvas.width = (parseInt(this.maxcount/2)+2)*50
		var ctx = canvas.getContext("2d");
		ctx.strokeStyle="#56585C";
		ctx.lineWidth=3
		for (var i = 0; i < this.tree.length; i++) {
			var tnode = this.tree[i]
			var temp = null
			if (tnode.leftchild !== -1 && tnode.leftchild < this.nodeArray.length) {
				temp = this.tree[this.tree[i].leftchild]
				if (temp.val!=='nil') {
					ctx.moveTo(this.nodePosition.X[i]+20, this.nodePosition.Y[i]+20)
					ctx.lineTo(this.nodePosition.X[tnode.leftchild]+20, this.nodePosition.Y[tnode.leftchild]+20)
					ctx.stroke();
				}
			}
			if (tnode.rightchild !== -1 && tnode.rightchild < this.nodeArray.length) {
				temp = this.tree[this.tree[i].rightchild]
				if (temp.val!=='nil') {
					ctx.moveTo(this.nodePosition.X[i]+20, this.nodePosition.Y[i]+20)
					ctx.lineTo(this.nodePosition.X[tnode.rightchild]+20, this.nodePosition.Y[tnode.rightchild]+20)
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