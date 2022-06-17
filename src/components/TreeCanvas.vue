<template>
	<div class='tree-canvas-component'>
		<treenode class="treenode-show" :valElement="String(1)"></treenode>
		<!-- :style="{'left':nodePosition.X[0],'top':nodePosition.Y[0]}" -->
		<treeedge :imgwidth="String(50)" :imgheight="String(50)"></treeedge>
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
			X: ['100px'],
			Y: ['100px']
		},
		edgePosition: {
			X: [100],
			Y: [100]
		},
	}
  },
  mounted() {
	console.log(this.nodePosition.X[0], this.nodePosition.Y[0])
  }
}
</script>

<style>
.tree-canvas-component {
	margin: 5%;
	width: 90%;
	height: 100%;
}
.tree-canvas-show {
	left: 1000px;
}
</style>