<template>
	<div class='graph-canvas-component'>
		<div class="canvas-graph-node">
			<graphnode
				ref="graphnodeElement"
				v-for="(stn, k) in nodeArray"
				:key="k"
				:index="stn.mapIndex"
				class="graph-node-list"
				:valElement="stn.val">
			</graphnode>
		</div>
		<canvas id="canvas-graph-edge"/>
	</div>
</template>

<script>
import graphnode from './GraphDesignNode.vue'

export default {
  name: 'graphCanvas',
  components: {
	graphnode
  },
  data() {
	return {
		nodecount: 0,
		nodeArray: [  ]
	}
  },
}
</script>

<style>
.graph-canvas-component {
	margin: 5%;
	width: 90%;
	height: 100%;
	overflow: hidden;
}
</style>