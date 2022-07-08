<template>
	<div >
		<node id="test"
			:pillarHeight="100"
			:index="0"
			:valElement="'1234'"
		/>
	</div>
</template>

<script>
import node from './LinearSortNode.vue'

export default {
	name: 'PopSortCanvas',
	components: {
		node
	}
}
</script>

<style>
#test {
	position: absolute;
	left: 700px;
	top: 300px;
	height: 300px;
}
</style>