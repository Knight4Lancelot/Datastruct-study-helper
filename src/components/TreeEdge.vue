<template>
	<div class="edge-attrs">
		<img
			:src="iconShow"
			:style="{'width':imgwidth+'px', 'height':imgheight+'px'}"
			class="img-edge">
	</div>
</template>

<script>
export default {
  name: 'TreeEdge',
  components: {},
  props: {
	imgwidth: String,
	imgheight: String,
	direction: String
  },
  computed: {
	iconShow() {
		if (this.direction==='left') { return require('@/assets/left.png') }
		else if (this.direction==='right') { return require('@/assets/right.png') }
		else { return require('@/assets/both.png') }
	}
  }
}
</script>

<style>
.edge-attrs {
	user-select: none;
}
.img-edge {
}
</style>