<template>
	<div>
		<button v-text="valElement" class="tree-node"></button>
	</div>
</template>

<script>
export default {
  name: 'TreeEdge',
  components: {},
  props: {
	valElement: String
  }
}
</script>

<style>
.tree-node {
	border-radius: 50%;
	height: 45px;
	width: 45px;
	border: 3px solid #5C5E63;
	background-color: white;
	font-size: 16px;
	cursor: pointer;
}
</style>