<template>
	<div class='tree-canvas-component'>
		<div class="node">1</div>
		<img src="../assets/both.svg" class="img-road">
	</div>
</template>

<script>
export default {
  name: 'TreeCanvas',
  components: {
  }
}
</script>

<style>
.tree-canvas-component {
	margin: 5%;
	width: 90%;
	height: 100%;
	/* background-color: red; */
}
.el-button {
	border: 3px solid black;
}
.img-road, .node {
	user-select: none;
}
.node {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 3px solid black;
}
</style>