<template>
	<div>
		<HoverTips class="hover-tips"></HoverTips>
		<AlgorithmCanvas id="pop-sort-canvas"
			:nodelist="list"></AlgorithmCanvas>
	</div>
</template>

<script>
import AlgorithmCanvas from '../../components/algorithmViewComps/PopSortCanvas.vue'
import HoverTips from '../../components/algorithmViewComps/HoverTips.vue'

export default {
	name: 'PopSortHomeView',
	components: {
		AlgorithmCanvas,
		HoverTips
	},
	data() {
		return {
			list: [11,2,33,5,14,23]
		}
	},
	methods: {
		formCanvasSize() {
			
		}
	}
}
</script>

<style>
#pop-sort-canvas {
	position: absolute;
	border: 1px solid black;
	left: 100px;
	top: 100px;
	width: 1400px;
	height: 660px;
	
}
.hover-tips {
	position: absolute;
	/* border: 1px solid; */
	top: 30px;
	left: 750px;
	height: 40px;
	width: 800px;
	padding-top: 20px;
}
</style>