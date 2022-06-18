<template>
	<div class='tree-canvas-component'>
		<div class="canvas-tree-node" ref="element">
			<treenode
				v-for="(n, k) in nodeArray"
				:key="k"
				class="tree-node-list"
				:valElement="n"
				:style="{'left':String(nodePosition.X[k])+'px','top':String(nodePosition.Y[k])+'px'}">
			</treenode>
		</div>
		<canvas id="canvas-tree-edge"/>
	</div>
</template>

<script>
import treenode from './TreeNode.vue'

export default {
  name: 'TreeCanvas',
  components: {
	treenode
  },
  data() {
	return {
		maxcount: 0,
		maxheight: 0,
		nodeArray: [],
		nodePosition: {
			X: [],
			Y: []
		},
		edgePosition: {
			X: ['5px'],
			Y: ['5px']
		},
		tree: {
			size: 0,
			nodes:[]
		}
	}
  },
  methods: {
	normalize_data() {
		this.nodeArray = this.elementList
		var i = 0
		for (i = 0; i < this.nodeArray.length; i++) {
			if (this.nodeArray[i]==='nil') {
				if (2*i<=this.nodeArray.length) {
					this.nodeArray.splice(2*i+1, 0, 'nil')
					this.nodeArray.splice(2*i+2, 0, 'nil')
				}
			}
		}
		this.maxheight = parseInt(Math.log2(this.nodeArray.length)) + 1
		this.maxcount = Math.pow(2, this.maxheight)-1
		while (this.nodeArray.length < this.maxcount) {
			this.nodeArray.push('nil')
		}
	},
	init_tree() {
		const n = this.nodeArray.length
		this.tree.size = n
		var i = 0
		for (i = 0; i < n; i++) {
			var p = (i===0) ? -1 : parseInt((i-1)/2)
			var h = (p===-1) ? 1 : (this.tree.nodes[p].h+1)
			this.tree.nodes.push({
				val: this.nodeArray[i],
				parent: p,
				h: h,
				leftchild: 2*i+1,
				rightchild: 2*(i+1)
			})
			this.nodePosition.X.push(0)
			this.nodePosition.Y.push(50 * this.tree.nodes[i].h)
		}
		var divideNum = parseInt(this.maxcount/2)
		for (i = 0; i < this.maxcount; i++) {
			this.nodePosition.X[i] = 30+(i-divideNum)*50
		}
		for (i = divideNum - 1; i >= 0; i--) {
			this.nodePosition.X[i] = (this.nodePosition.X[this.tree.nodes[i].leftchild]+this.nodePosition.X[this.tree.nodes[i].rightchild])/2
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
		for (var i = 0; i < this.tree.size; i++) {
			var tnode = this.tree.nodes[i]
			if (tnode.leftchild !== -1 & tnode.leftchild < this.nodeArray.length) {
				ctx.moveTo(this.nodePosition.X[i]+20, this.nodePosition.Y[i]+20)
				ctx.lineTo(this.nodePosition.X[tnode.leftchild]+20, this.nodePosition.Y[tnode.leftchild]+20)
				ctx.stroke();
			}
			if (tnode.rightchild !== -1 && tnode.rightchild < this.nodeArray.length) {
				ctx.moveTo(this.nodePosition.X[i]+20, this.nodePosition.Y[i]+20)
				ctx.lineTo(this.nodePosition.X[tnode.rightchild]+20, this.nodePosition.Y[tnode.rightchild]+20)
				ctx.stroke();
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