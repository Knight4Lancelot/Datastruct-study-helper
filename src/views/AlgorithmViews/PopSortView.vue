<template>
	<div>
		冒泡排序
		<AlgorithmCanvas id="canvas"></AlgorithmCanvas>
	</div>
</template>

<script>
import AlgorithmCanvas from '../../components/algorithmViewComps/PopSortCanvas.vue'
export default {
	name: 'PopSortHomeView',
	components: {
		AlgorithmCanvas
	},
	methods: {
		formCanvasSize() {
			
		}
	}
}
</script>

<style>
#canvas {
	border: 1px solid black;
	width: 1400px;
	height: 700px;
}
</style>