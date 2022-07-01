<template>
	<div class='link-canvas-component'>
		<div class="canvas-link-node">
			<linknode
				ref="linknodeElement"
				v-for="(stn, k) in nodeArray"
				:key="k"
				:index="stn.mapIndex"
				class="link-node-list"
				:valElement="stn.val">
			</linknode>
		</div>
		<canvas id="canvas-link-edge"/>
	</div>
</template>

<script>
import linknode from './LinkDesignNode.vue'

export default {
  name: 'LinkCanvas',
  components: {
	linknode
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
.link-canvas-component {
	margin: 5%;
	width: 90%;
	height: 100%;
	overflow: hidden;
}
</style>