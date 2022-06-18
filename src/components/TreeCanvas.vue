<template>
	<div class='tree-canvas-component'>
		<treenode
			class="tree-node-list"
			:valElement="String(1)"
			:style="{'left':nodePosition.X[0],'top':nodePosition.Y[0]}">
		</treenode>
		<treeedge 
			class="tree-edge-list"
			:imgwidth="String(20)"
			:imgheight="String(50)"
			:direction="'left'"
			:style="{'left':edgePosition.X[0],'top':edgePosition.Y[0]}">
		</treeedge>
	</div>
</template>

<script>
import treenode from './TreeNode.vue'
import treeedge from './TreeEdge.vue'

export default {
  name: 'TreeCanvas',
  components: {
	treeedge,
	treenode
  },
  data() {
	return {
		nodePosition: {
			X: ['0px'],
			Y: ['20px']
		},
		edgePosition: {
			X: ['100px'],
			Y: ['100px']
		},
		count_each_layer: [],
		tree: {
			size: 0,
			nodes:[]
		}
	}
  },
  methods: {
	init_tree() {
		const n = this.elementList.length
		this.tree.size = n
		var i = 0
		for (i = 0; i < n; i++) {
			this.tree.nodes.push({
				val: this.elementList[i],
				leftchild: (2*i+1<n)?(2*i+1):-1,
				rightchild: (2*(i+1)<n)?(2*(i+1)):-1,
			})
		}
	}
  },
  mounted() {
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
.tree-node-list {
	position: relative;
	z-index: 2;
}
.tree-edge-list {
	position: relative;
	z-index: 1;
}
</style>