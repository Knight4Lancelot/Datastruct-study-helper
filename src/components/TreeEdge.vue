<template>
	<div class="edge-attrs">
		<img src="../assets/both.png" :style="{'width':imgwidth+'px', 'height':imgheight+'px'}" class="img-edge">
	</div>
</template>

<script>
export default {
  name: 'TreeEdge',
  components: {},
  props: {
	imgwidth: String,
	imgheight: String
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